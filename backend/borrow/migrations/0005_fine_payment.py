# Generated by Django 5.0.3 on 2024-05-20 11:06

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('borrow', '0004_alter_borrow_book_alter_borrow_patron'),
    ]

    operations = [
        migrations.CreateModel(
            name='fine_payment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.BigIntegerField()),
                ('date_assessed', models.DateField()),
                ('fine_status', models.CharField(choices=[('SUCCESS', 'Success'), ('FAILURE', 'Failure'), ('PENDING', 'Pending')], default='PENDING')),
                ('borrow', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='borrow.borrow')),
            ],
        ),
    ]
