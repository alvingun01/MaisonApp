# MaisonApp - Q&A Log

This file records the questions asked and solutions provided during development.

---

### 1. Cannot find module `django.db`
**Question:**
> Explain what this problem is and help me fix it: Cannot find module `django.db`

**Answer:**
The IDE was using the global macOS system Python interpreter (`/Library/Frameworks/Python.framework/Versions/3.13/bin/python3.13`) instead of the project's virtual environment in `.MaisonApp` where Django and other dependencies are installed.

**Solution:**
We created a workspace settings file at [`.vscode/settings.json`](file:///Users/alvin/Documents/MaisonApp/.vscode/settings.json) to set the default python interpreter path:
```json
{
  "python.defaultInterpreterPath": "${workspaceFolder}/.MaisonApp/bin/python"
}
```
If the IDE does not update automatically, manually run `Python: Select Interpreter` in the command palette (`Cmd + Shift + P`) and choose the path to `.MaisonApp/bin/python`.

---

### 2. Cannot find module `Backend.api.models`
**Question:**
> Explain what this problem is and help me fix it: Cannot find module `Backend.api.models`

**Answer:**
Since the IDE was still pointing to the global system interpreter (which lacked Django), the import `from django.db import models` in `models.py` failed. Consequently, relative imports of `models.py` inside `serializers.py` (like `from .models import Product`) also failed to resolve.

**Solution:**
We updated [`.vscode/settings.json`](file:///Users/alvin/Documents/MaisonApp/.vscode/settings.json) to include the `Backend` directory in Python extra analysis paths to prevent path resolution issues:
```json
{
  "python.defaultInterpreterPath": "${workspaceFolder}/.MaisonApp/bin/python",
  "python.analysis.extraPaths": [
    "./Backend"
  ]
}
```
And instructed the user to manually trigger the `Python: Select Interpreter` command to reload the environment.

---

### 3. Converting JS Object to JSON
**Question:**
> id: "p005", ... make this json format

**Answer / Solution:**
Converted the JavaScript object representation of the "Beeswax Candle Trio" product into a valid JSON block by quoting the keys, handling the null values, and wrapping them in curly braces `{}`.

---

### 4. Database Schema Design for Orders
**Question:**
> how should the order table looks like if this is the current frontend implementation? (referencing a sample order JSON)

**Answer:**
Proposed two database schema designs:
1. **Relational Schema (Recommended):** Splits orders into an `Order` model (metadata, shipping/payment details) and an `OrderItem` model (links quantity and price_at_purchase to the existing `Product` model via foreign keys).
2. **JSONField Schema:** A single `Order` model containing `products` and `payment_info` as native `JSONField` objects.

Saved full design details and code snippets to [`order_schema.md`](file:///Users/alvin/Documents/MaisonApp/order_schema.md).

---

### 5. Gitignore Setup
**Question:**
> create a gitignore

**Answer / Solution:**
Created a workspace-level [`.gitignore`](file:///Users/alvin/Documents/MaisonApp/.gitignore) file configured for a hybrid Django + JavaScript project, ignoring the `.MaisonApp` virtual environment, Python cache files (`__pycache__`), local databases (`*.sqlite3`), OS-specific files (`.DS_Store`), and editor configurations.

---

### 6. Logging Questions & Answers
**Question:**
> from now on, could you add all the question i ask to the Qna.md file

**Answer / Solution:**
Created the [`Qna.md`](file:///Users/alvin/Documents/MaisonApp/Qna.md) file to log all past and future questions and answers.

---

### 7. Relational Order Schema Implementation
**Question:**
> modify the models.py to include the option A of order_schema.md

**Answer / Solution:**
Modified [models.py](file:///Users/alvin/Documents/MaisonApp/Backend/api/models.py) to implement Option A (the Relational Schema design) from [order_schema.md](file:///Users/alvin/Documents/MaisonApp/order_schema.md), defining both `Order` and `OrderItem` models.

---

### 8. Difference Between RetrieveUpdateDestroyAPIView and ModelViewSet
**Question:**
> what is the difference between these 2 classes beside the object they are querying (referencing ProductDetails and OrderViewSet)

**Answer / Solution:**
Explained the differences in:
1. **HTTP Methods & Scope:** `RetrieveUpdateDestroyAPIView` handles only single-instance endpoints (GET detail, PUT, PATCH, DELETE). `ModelViewSet` handles both collection-level endpoints (GET list, POST create) and single-instance endpoints.
2. **Routing:** `RetrieveUpdateDestroyAPIView` is wired directly in `urls.py` using `.as_view()`, whereas `ModelViewSet` is typically registered with a DRF `Router` which dynamically generates both list and detail URLs.

---

### 9. Comparing ListCreateAPIView to Detail Views and ModelViewSets
**Question:**
> what about compared to this one? (referencing ProductListCreate)

**Answer / Solution:**
Explained that `ProductListCreate` (`ListCreateAPIView`) is complementary to `ProductDetails` (`RetrieveUpdateDestroyAPIView`). Together, they provide full CRUD across two separate views and two URL endpoints. In contrast, `ModelViewSet` combines both functionalities (list, create, retrieve, update, delete) into a single class.

---

### 10. Could not find name `viewsets` in views.py
**Question:**
> Explain what this problem is and help me fix it: Could not find name `viewsets` @[/Users/alvin/Documents/MaisonApp/Backend/api/views.py:L16]

**Answer / Solution:**
The name `viewsets` was being referenced to define `OrderViewSet(viewsets.ModelViewSet)` but was not imported. In addition, the `Order` model and `OrderSerializer` were also not imported.
We resolved this by:
1. Adding the missing imports in [views.py](file:///Users/alvin/Documents/MaisonApp/Backend/api/views.py):
   ```python
   from rest_framework import generics, viewsets
   from .models import Product, Order
   from .serializers import ProductSerializer, OrderSerializer
   ```
2. Defining `OrderSerializer` (and the nested `OrderItemSerializer`) inside [serializers.py](file:///Users/alvin/Documents/MaisonApp/Backend/api/serializers.py) to support nested serialization of order items.

---

### 11. Nested Serializers (`items = OrderItemSerializer(many=True)`)
**Question:**
> what does this do? (referencing line 15 in serializers.py)

**Answer / Solution:**
Explained that `items = OrderItemSerializer(many=True)` defines a nested relationship in Django REST Framework:
1. **Nested Serialization:** It forces the serializer to output full order item objects instead of just their ID keys.
2. **Reverse Relation Mapping:** It maps to the `related_name='items'` defined on the `OrderItem` ForeignKey relation to the `Order` model.
3. **Multiplicity (`many=True`):** It indicates that the `items` field is a collection (list) of multiple order items.
4. **Validation/Creation support:** It parses and validates nested arrays of order items in incoming JSON payloads.





