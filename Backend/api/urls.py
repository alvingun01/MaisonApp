from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductListCreate, ProductDetails, OrderViewSet, OrderItemViewSet, CartItemViewSet, UserViewSet, RegisterView, LoginView

router = DefaultRouter(trailing_slash=False)
router.register(r'orders', OrderViewSet, basename='order')
router.register(r'orderItems', OrderItemViewSet, basename='orderitem')
router.register(r'cart-items', CartItemViewSet, basename='cartitem')
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    path('products/', ProductListCreate.as_view()),
    path('products/<str:pk>/', ProductDetails.as_view()),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('', include(router.urls)),
]