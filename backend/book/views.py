from django.db.models import Q
from rest_framework.mixins import ListModelMixin, CreateModelMixin, UpdateModelMixin, RetrieveModelMixin, DestroyModelMixin
from rest_framework.generics import GenericAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import *
from .serializers import *


class CategoryListCreate(ListModelMixin, CreateModelMixin, GenericAPIView):

    permission_classes = [IsAdminUser]
    queryset = Category.objects.all().order_by('-created_at')
    serializer_class = CategorySerializer

    def perform_create(self, serializer):
        category_name = self.request.data.get('category_name', None)
        category_code = self.request.data.get('category_code', None)

        if category_name:
            serializer.validated_data['category_name'] = category_name.capitalize(
            )
        if category_code:
            serializer.validated_data['category_code'] = category_code.upper()

        return super().perform_create(serializer)

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class CaltegoryRetriveUpdate(RetrieveUpdateDestroyAPIView, GenericAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
    lookup_field = 'id'

    def perform_update(self, serializer):
        category_name = self.request.data.get('category_name', None)
        category_code = self.request.data.get('category_code', None)

        if category_name:
            serializer.validated_data['category_name'] = category_name.capitalize(
            )
        if category_code:
            serializer.validated_data['category_code'] = category_code.upper()

        serializer.save()

        return super().perform_update(serializer)

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

# class CategoryBookCount(GenericAPIView):

#     def get(self,request,*args,**kwargs):


class LanguageListCreate(ListModelMixin, CreateModelMixin, GenericAPIView):

    permission_classes = [IsAdminUser]
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer

    def perform_create(self, serializer):
        language = self.request.data.get('language', None)

        if language:
            serializer.validated_data['language'] = language.capitalize()

        return super().perform_create(serializer)

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class LanguageRetriveUpdate(RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin, GenericAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = LanguageSerializer
    queryset = Language.objects.all()
    lookup_field = 'id'

    def perform_update(self, serializer):
        language = self.request.data.get('language', None)

        if language:
            serializer.validated_data['language'] = language.capitalize()

        return super().perform_update(serializer)

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class PublisherListCreate(ListCreateAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = PublisherSerializer
    queryset = Publisher.objects.all()

    def perform_create(self, serializer):
        publisher_name = self.request.data.get('publisher_name', None)
        publisher_place = self.request.data.get('publisher_place', None)

        if publisher_name:
            serializer.validated_data['publisher_name'] = publisher_name.capitalize(
            )
        if publisher_name:
            serializer.validated_data['publisher_place'] = publisher_place.capitalize(
            )

        return super().perform_create(serializer)


class PublisherRetriveUpdate(RetrieveUpdateDestroyAPIView, GenericAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = PublisherSerializer
    queryset = Publisher.objects.all()
    lookup_field = 'id'

    def perform_update(self, serializer):
        publisher_name = self.request.data.get('publisher_name', None)
        publisher_place = self.request.data.get('publisher_place', None)

        if publisher_name:
            serializer.validated_data['publisher_name'] = publisher_name.capitalize(
            )
        if publisher_name:
            serializer.validated_data['publisher_place'] = publisher_place.capitalize(
            )

        return super().perform_update(serializer)


class FilterAPIView(GenericAPIView):

    def get(self, request, *args, **kwargs):
        category = Category.objects.all()
        cat_serialzer = CategorySerializer(category, many=True)
        publisher = Publisher.objects.all()
        pub_serializer = PublisherSerializer(publisher, many=True)
        language = Language.objects.all()
        lang_serializer = LanguageSerializer(language, many=True)

        return Response({'category': cat_serialzer.data, 'publisher': pub_serializer.data, 'language': lang_serializer.data}, status=status.HTTP_200_OK)


class FilteredDataAPIView(GenericAPIView):

    def get(self, request, *args, **kwargs):
        category = request.GET.get('category')
        publisher = request.GET.get('publisher')
        language = request.GET.get('language')
        
        try:
            filter_conditions = Q()

            if category:
                try:
                    category = Category.objects.get(id=category)
                    book = Book.objects.filter(category=category)
                    filter_conditions &= Q(book__in=book)
                except Category.DoesNotExist:
                    return Response({'error': 'Category not found'}, status=status.HTTP_404_NOT_FOUND)

            if publisher:
                try:
                    publisher = Publisher.objects.get(id=publisher)
                    filter_conditions &= Q(publisher=publisher)
                except Publisher.DoesNotExist:
                    return Response({'error': 'Publisher not found'}, status=status.HTTP_404_NOT_FOUND)

            if language:
                try:
                    language = Language.objects.get(id=language)
                    filter_conditions &= Q(language=language)
                except Language.DoesNotExist:
                    return Response({'error': 'Language not found'}, status=status.HTTP_404_NOT_FOUND)

            if filter_conditions:
                variants = Book_variant.objects.filter(filter_conditions)
                serializer = BookVariantListSerializer(variants, context={'request': request}, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'No valid filter conditions provided'}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class BookListCreate(GenericAPIView):
    queryset = Book.objects.all()

    def get(self, request, format=None):
        books = Book.objects.all()
        serializer = BookListserializer(
            books, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        data = request.data
        category = Category.objects.get(id=data["category"])

        try:
            book = Book.objects.create(title=data["title"], call_number=data["call_number"],
                                       category=category, genre=data["genre"], description=data["description"],
                                       cover=data["cover"])
            book.save()
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        authors_data_str = data.get("authors", [])
        authors_data = json.loads(authors_data_str)

        for author_data in authors_data:
            author_obj, _ = Author.objects.get_or_create(
                firstname=author_data["firstname"], lastname=author_data["lastname"])
            book.author.add(author_obj)

        serlizer = Bookserializer(book)

        return Response(serlizer.data, status=status.HTTP_201_CREATED)


class BookRetriveUpdate(RetrieveUpdateDestroyAPIView, GenericAPIView):
    # permission_classes=[IsAdminUser]
    serializer_class = Bookserializer
    queryset = Book.objects.all()
    lookup_field = 'id'

    def get(self, request, *args, **kwargs):
        try:
            book = self.get_object()
            serializer = BookListserializer(book, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Book.DoesNotExist:
            return Response({'error': 'Book not found'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, *args, **kwargs):
        data = request.data

        try:
            book = self.get_object()
            if data['category']:
                category = Category.objects.get(category_name=data["category"])
                book.category = category
            if "title" in data and data["title"]:
                book.title = data["title"]
            if "call_number" in data and data["call_number"]:
                book.call_number = data["call_number"]
            if "genre" in data and data["genre"]:
                book.genre = data["genre"]
            if "description" in data and data["description"]:
                book.description = data["description"]
            if "cover" in data and data["cover"]:
                book.cover = data["cover"]

            book.save()

            authors_data_str = data.get("authors", [])
            authors_data = json.loads(authors_data_str)

            # Clear existing authors
            book.author.clear()

            for author_data in authors_data:
                author_obj, _ = Author.objects.get_or_create(
                    firstname=author_data["firstname"], lastname=author_data["lastname"])
                book.author.add(author_obj)

            serializer = Bookserializer(book)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Book.DoesNotExist:
            return Response({'error': 'Book not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class BookVariantStockCreate(GenericAPIView):

    def get(self, request, *args, **kwargs):
        stock = request.GET.get('stock')
        try:
            if stock:
                book_variant = Book_variant.objects.get(stock_no=stock)
                serializer = BookVariantListSerializer(book_variant) 
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'stock not found'}, status=status.HTTP_404_NOT_FOUND)
        except Book_variant.DoesNotExist:
            return Response({'error': 'Book not found'}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, *args, **kwargs):
        serializer = BookVariantSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BookVariantList(ListCreateAPIView):
    queryset = Book_variant.objects.all()
    serializer_class = BookVariantListSerializer


class BookVariantRetriveUpdate(GenericAPIView):

    def get(self, request, stock):
        book_variant = Book_variant.objects.get(stock_no=stock)
        serializer = BookVariantListSerializer(book_variant)
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        stock = self.kwargs.get('stock')
        print(stock)
        try:
            book_variant = Book_variant.objects.get(stock_no=stock)
        except Book_variant.DoesNotExist:
            return Response({'error': 'not found'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = BookVariantSerializer(
            book_variant, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)
