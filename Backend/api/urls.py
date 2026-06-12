from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductListCreate, ProductDetails, OrderViewSet, OrderItemViewSet

router = DefaultRouter(trailing_slash=False)
router.register(r'orders', OrderViewSet, basename='order')
router.register(r'orderItems', OrderItemViewSet, basename='orderitem')

urlpatterns = [
    path('products/', ProductListCreate.as_view()),
    path('products/<str:pk>/', ProductDetails.as_view()),
    path('', include(router.urls)),
]