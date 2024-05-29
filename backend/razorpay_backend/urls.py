from django.urls import path
from .views import *

urlpatterns = [
    path('dashboard/',Dashboard.as_view(),name='dashboard'),
    path('order/',PaymentCreateAPIView.as_view(),name='online_payment_'),
    path('order/<int:id>/',OrderRetriveAPIView.as_view(),name='online_payment_retrive'),
    path('order/create/',CreateOderAPIview.as_view(),name='online_payment_create'),
    path('order/complete/',TransactionAPIView.as_view(),name='online_payment_complete'),
    path('patron/<int:patron>/',PaymentRetrieveAPIView.as_view(),name='online_payment_patron_retrive'),
    path('membership_pyment/',MembershipPaymentListAPIViews.as_view(),name='payment_histroy'),
    path('fine_payment/',FinePaymentRquestAPIViews.as_view(),name='online_fine_payment'),
    path('fine_payment/complete/',FineTransctionAPIViews.as_view(),name='online_fine_payment'),
]