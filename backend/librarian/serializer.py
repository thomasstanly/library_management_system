from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import Patron,UserProfile
from membership.serializers import MemberSerializer
from django.contrib.auth.password_validation import validate_password
from razorpay_backend.serializers import MembershipPaymentSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['email'] = user.email
        token['is_superuser'] = user.is_superuser
        token['first_name'] = user.first_name
        # ...

        return token

class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=30, min_length=6, write_only=True)
    password2 = serializers.CharField(max_length=30, min_length=6, write_only=True)

    class Meta:
        model = Patron
        fields = ['email','first_name','last_name','password','password2','phone_number']

    def validate(self,attrs):
        password = attrs.get('password','')
        password2 = attrs.get('password2','')
        if password != password2:
            raise serializers.ValidationError('password dosn\'t match')
        
        phone_number = attrs.get('phone_number','')
        if len(str(phone_number))!= 10:
            raise serializers.ValidationError('Phone number should be 10 digits long')
        
        if not str(phone_number).isdigit():
            raise serializers.ValidationError('Phone number should contain only digits')
            
        return attrs
    
    def create(self,validated_data):
        user = Patron.objects.create_user(
            email = validated_data['email'],
            first_name = validated_data.get('first_name'),
            last_name = validated_data.get('last_name'),
            password = validated_data.get('password'),
            phone_number = validated_data.get('phone_number')
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
    
class UserProfileSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = UserProfile
        fields = ['profile_pic']

class PtronListCreateSerializer(serializers.ModelSerializer):
    Profile = UserProfileSerializer(required=True)
    

    class Meta:
        model = Patron
        fields =['id','first_name','last_name','email','Profile','is_active','date_joined','phone_number','membership_id']
        depth = 1

class PatronUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Patron
        fields =['id','first_name','last_name','email','is_active','phone_number','membership_id','Profile','user_id']
        depth = 1
        
        def validate_first_name(self, value):
            if not value.isalpha():
                raise serializers.ValidationError("First name should contain only characters.")
            return value

        def validate_last_name(self, value):
            if not value.isalpha():
                raise serializers.ValidationError("Last name should contain only characters.")
            return value

        def validate_email(self, value):
            if "@" not in value or "." not in value:
                raise serializers.ValidationError("Invalid email format.")
            return value

        def validate_phone_number(self, value):
            if len(value) != 10 or not value.isdigit():
                raise serializers.ValidationError("Phone number should be exactly 10 digits.")
            return value

        def update(self, instance, validated_data):
            for attr, value in validated_data.items():
                setattr(instance, attr, value)
            instance.save()
            return instance   

class PasswordChangeSerializer(serializers.Serializer):
    password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
    confirm_password = serializers.CharField(required=True)

    def validate(self, data):
        if data['new_password'] != data['confirm_password']:
            raise serializers.ValidationError("The new passwords do not match.")
        user = self.context['request'].user
        if not user.check_password(data['password']):
            raise serializers.ValidationError("Incorrect old password.")
        return data