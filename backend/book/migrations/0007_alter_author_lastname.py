# Generated by Django 5.0.3 on 2024-04-14 15:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('book', '0006_alter_author_lastname'),
    ]

    operations = [
        migrations.AlterField(
            model_name='author',
            name='lastname',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
    ]