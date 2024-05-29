from django.db.models import Q
from rest_framework.generics import GenericAPIView,ListCreateAPIView,RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from librarian.models import Patron
from librarian.serializer import PtronListCreateSerializer
from book.models import Book_variant
from book.serializers import BookVariantListSerializer
from .models import *
from .serializers import *

class MemberCreateList(ListCreateAPIView,GenericAPIView):
    # permission_classes=[IsAuthenticated]    
    queryset = Membership_plan.objects.all()
    serializer_class=MemberSerializer

class MemberRetriveUpdateDelete(RetrieveUpdateDestroyAPIView,GenericAPIView):
    queryset = Membership_plan.objects.all()
    serializer_class = MemberSerializer
    lookup_field='id'

class AdminSearchBarAPIViews(GenericAPIView):

    def get(self,request,*args,**kwargs):
        query = request.GET.get('query')
        print(query)
        data = []
        if query:
            query_words = query.split()
            patron_filter = Q()
            book_filter = Q()

            for word in query_words:
                patron_filter &= (Q(first_name__icontains=word) |
                                  Q(last_name__icontains=word) |
                                   Q(membership_id__plan_code__icontains=word) |
                                  Q(id__icontains=word))

                book_filter &= (Q(book__title__icontains=word) |
                                Q(book__author__firstname__icontains=word) |
                                 Q(book__author__lastname__icontains=word) |
                                Q(stock_no__icontains=word))

            patrons = Patron.objects.filter(patron_filter)
            patron_serializer = PtronListCreateSerializer(patrons, many=True)
            data.extend(patron_serializer.data)

            books = Book_variant.objects.filter(book_filter)
            book_serializer = BookVariantListSerializer(books, many=True)
            data.extend(book_serializer.data)

            if not data:
                return Response({'error':"result not found"},status=status.HTTP_400_BAD_REQUEST)
        
        return Response({'success': data if query else 'No query provided'})

class PatronSearchBarAPIViews(GenericAPIView):

    def get(self,request,*args,**kwargs):
        query = request.GET.get('query')
        print(query)
        if query:
            query_words = query.split()
            book_filter = Q()

            for word in query_words:
                book_filter &= (Q(book__title__icontains=word) |
                                Q(book__author__firstname__icontains=word) |
                                 Q(book__author__lastname__icontains=word) |
                                Q(stock_no__icontains=word))

            books = Book_variant.objects.filter(book_filter)
            book_serializer = BookVariantListSerializer(books, many=True)
            

            if not book_serializer:
                return Response({'error':"result not found"},status=status.HTTP_400_BAD_REQUEST)
        
        return Response({'success': book_serializer.data if query else 'No query provided'})