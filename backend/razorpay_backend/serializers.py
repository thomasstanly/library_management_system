from rest_framework import serializers
from .models import Transaction,Membership_payment
from membership.serializers import MemberSerializer

class MembershipPaymentSerializer(serializers.ModelSerializer):
    membership_plan = MemberSerializer()

    class Meta:
        model = Membership_payment
        fields = ['id','patron', 'membership_plan', 'from_date', 'expiry_date', 'amount_paid', 'status']
        
class CreateOrderSerializers(serializers.Serializer):
    amount = serializers.IntegerField()
    currency = serializers.CharField()

class TranscationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ["payment_id","order_id","signature","amount","membership_payment"]
