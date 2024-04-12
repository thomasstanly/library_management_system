from rest_framework import serializers
from .models import *

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

    class Meta:
        model = Author
        fields = '__all__'

class Bookserializer(serializers.ModelSerializer):
    authors = AuthorSerializer(many=True, required=False)

    class Meta:
        model = Book
        fields = '__all__'
    
    def create(self,data):
        authors_name = data.pop('authors',[])
        book = Book.objects.create(**data)
        for author_name in authors_name:
            author,_ = Author.objects.get_or_create(**author_name)
            book.authors.add(author)
        return book
        