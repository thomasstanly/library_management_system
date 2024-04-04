from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

urlpatterns = [
    path('signup/',views.SignUp.as_view(), name='signup'),
    path('login/',views.LoginView.as_view(), name='login'),
    path('logout/', views.LogoutView.as_view(), name ='logout'),
]