# Generated by Django 5.0.3 on 2024-04-21 20:19

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('razorpay_backend', '0006_membership_payment_membership_plan'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name='membership_payment',
            name='patron',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='user_id', to=settings.AUTH_USER_MODEL),
        ),
    ]
