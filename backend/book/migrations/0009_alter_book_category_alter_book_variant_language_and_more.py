# Generated by Django 5.0.3 on 2024-04-17 18:08

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('book', '0008_book_variant_isbn'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='category',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='related_category', to='book.category'),
        ),
        migrations.AlterField(
            model_name='book_variant',
            name='language',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='related_language', to='book.language'),
        ),
        migrations.AlterField(
            model_name='book_variant',
            name='publisher',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='related_publisher', to='book.publisher'),
        ),
    ]
