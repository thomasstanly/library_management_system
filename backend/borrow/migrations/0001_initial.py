# Generated by Django 5.0.3 on 2024-05-02 06:15

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('book', '0009_alter_book_category_alter_book_variant_language_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Borrow',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('borrowed_date', models.DateTimeField(auto_now_add=True)),
                ('due_date', models.DateField()),
                ('return_date', models.DateTimeField(blank=True, null=True)),
                ('renewal_count', models.PositiveIntegerField(default=0, verbose_name='renewals remaining')),
                ('book', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='related_book', to='book.book_variant')),
                ('patron', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='related_patron', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-borrowed_date'],
            },
        ),
    ]