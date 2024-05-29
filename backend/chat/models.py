from django.db import models
from librarian.models import Patron


class Room(models.Model):
   room_name = models.CharField(max_length=50)

class Messages(models.Model):
    room = models.ForeignKey(Room,related_name='messages',on_delete=models.CASCADE)
    body = models.TextField()
    sent_by = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(Patron,blank=True,null=True,on_delete=models.SET_NULL)


    class Meta:
        ordering = ('created_at',)

    def __str__(self):
        return f"{self.sent_by}"

