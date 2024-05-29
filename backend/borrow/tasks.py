from celery import shared_task
from django.utils import timezone
from .models import Borrow,FinePayment

@shared_task(bind=True)
def check_overdue_items(self):
    today = timezone.now().date()
    due_borrowers = Borrow.objects.filter(due_date__lt=today,return_date__isnull=True)

    for borrow in due_borrowers:
        days_overdue = (today - borrow.due_date).days
        fine_amount = days_overdue*borrow.patron.membership_id.fine_amount
        
        FinePayment.objects.update_or_create(borrow=borrow,defaults={'amount':fine_amount,'date_assessed':today})