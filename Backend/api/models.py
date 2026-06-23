from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Product(models.Model):
    id = models.CharField(max_length=10, primary_key=True)
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    original = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    emoji = models.CharField(max_length=10)
    rating = models.DecimalField(max_digits=10, decimal_places=2)
    reviews = models.IntegerField()
    stock = models.IntegerField()
    badge = models.CharField(max_length=10, blank=True, null=True)
    sizes = models.CharField(max_length=255, blank=True, null=True)
    desc = models.TextField()
    material = models.CharField(max_length=255)
    origin = models.CharField(max_length=255)
    sku = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders', null=True, blank=True)
    id = models.CharField(max_length=100, primary_key=True)  # e.g., "ORD-1780975975411"
    date = models.DateTimeField()                            # e.g., "2026-06-09T03:32:55.411Z"
    
    # Customer / Shipping Info (Flattened from paymentInfo)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=50)
    line1 = models.CharField(max_length=255)
    line2 = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=20)
    country = models.CharField(max_length=100)
    payment_mode = models.CharField(max_length=50)           # e.g., "paypal"
    
    # Financial Totals
    shipping_cost = models.DecimalField(max_digits=10, decimal_places=2)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    discount = models.DecimalField(max_digits=10, decimal_places=2)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    items = models.JSONField(default={})

    def __str__(self):
        return f"{self.id} ({self.first_name} {self.last_name})"

# class OrderItem(models.Model):
#     order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
#     product = models.ForeignKey(Product, on_delete=models.PROTECT) # Protects order history if a product is deleted
#     quantity = models.PositiveIntegerField()
#     price_at_purchase = models.DecimalField(max_digits=10, decimal_places=2) # Captures the price at checkout

#     def __str__(self):
#         return f"{self.quantity}x {self.product.name} (Order {self.order.id})"

class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cart_items', null=True, blank=True)
    content = models.JSONField()
    cartCount = models.IntegerField()

    def __str__(self):
        return f"{self.user.username}'s cart"