from django.shortcuts import render
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import ChatSerializer
from .models import Messages

# Create your views here.
def index(request):
    return render(request, "chat/index.html")

def room(request, room_name):
    return render(request, "chat/room.html", {"room_name": room_name})

class ChatMeassage(ListAPIView):
    serializer_class = ChatSerializer
    queryset = Messages.objects.all()

    