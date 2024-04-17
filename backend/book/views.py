from rest_framework.mixins import ListModelMixin,CreateModelMixin,UpdateModelMixin,RetrieveModelMixin
from rest_framework.generics import GenericAPIView,ListCreateAPIView,RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from .models import *
from .serializers import *

class CategoryListCreate(ListModelMixin,CreateModelMixin,GenericAPIView):

    permission_classes = [IsAdminUser]
    queryset = Category.objects.all().order_by('-created_at')
    serializer_class = CategorySerializer

    def perform_create(self, serializer):
        category_name = self.request.data.get('category_name', None)
        category_code = self.request.data.get('category_code', None)
        
        if category_name:
            serializer.validated_data['category_name'] = category_name.capitalize()
        if category_code:
            serializer.validated_data['category_code'] = category_code.upper()
        
        return super().perform_create(serializer)

    def get(self,request,*args,**kwargs):
        return self.list(request,*args,**kwargs)
    
    def post(self,request,*args,**kwargs):
        return self.create(request,*args,**kwargs)
        
    
class CaltegoryRetriveUpdate(RetrieveModelMixin,UpdateModelMixin,GenericAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
    lookup_field = 'id'

    def perform_update(self, serializer):
        category_name = self.request.data.get('category_name', None)
        category_code = self.request.data.get('category_code', None)
        
        if category_name:
            serializer.validated_data['category_name'] = category_name.capitalize()
        if category_code:
            serializer.validated_data['category_code'] = category_code.upper()
        
        return super().perform_update(serializer)
    
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    
class LanguageListCreate(ListModelMixin,CreateModelMixin,GenericAPIView):

    permission_classes = [IsAdminUser]
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer

    def perform_create(self, serializer):
        language = self.request.data.get('language', None)
        
        if language:
            serializer.validated_data['language'] = language.capitalize()
        
        return super().perform_create(serializer)

    def get(self,request,*args,**kwargs):
        return self.list(request,*args,**kwargs)
    
    def post(self,request,*args,**kwargs):
        return self.create(request,*args,**kwargs)
    
class LanguageRetriveUpdate(RetrieveModelMixin,UpdateModelMixin,GenericAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = LanguageSerializer
    queryset = Language.objects.all()
    lookup_field = 'id'

    def perform_update(self, serializer):
        language = self.request.data.get('language', None)

        if language:
            serializer.validated_data['language'] = language.capitalize()

        return super().perform_update(serializer)

    def get(self,request,*args,**kwargs):
        return self.retrieve(request,*args,**kwargs)
    
    def put(self,request,*args,**kwargs):
        return self.update(request,*args,**kwargs)
    
class PublisherListCreate(ListCreateAPIView):
    permission_classes = [IsAdminUser]
    serializer_class= PublisherSerializer
    queryset = Publisher.objects.all()

    def perform_create(self, serializer):
        publisher_name = self.request.data.get('publisher_name', None)
        publisher_place = self.request.data.get('publisher_place', None)

        if publisher_name:
            serializer.validated_data['publisher_name'] = publisher_name.capitalize()
        if publisher_name:
            serializer.validated_data['publisher_place'] = publisher_place.capitalize() 

        return super().perform_create(serializer)


class PublisherRetriveUpdate(RetrieveUpdateDestroyAPIView,GenericAPIView):
    permission_classes = [IsAdminUser]
    serializer_class= PublisherSerializer
    queryset = Publisher.objects.all()
    lookup_field = 'id'

    def perform_update(self, serializer):
        publisher_name = self.request.data.get('publisher_name', None)
        publisher_place = self.request.data.get('publisher_place', None)

        if publisher_name:
            serializer.validated_data['publisher_name'] = publisher_name.capitalize()
        if publisher_name:
            serializer.validated_data['publisher_place'] = publisher_place.capitalize() 

        return super().perform_update(serializer)
    

class BookListCreate(GenericAPIView):
    queryset = Book.objects.all()
    serializer_class = Bookserializer

    def get(self, request, format=None):
        books = Book.objects.all()
        serializer = Bookserializer(books, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        data = request.data
        category = Category.objects.get(id=data["category"])
        # print(data["cover"])
        try:
            book = Book.objects.create(title=data["title"],call_number=data["call_number"],
                                   category=category,genre=data["genre"],description=data["description"],
                                   cover=data["cover"])
            book.save()
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        authors_data_str = data.get("authors",[])
        authors_data = json.loads(authors_data_str)

        for author_data in authors_data:
            author_obj,_ = Author.objects.get_or_create(firstname=author_data["firstname"], lastname=author_data["lastname"])
            book.author.add(author_obj)
        
        serlizer = Bookserializer(book)

        return Response(serlizer.data ,status=status.HTTP_201_CREATED)


class BookRetriveUpdate(RetrieveUpdateDestroyAPIView,GenericAPIView):
    permission_classes = [IsAdminUser]
    serializer_class= Bookserializer
    queryset = Book.objects.all()
    lookup_field = 'id'

class BookVariantListCreate(ListCreateAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = BookVariantSerializer
    queryset = Book_variant.objects.all()

class BookVariantRetriveUpdate(GenericAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = BookVariantSerializer
    
    def get(self, request, book):
        book_variant = Book_variant.objects.filter(book=book)
        serializer = self.serializer_class(book_variant, many=True)
        return Response(serializer.data)