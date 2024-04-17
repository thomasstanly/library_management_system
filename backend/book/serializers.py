from rest_framework import serializers
from .models import *
import json

class CategorySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Category
        fields = '__all__'


class LanguageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Language
        fields = '__all__'

class PublisherSerializer(serializers.ModelSerializer):

    class Meta:
        model = Publisher
        fields = '__all__'

class AuthorSerializer(serializers.ModelSerializer):
    firstname = serializers.CharField(max_length=20)
    lastname = serializers.CharField(max_length=20)

    class Meta:
        model = Author
        fields = ['id', 'firstname', 'lastname']

class BookVariantSerializer(serializers.ModelSerializer):

    class Meta:
        model = Book_variant
        fields = "__all__"
        depth = 1
        
class Bookserializer(serializers.ModelSerializer):
    
    class Meta:
        model = Book
        fields = ['id', 'title', 'call_number', 'category', 'genre', 'description', 'author', 'cover']
        depth = 1