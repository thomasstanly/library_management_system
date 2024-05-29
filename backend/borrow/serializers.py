from rest_framework import serializers
from .models import *
from librarian.serializer import PtronListCreateSerializer
from book.serializers import BookVariantListSerializer

class FinePaymentSerialzer(serializers.ModelSerializer):
    class Meta:
        model = FinePayment
        fields = ['id','borrow','amount','date_assessed', 'fine_status']

class BorrowSerializer(serializers.ModelSerializer):
    patron = PtronListCreateSerializer()
    book = BookVariantListSerializer()
    fine_payment = FinePaymentSerialzer(read_only=True)

    class Meta:
        model = Borrow
        fields = '__all__'

class FineListSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinePayment
        fields = ['id','borrow','amount','date_assessed', 'fine_status']
        depth = 3