from django.db import models
from datetime import timedelta
from librarian.models import Patron
from book.models import Book_variant

class Borrow(models.Model):
    patron = models.ForeignKey(Patron,related_name='borrow_patron',on_delete=models.CASCADE)
    book = models.ForeignKey(Book_variant, related_name="borrow_book", on_delete=models.SET_NULL, null=True) 
    borrowed_date = models.DateTimeField(auto_now_add=True)
    due_date = models.DateField(null=True) 
    return_date = models.DateTimeField(blank=True, null=True)
    renewal = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-borrowed_date']
        
    def __str__(self): 
        return f"{self.patron} borrowed {self.book}"
    
    def calculate_due_date(self, *args, **kwargs):
        
        try:
            memebership = self.patron.membership_id
           
            days = memebership.return_period
            print(self.borrowed_date)
            self.due_date = self.borrowed_date.date() + timedelta(days=days)
            print(self.due_date)
        except AttributeError: 
            return 
        