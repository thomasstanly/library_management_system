# Generated by Django 5.0.3 on 2024-04-08 19:06

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Author',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('firstname', models.CharField(max_length=20)),
                ('lastname', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category_name', models.CharField(max_length=20, unique=True)),
                ('category_code', models.CharField(max_length=10, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Language',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('language', models.CharField(max_length=20, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Publisher',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('publisher_name', models.CharField(max_length=30, unique=True)),
                ('publisher_place', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100, unique=True)),
                ('genre', models.CharField(max_length=30)),
                ('description', models.CharField(max_length=250)),
                ('call_number', models.CharField(max_length=15)),
                ('author', models.ManyToManyField(related_name='related_author', to='book.author')),
                ('category', models.ForeignKey(default='Select', on_delete=django.db.models.deletion.SET_DEFAULT, related_name='related_category', to='book.category')),
            ],
        ),
        migrations.CreateModel(
            name='Book_variant',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('stock_no', models.IntegerField(unique=True)),
                ('publishing_year', models.DateField(null=True)),
                ('slug', models.SlugField(blank=True, unique=True)),
                ('book', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='related_book', to='book.book')),
                ('language', models.ForeignKey(default='Select', on_delete=django.db.models.deletion.SET_DEFAULT, related_name='related_language', to='book.language')),
                ('publisher', models.ForeignKey(default='Select', on_delete=django.db.models.deletion.SET_DEFAULT, related_name='related_publisher', to='book.publisher')),
            ],
        ),
    ]