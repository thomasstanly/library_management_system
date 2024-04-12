from django.urls import path
from . import views
urlpatterns = [
    path('category/',views.CategoryListCreate.as_view(),name='category'),
    path('category_edit/<int:id>/',views.CaltegoryRetriveUpdate.as_view(),name='category_edit'),
    path('language/',views.LanguageListCreate.as_view(),name='language'),
    path('language_edit/<int:id>/',views.LanguageRetriveUpdate.as_view(),name='language'),
    path('publisher/',views.PublisherListCreate.as_view(),name='publisher'),
    path('publisher_edit/<int:id>/',views.PublisherRetriveUpdate.as_view(),name='publisher_edit'),
    path('book/',views.BookListCreate.as_view(),name='book'),
]
