# Generated by Django 5.0.3 on 2024-05-05 09:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('borrow', '0002_alter_borrow_due_date'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='borrow',
            name='renewal_count',
        ),
        migrations.AddField(
            model_name='borrow',
            name='renewal',
            field=models.BooleanField(default=False),
        ),
    ]
