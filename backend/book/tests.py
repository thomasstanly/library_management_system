from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Category,Author,Book
from .serializers import Bookserializer

class CategoryListCreateTests(APITestCase):

    def setUp(self):
        self.category_data = {'category_name': 'Novel', 'category_code': 'NOV'}

    def test_create_category(self):
        url = reverse('category')
        response = self.client.post(url, self.category_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Category.objects.count(), 1)
        self.assertEqual(Category.objects.get().category_name, 'Novel')
        self.assertEqual(Category.objects.get().category_code, 'NOV') 

    def test_list_categories(self):
        Category.objects.create(category_name='Category 1', category_code='C1')
        Category.objects.create(category_name='Category 2', category_code='C2')

        url = reverse('category')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)  # Assuming 2 categories were created

class BookSerializerTest(APITestCase):
    def test_create_book_with_authors(self):
        # Create authors
        author1 = Author.objects.create(firstname='John', lastname='Doe')
        author2 = Author.objects.create(firstname='Jane', lastname='Doe')

        # Prepare data for book creation
        book_data = {
            'title': 'Test Book',
            'call_number': '123456',
            'genre': 'Fiction',
            'description': 'Test description',
            'authors': [
                {'firstname': 'John', 'lastname': 'Doe'},
                {'firstname': 'Jane', 'lastname': 'Doe'}
            ]
        }

        # Serialize data
        serializer = Bookserializer(data=book_data)

        # Validate serializer data
        self.assertTrue(serializer.is_valid())

        # Save serializer data
        serializer.save()

        # Check if book is created
        self.assertEqual(Book.objects.count(), 1)

        # Check if authors are created
        self.assertEqual(Author.objects.count(), 2)

        # Check if book authors are correct
        book = Book.objects.first()
        self.assertEqual(book.authors.count(), 2)

        # Check book details
        self.assertEqual(book.title, 'Test Book')
        self.assertEqual(book.call_number, '123456')
        self.assertEqual(book.genre, 'Fiction')
        self.assertEqual(book.description, 'Test description')

        # Check author details
        self.assertEqual(book.authors.first().firstname, 'John')
        self.assertEqual(book.authors.last().lastname, 'Doe')
