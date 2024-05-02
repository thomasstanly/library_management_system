from django.db import models
from librarian.models import Patron
from membership.models import Membership_plan

class Membership_payment(models.Model):
    STATUS_CHOICE=(
        ('PAID','Paid'),
        ('UNPAID', 'Unpaid')
    )
    patron = models.ForeignKey(Patron,on_delete=models.CASCADE,related_name='user_id')
    membership_plan = models.ForeignKey(Membership_plan, on_delete=models.SET_NULL, null=True,related_name= 'membership_plan_id',unique=False)
    from_date = models.DateField()
    expiry_date = models.DateField()
    amount_paid = models.BigIntegerField()
    status = models.CharField(choices=STATUS_CHOICE,default='UNPAID')

class Transaction(models.Model):
    STATUS_CHOICES = (
        ('SUCCESS', 'Success'),
        ('FAILURE', 'Failure'),
        ('PENDING', 'Pending')
    )
    payment_id = models.CharField(max_length=100,verbose_name="Payment_ID")
    membership_payment = models.OneToOneField(Membership_payment,on_delete=models.CASCADE,related_name="payment",null=True)
    order_id = models.CharField(max_length=100,verbose_name="Order_ID")
    signature = models.CharField(max_length=100,verbose_name="Signature")
    amount = models.IntegerField(verbose_name="Amount")
    datetime = models.DateTimeField(auto_now_add=True)
    status = models.CharField(choices=STATUS_CHOICES,default='PENDING')

    def __str__(self):
        return str(self.id)