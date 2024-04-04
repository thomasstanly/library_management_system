from django.shortcuts import render
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
            serializer.save()
            user = serializer.data
            return Response({
                'data':user,
                'message':f"Thank you for signing in our site"
            },status=status.HTTP_201_CREATED)
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
