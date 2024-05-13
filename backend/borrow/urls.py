from django.urls import path
from .views import *

urlpatterns = [
    path('',Check_out.as_view(),name='checkout'),
    path('check_out/',Check_out.as_view(),name='checkout'),
    path('check_in/',Check_in_and_Renew.as_view(),name='checkin'),
    path('renew/',Check_in_and_Renew.as_view(),name='renew'),
    path('patron/',Patron_Checkout.as_view(),name='patron_borrow'),
    path('book/',Book_complete_list.as_view(),name='book_borrow'),
]