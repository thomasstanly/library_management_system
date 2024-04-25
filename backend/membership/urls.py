from django.urls import path
from . import views

urlpatterns = [
    path('membership/',views.MemberCreateList.as_view(),name='member_list'),
    path('membership/<int:id>/',views.MemberRetriveUpdateDelete.as_view(),name='member_retrive'),
]
