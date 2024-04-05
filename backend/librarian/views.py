from django.shortcuts import render
import random
from datetime import datetime, timedelta
from .tasks import emial_verification
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView, ListCreateAPIView, RetrieveAPIView, UpdateAPIView
from rest_framework.parsers import MultiPartParser,FormParser
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from rest_framework.filters import SearchFilter
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework.parsers import MultiPartParser, FormParser

from .serializer import UserRegisterSerializer,LoginSerializer

class MyRefreshTokenObtainPairSerializer(TokenRefreshSerializer):
    def __init__(self, *args, **kwargs):
        request = kwargs.pop('request', None)
        print(request)
        super().__init__(*args, **kwargs)

class MyRefreshTokenObtainPairView(TokenRefreshView):
    serializer_class = MyRefreshTokenObtainPairSerializer

class SignUp(GenericAPIView):

    def post(self,request):
        user_data = request.data
        serializer = UserRegisterSerializer(data=user_data)
        if serializer.is_valid(raise_exception=True):
            print(user_data)
            otp = random.randint(10000,99999)
            emial_verification(user_data['email'],otp)
            request.session['otp'] = {
                'value':otp,
                'timestamp': str(datetime.now())
            }
            request.session['user_data'] = user_data
            return Response({
                'message':f"OTP has sent to registred e-mail"
            },status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class OTPverfication(GenericAPIView):

    def post(self,request):
        recived_otp = request.data.get('otp')

        stored_otp_data = request.session.get('otp')
        stored_otp = stored_otp_data['value']
        timestamp_str = stored_otp_data['timestamp']
        timestamp = datetime.fromisoformat(timestamp_str)

        if datetime.now() - timestamp > timedelta(seconds=20):
                request.session.pop('otp')
                request.session.pop('user_data')
                return Response({'message': 'OTP expired'}, status=status.HTTP_400_BAD_REQUEST)
        
        if recived_otp == stored_otp:
            user_data = request.session.get('user_data')
            serializer = UserRegisterSerializer(data=user_data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                request.session.pop('otp')
                request.session.pop('user_data')
                return Response({
                    'message':f"Patron registered"
                },status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class LoginView(GenericAPIView):
    
    def post(self,request):
        serializer = LoginSerializer(data=request.data,context={'request':request})
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data,status=status.HTTP_200_OK)

class LogoutView(APIView):
     permission_classes = [IsAuthenticated]
     def post(self, request):
          
          try:
               refresh_token = request.data["refresh_token"]
               token = RefreshToken(refresh_token)
               token.blacklist()
               content = {'message': 'Successfully logged out'}
               return Response(status=status.HTTP_205_RESET_CONTENT)
          except Exception as e:
               content = {'message': 'refresh token invalid'}
               return Response(content,status=status.HTTP_400_BAD_REQUEST)
