# Generated by Django 5.0.3 on 2024-05-21 07:39

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('borrow', '0007_alter_finepayment_borrow'),
    ]

    operations = [
        migrations.AlterField(
            model_name='finepayment',
            name='borrow',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='fine_payment', to='borrow.borrow'),
        ),
    ]
