# Generated by Django 5.0.3 on 2024-04-14 10:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('book', '0004_book_created_at_book_variant_created_at_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='cover',
            field=models.ImageField(blank=True, null=True, upload_to='covers'),
        ),
    ]