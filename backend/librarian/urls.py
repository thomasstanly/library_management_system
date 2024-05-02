from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

urlpatterns = [
    path('signup/',views.SignUp.as_view(), name='signup'),
    path('otp/',views.OTPverfication.as_view(), name='otp'),
    path('login/',views.LoginView.as_view(), name='login'),
    path('logout/', views.LogoutView.as_view(), name ='logout'),

    path('patron_list/',views.PatronList.as_view(),name='patron-list'),
    path('patron/',views.PatronRetrive.as_view(),name='patron'),
    path('patron/<int:id>/',views.PatronRetriveUpdateAPIViews.as_view(),name='patron-update'),
    path('patron/status/<int:id>/',views.PatronStatus.as_view(),name='patron-status'),
    path('patron/profile_pic/',views.PatronProfileUpdateView.as_view(),name='patron-pic'),
    path('patron/change_password/',views.PasswordChangeAPIView.as_view(),name='password-change'),
]