from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Patron,UserProfile

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['firstname'] = user.first_name
        # ...

        return token

class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=30, min_length=6, write_only=True)
    password2 = serializers.CharField(max_length=30, min_length=6, write_only=True)

    class Meta:
        model = Patron
        fields = ['email','first_name','last_name','password','password2']

    def validate(self,attrs):
        password = attrs.get('password','')
        password2 = attrs.get('password2','')
        if password != password2:
            raise serializers.ValidationError('password dosn\'t match')
        return attrs
    
    def create(self,validated_data):
        user = Patron.objects.create_user(
            email = validated_data['email'],
            first_name = validated_data.get('first_name'),
            last_name = validated_data.get('last_name'),
            password = validated_data.get('password')
        )
        return user

class LoginSerializer(serializers.ModelSerializer):
    email= serializers.EmailField(max_length=50)
    password = serializers.CharField(max_length=50, write_only=True)
    access_token= serializers.CharField(max_length=500, read_only=True)
    refresh_token= serializers.CharField(max_length=500, read_only=True)
    isAdmin = serializers.BooleanField(read_only=True)
    first_name = serializers.CharField(max_length=30, read_only=True)

    class Meta:
        model = Patron
        fields = ['email','password','access_token','refresh_token','isAdmin','first_name']

    def validate(self,attrs):
        email= attrs.get('email')
        password= attrs.get('password')
        request = self.context.get('request')
        user= authenticate(request,email=email,password=password)
        
        if not user:
            raise AuthenticationFailed('invalid credential try again')
        token=user.tokens()

        return {
            'email':user.email,
            'isAdmin':user.is_superuser,
            'first_name':user.first_name,
            'access_token':str(token.get('access')),
            'refresh_token':str(token.get('refresh')),
        }