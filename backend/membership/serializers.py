from rest_framework import serializers
from .models import *

class MemberSerializer(serializers.ModelSerializer):

    class Meta:
        model = Membership_plan
        fields = '__all__'