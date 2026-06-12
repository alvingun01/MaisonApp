from django.urls import path
from .views import ProductListCreate, ProductDetails

urlpatterns = [
    path('products/', ProductListCreate.as_view()),
    path('products/<str:pk>/', ProductDetails.as_view()),
]
    