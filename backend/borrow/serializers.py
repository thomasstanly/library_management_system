from rest_framework import serializers
from .models import *
from librarian.serializer import PtronListCreateSerializer
from book.serializers import BookVariantListSerializer

class BorrowSerializer(serializers.ModelSerializer):
    patron = PtronListCreateSerializer()
    book = BookVariantListSerializer()

    class Meta:
        model = Borrow
        fields = '__all__'
