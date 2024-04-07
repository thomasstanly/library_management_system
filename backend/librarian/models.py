from django.db import models
from rest_framework_simplejwt.tokens import RefreshToken
from membership.models import Membership_plan
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager,PermissionsMixin

# Create your models here.

class Manager(BaseUserManager):
    def create_user(self,email,first_name,last_name,password, **other_field):
        if not email:
            raise ValueError('User Must Have An Email Adress')
        email = self.normalize_email(email)
        user = self.model(email=email,first_name=first_name,last_name=last_name,**other_field)
        user.set_password(password)
        user.save()
        return user
    
    def create_superuser(self,email,first_name,last_name,password, **other_field):
        other_field.setdefault('is_active',True)
        other_field.setdefault('is_superuser',True)
        other_field.setdefault('is_staff',True)
        other_field.setdefault('is_email_verified',True)
        return self.create_user(email,first_name,last_name,password, **other_field)
 
class Patron(AbstractBaseUser,PermissionsMixin):
    username = models.CharField(max_length=30, unique=False)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=30)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now_add=True)
    phone_number = models.BigIntegerField(unique=True,null=True)
    membership_id = models.OneToOneField(Membership_plan,null=True,on_delete=models.SET_NULL,related_name='membership')
    mebership_date = models.DateField(null=True)
    otp = models.IntegerField(null=True)
    otp_expire = models.DateTimeField(null=True)
    is_email_verified = models.BooleanField(default=False)


    objects = Manager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name','last_name']


    def __str__(self):
        return self.email
    
    def tokens(self):
        refresh = RefreshToken.for_user(self)
        refresh["first_name"] = str(self.first_name)
        return {
            'refresh': str(refresh),
            'access': str((refresh.access_token))
        }
    
    
class UserProfile(models.Model):
    user=models.OneToOneField(Patron,on_delete=models.CASCADE,related_name="Profile")
    profile_pic = models.ImageField(upload_to='profile',null=True,blank=True)
    
    def __str__(self):
        return str(self.user.first_name)