from rest_framework.generics import GenericAPIView,ListCreateAPIView,RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from .models import *
from .serializers import *

class MemberCreateList(ListCreateAPIView,GenericAPIView):
    # permission_classes=[IsAuthenticated]    
    queryset = Membership_plan.objects.all()
    serializer_class=MemberSerializer

class MemberRetriveUpdateDelete(RetrieveUpdateDestroyAPIView,GenericAPIView):
    queryset = Membership_plan.objects.all()
    serializer_class = MemberSerializer
    lookup_field='id'
