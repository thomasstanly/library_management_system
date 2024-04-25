# Generated by Django 5.0.3 on 2024-04-21 10:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('razorpay_backend', '0002_membership_payment'),
    ]

    operations = [
        migrations.AddField(
            model_name='membership_payment',
            name='status',
            field=models.CharField(choices=[('PAID', 'Paid'), ('UNPAID', 'Unpaid')], default='UNPAID'),
        ),
        migrations.AddField(
            model_name='transaction',
            name='status',
            field=models.CharField(choices=[('SUCCESS', 'Success'), ('FAILURE', 'Failure'), ('PENDING', 'Pending')], default='PENDING'),
        ),
    ]