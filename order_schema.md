# MaisonApp - Order Schema Design

This document details the database schema design options for integrating the frontend checkout/order payload with the Django backend.

## Frontend Payload Structure

The current frontend order object structure is:

```json
{
  "id": "ORD-1780975975411",
  "date": "2026-06-09T03:32:55.411Z",
  "products": {
    "p003": {
      "id": "p003",
      "name": "Brass Desk Lamp",
      "category": "Lighting",
      "price": 340,
      "original": null,
      "emoji": "🪔",
      "rating": 4.7,
      "reviews": 56,
      "stock": 8,
      "badge": null,
      "sizes": null,
      "desc": "...",
      "material": "...",
      "origin": "...",
      "sku": "...",
      "quantity": 1
    }
  },
  "paymentInfo": {
    "firstName": "Alvin",
    "lastName": "Gunawan",
    "email": "agunawan855@gmail.com",
    "phone": "+6583586053",
    "line1": "101 Lor Sarina",
    "line2": "",
    "city": "fff",
    "zip": "416729",
    "country": "Other",
    "ccNumber": "",
    "ccName": "",
    "ccExp": "",
    "ccCVV": "",
    "currPaymentMode": "paypal"
  },
  "shippingCost": 0,
  "subtotal": 340,
  "discount": 51,
  "total": 289
}
```

---

## Design Options

### Option 1: Relational Schema (Recommended)

This approach breaks the payload down into two tables: `Order` (holding order details & shipping/payment info) and `OrderItem` (linking the order to the `Product` table).

#### Django Models (`Backend/api/models.py`)

```python
from django.db import models
from .models import Product  # Importing your existing Product model

class Order(models.Model):
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

    def __str__(self):
        return f"{self.id} ({self.first_name} {self.last_name})"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.PROTECT) # Protects order history if a product is deleted
    quantity = models.PositiveIntegerField()
    price_at_purchase = models.DecimalField(max_digits=10, decimal_places=2) # Captures the price at checkout

    def __str__(self):
        return f"{self.quantity}x {self.product.name} (Order {self.order.id})"
```

#### Pros:
- Enforces database constraints (foreign keys).
- Enables clean analytics and inventory tracking (e.g. sales by product/category).
- Retains pricing accuracy even if product prices are updated in the future.

#### Cons:
- Slightly more complex to write serializers/views for nested creation.

---

### Option 2: JSONField Schema (Alternative)

This approach stores the dynamic objects (`products` map and `paymentInfo`) as native JSON fields in a single database table.

#### Django Models (`Backend/api/models.py`)

```python
from django.db import models

class Order(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    date = models.DateTimeField()
    
    # Storing nested objects directly as JSON in the database
    products = models.JSONField()      # Stores the dictionary of products with their quantities
    payment_info = models.JSONField()  # Stores first_name, last_name, lines, cc etc.
    
    # Financial Totals
    shipping_cost = models.DecimalField(max_digits=10, decimal_places=2)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    discount = models.DecimalField(max_digits=10, decimal_places=2)
    total = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.id
```

#### Pros:
- Very quick database setup.
- Flexible schema that can adapt if the frontend payload changes structure in the future.

#### Cons:
- Lacks database constraints or referential integrity with the `Product` model.
- More difficult to write clean queries for data analysis.
