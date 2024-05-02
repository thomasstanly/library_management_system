from django.shortcuts import render
import random
from datetime import timedelta
from django.contrib.auth import update_session_auth_hash
from django.utils import timezone
from .tasks import emial_verification
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView, UpdateAPIView
from rest_framework.parsers import MultiPartParser,FormParser
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from rest_framework.filters import SearchFilter
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Patron,UserProfile

from .serializer import UserRegisterSerializer,LoginSerializer,PtronListCreateSerializer
from .serializer import UserProfileSerializer,PatronUpdateSerializer,PasswordChangeSerializer


class SignUp(GenericAPIView):

    def post(self,request):
        user_data = request.data
        serializer = UserRegisterSerializer(data=user_data)
        if serializer.is_valid(raise_exception=True):
            patron = serializer.save()
            otp = random.randint(10000,99999)
            emial_verification(user_data['email'],otp)
            patron.otp = otp
            patron.otp_expire = timezone.now() + timedelta(seconds=20)
            patron.save()
            return Response({'email':patron.email,'exiry':patron.otp_expire,
                'message':f"OTP has sent to registred e-mail"
            },status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class OTPverfication(GenericAPIView):

    def post(self,request):
        recived_otp = self.request.data.get('otpvalue')
       
        recived_email = self.request.data.get('email')
       
        patron = Patron.objects.get(email=recived_email)
       
        if timezone.now()-patron.otp_expire > timedelta(seconds=20):
            return Response({'message':'time expire'},status=status.HTTP_400_BAD_REQUEST)
        if patron.otp == int(recived_otp):
            patron.is_email_verified = True
            patron.is_active = True
            patron.save()
            return Response({'message':'Email is successfully verified'},status=status.HTTP_201_CREATED)
        else:
            return Response({'message':'Wrong OTP please try again'},status=status.HTTP_400_BAD_REQUEST)
        
    def put(self, request):
        recived_email = request.data.get('email')
        patron = Patron.objects.get(email=recived_email)
        new_otp = random.randint(10000, 99999)
        emial_verification(recived_email, new_otp)  
        patron.otp = new_otp
        patron.otp_expire = timezone.now() + timedelta(seconds=20)  
        patron.save()
        return Response({'exiry':patron.otp_expire,'message': 'New OTP sent to registered email'}, status=status.HTTP_200_OK)
    

class LoginView(GenericAPIView):
    serializer_class =  LoginSerializer
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


class PatronList(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PtronListCreateSerializer
    queryset = Patron.objects.all().order_by("-id")

class PatronRetrive(GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PtronListCreateSerializer
    
    def get(self,request):
        patron = Patron.objects.get(email=request.user)
        serializer = self.serializer_class(patron)
        return Response(serializer.data)

class PatronRetriveUpdateAPIViews(RetrieveUpdateDestroyAPIView):
    queryset = Patron.objects.all()
    serializer_class = PatronUpdateSerializer
    lookup_field='id'

class PatronStatus(APIView):

    def get(self,request,id):
        patron = Patron.objects.get(id=id)
        status = patron.is_active
        if status == True :
            patron.is_active = False
            patron.save()
            return Response({'message':'Deactivated'})
        else:
            patron.is_active = True
            patron.save()
            return Response({'message':'Activated'})
        

class PatronProfileUpdateView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):

        user_profile = UserProfile.objects.get_or_create(user=request.user)[0]
        serializer = UserProfileSerializer(user_profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PasswordChangeAPIView(GenericAPIView):
    serializer_class = PasswordChangeSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            user.set_password(serializer.validated_data['new_password'])
            user.save()
            update_session_auth_hash(request, user)
            return Response({"message": "Password has been successfully changed."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)