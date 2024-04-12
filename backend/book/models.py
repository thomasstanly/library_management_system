from django.db import models
from django.utils.text import slugify


class Category(models.Model):
    category_name = models.CharField(max_length=20,unique=True)
    category_code = models.CharField(max_length=10,unique=True)

    def __str__(self):
        return self.category_name


class Language(models.Model):
    language = models.CharField(max_length=20,unique=True)

    def __str__(self):
        return self.language
    

class Publisher(models.Model):
    publisher_name = models.CharField(max_length=30,unique=True)
    publisher_place = models.CharField(max_length=30)

    def __str__(self):
        return self.publisher_name
    

class Author(models.Model):
    firstname = models.CharField(max_length=20)
    lastname = models.CharField(max_length=20) 

    class meta:
        unique_together = ('firstname','lastname') #integrity error
    
    def __str__(self):
        return f"{self.firstname} {self.lastname}"
    
class Book(models.Model):
    title = models.CharField(max_length=100,unique=True)
    author = models.ManyToManyField(Author,related_name="related_author")
    genre = models.CharField(max_length=30)
    description = models.CharField(max_length=250)
    call_number = models.CharField(max_length=15)
    category = models.ForeignKey(Category,related_name="related_category",on_delete=models.SET_DEFAULT, default="Select")

    def __str__(self):
        return self.title
    

class Book_variant(models.Model):
    stock_no = models.IntegerField(unique=True)
    book = models.ForeignKey(Book,related_name="related_book",on_delete=models.CASCADE)
    language = models.ForeignKey(Language,related_name="related_language",on_delete=models.SET_DEFAULT, default="Select")
    publisher = models.ForeignKey(Publisher,related_name="related_publisher",on_delete=models.SET_DEFAULT, default="Select")
    publishing_year = models.DateField(null=True)
    slug = models.SlugField(unique=True, blank=True)

    def __str__(self):
        return f"{self.book.title}-{self.stock_no}"
    
    def save(self, *args, **kwargs):
        if not self.slug:
            title_slug = slugify(self.book.title)
            stock_no_slug = slugify(str(self.stock_no))
            self.slug = f"{title_slug}-{stock_no_slug}"
        super().save(*args, **kwargs)