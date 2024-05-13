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
        

class BookVariantListSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Book_variant
        fields = "__all__"
        depth = 1
        
        
class Bookserializer(serializers.ModelSerializer):
   
    class Meta:
        model = Book
        fields = ['id', 'title', 'call_number', 'category', 'genre', 'description', 'author', 'cover']
    
    def to_representation(self,instance):
        data = super().to_representation(instance)
        if 'cover' in data and data['cover']:
            request = self.context.get('request',None)
            if request is not None:
                data['cover'] = request.build_absolute_uri(data['cover'])
        return data

class BookListserializer(serializers.ModelSerializer):
    author = AuthorSerializer(many=True)
    category = CategorySerializer()
   
    class Meta:
        model = Book
        fields = ['id', 'title', 'call_number', 'category', 'genre', 'description', 'author', 'cover']
        
    
    def to_representation(self,instance):
        data = super().to_representation(instance)
        if 'cover' in data and data['cover']:
            request = self.context.get('request',None)
            if request is not None:
                data['cover'] = request.build_absolute_uri(data['cover'])
        return data
    


       