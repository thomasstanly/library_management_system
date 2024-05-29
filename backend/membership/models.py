from django.db import models

class Membership_plan(models.Model):
    plan_name = models.CharField(max_length=50,null=False,unique=True)
    plan_code = models.CharField(max_length=50,null=False,unique=True)
    no_books = models.IntegerField(null=False,unique=True)
    return_period = models.IntegerField(null=False,unique=True)
    fine_amount = models.IntegerField(null=False,default=10)
    plan_rate = models.IntegerField(null=False,unique=True)