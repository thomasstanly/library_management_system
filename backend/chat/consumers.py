import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .models import Messages,Room,Patron

class ChatConsumer(AsyncWebsocketConsumer):
    community = None
    
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'chat_{self.room_name}'

        #join group
        await self.channel_layer.group_add(
            self.room_group_name,self.channel_name)
        await self.accept()
        self.community = await self.get_or_create_room(self.room_name)
        messages = await self.get_room_messages(self.community[0].id)

        for message in messages:
            await self.send(text_data=json.dumps({"message": message['message'],
                                                  "created": message['created'],
                                                  "sent_by": message['sent_by']}))

    @database_sync_to_async
    def get_or_create_room(self,room_name):
        return Room.objects.get_or_create(room_name=room_name)
    
    @database_sync_to_async
    def get_room_messages(self,room):
        messages = Messages.objects.filter(room=room)
        return [{'message':i.body,
                 'created':i.created_by.id if i.created_by else None,
                 'sent_by':i.created_by.first_name if i.created_by.first_name else None} for i in messages ]
    
    async def disconnect(self, close_code):
        # leave room
        await self.channel_layer.group_discard(self.room_group_name,self.channel_name)
    
    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        patron = text_data_json['patron_id']
        message = text_data_json["message"]
        sender = text_data_json['sender']

        await self.save_message(patron,message)

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name, {"type": "chat.message", "message": message, "created":patron, 'sent_by':sender}
        )

    @database_sync_to_async
    def save_message(self,patron,message):
        patron_data = Patron.objects.get(id=patron)
        Messages.objects.create(body=message,created_by=patron_data,sent_by=patron_data.first_name,room=self.community[0])

    # Receive message from room group
    async def chat_message(self, event):
        message = event["message"]
        created = event["created"]
        sent_by = event['sent_by']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({"message": message,"created":created,'sent_by':sent_by}))