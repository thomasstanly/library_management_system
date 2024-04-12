# Generated by Django 5.0.3 on 2024-04-10 15:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('book', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='author',
            name='firstname',
        ),
        migrations.RemoveField(
            model_name='author',
            name='lastname',
        ),
        migrations.AddField(
            model_name='author',
            name='author_name',
            field=models.CharField(default=2, max_length=50),
            preserve_default=False,
        ),
    ]
