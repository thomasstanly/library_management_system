from rest_framework.mixins import ListModelMixin,CreateModelMixin,UpdateModelMixin,RetrieveModelMixin
from rest_framework.generics import GenericAPIView,ListCreateAPIView,RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from .models import *
from .serializers import *

class CategoryListCreate(ListModelMixin,CreateModelMixin,GenericAPIView):

    # permission_classes = [IsAdminUser]
    queryset = Category.objects.all()
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

    # permission_classes = [IsAdminUser]
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

class BookListCreate(ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = Bookserializer