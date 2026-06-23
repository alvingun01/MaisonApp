from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductListCreate, ProductDetails, OrderViewSet, CartViewSet, UserViewSet, RegisterView, LoginView

router = DefaultRouter(trailing_slash=False)
router.register(r'orders', OrderViewSet, basename='order')
router.register(r'cart', CartViewSet, basename='cart')
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    path('products/', ProductListCreate.as_view()),
    path('products/<str:pk>/', ProductDetails.as_view()),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('', include(router.urls)),
]