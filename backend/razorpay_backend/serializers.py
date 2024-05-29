from rest_framework import serializers
from .models import Transaction,Membership_payment
from membership.serializers import MemberSerializer

class MembershipPaymentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Membership_payment
        fields = ['id','patron', 'membership_plan', 'from_date', 'expiry_date', 'amount_paid', 'status']

class MembershipOrderSerializer(serializers.ModelSerializer):
    membership_plan = MemberSerializer()

    class Meta:
        model = Membership_payment
        fields = ['id','patron', 'membership_plan', 'from_date', 'expiry_date', 'amount_paid', 'status']

        
class CreateOrderSerializers(serializers.Serializer):
    amount = serializers.IntegerField()
    currency = serializers.CharField()

class MemTranscationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ["payment_id","order_id","signature","amount","membership_payment"]

class FineTranscationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ["payment_id","order_id","signature","amount","fine_payment"]

class MembershipPaymentListserializer(serializers.ModelSerializer):
    class Meta:
        model = Membership_payment
        fields = '__all__'
        depth = 1

class DashboardSerializer(serializers.Serializer):
    month = serializers.IntegerField()
    total_sum = serializers.IntegerField()