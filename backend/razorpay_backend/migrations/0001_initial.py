# Generated by Django 5.0.3 on 2024-04-20 22:03

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('payment_id', models.CharField(max_length=100, verbose_name='Payment_ID')),
                ('order_id', models.CharField(max_length=100, verbose_name='Order_ID')),
                ('signature', models.CharField(max_length=100, verbose_name='Signature')),
                ('amount', models.IntegerField(verbose_name='Amount')),
                ('datetime', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
