from django.urls import path
from .views import *

urlpatterns = [
    path('order/',PaymentCreateAPIView.as_view(),name='online_payment_'),
    path('order/<int:id>/',PaymentRetrieveAPIView.as_view(),name='online_payment_retrive'),
    path('order/create/',CreateOderAPIview.as_view(),name='online_payment_create'),
    path('order/complete/',TransactionAPIView.as_view(),name='online_payment_complete'),
]