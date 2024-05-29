from django.urls import path
from . import views

urlpatterns = [
    path('membership/',views.MemberCreateList.as_view(),name='member_list'),
    path('membership/<int:id>/',views.MemberRetriveUpdateDelete.as_view(),name='member_retrive'),
    path('search/',views.AdminSearchBarAPIViews.as_view(),name='search'),
    path('patron_search/',views.PatronSearchBarAPIViews.as_view(),name='patron_search'),
]
