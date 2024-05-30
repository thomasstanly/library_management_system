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
    path('book/filter/',views.FilterAPIView.as_view(),name='book_filter'),
    path('book/after_filter/',views.FilteredDataAPIView.as_view(),name='filter_result'),
    path('book/<int:id>/',views.BookRetriveUpdate.as_view(),name='book_edit'),
    path('book_variant/',views.BookVariantStockCreate.as_view(),name='book_count'),
     path('book_variant_list/',views.BookVariantList.as_view(),name='all_books'),
    path('book_variant/<int:stock>/',views.BookVariantRetriveUpdate.as_view(),name='book_retrive '),
]
