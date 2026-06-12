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

---

### 12. What is a Serializer?
**Question:**
> explain to me what is serializer?

**Answer / Solution:**
Explained serialization in web development and DRF:
1. **Definition:** Serialization converts complex Python/Django object states (like database model records) into a standard transmission format (like JSON). Deserialization is the reverse.
2. **Key Roles:** Translates database representations to/from JSON, validates incoming request payloads, and handles data creation/updates.

---

### 13. Serializers vs. Database Relationship Definition
**Question:**
> this only tells the database the relation? (referencing line 15 in serializers.py)

**Answer / Solution:**
Clarified that `items = OrderItemSerializer(many=True)` does not define the database relation itself.
1. **Database / Model Layer:** The database relation is defined in [models.py](file:///Users/alvin/Documents/MaisonApp/Backend/api/models.py) using the `ForeignKey` relationship field.
2. **API / Serializer Layer:** The serializer field defines how that relationship is represented, structured, validated, and converted into/from JSON for API requests and responses.

---

### 14. Setting Up Routing for Order Endpoints
**Question:**
> what should i include in this file to hit the orders endpoints (referencing api/urls.py)

**Answer / Solution:**
Since the order views are ViewSets (`ModelViewSet`), they should be registered using Django REST Framework's `DefaultRouter`.
We modified [urls.py](file:///Users/alvin/Documents/MaisonApp/Backend/api/urls.py) to:
1. Import `include` and `DefaultRouter`.
2. Instantiate `DefaultRouter(trailing_slash=False)` to align with the frontend calls (which do not append trailing slashes to the `/api/orders` paths).
3. Register the `OrderViewSet` and `OrderItemViewSet` with the router and include the router URL patterns in `urlpatterns`.

---

### 15. Fetching Products from HttpService in ProductController
**Question:**
> change this to use get product form httpservice (referencing product.controller.js)

**Answer / Solution:**
Modified [product.controller.js](file:///Users/alvin/Documents/MaisonApp/controller/product.controller.js) to:
1. Inject `HttpService` dependency.
2. Call `HttpService.getProducts()` asynchronously to retrieve the product database array.
3. Find the current active product inside the async success callback.
4. Added robust size-parsing logic (`split(',')`) to convert `sizes` from a comma-separated database string into a JavaScript array if needed.

---

### 16. Connecting OrderService to Backend APIs
**Question:**
> change this use the get order HttpService (referencing order.service.js)

**Answer / Solution:**
Updated [order.service.js](file:///Users/alvin/Documents/MaisonApp/service/order.service.js) to perform all operations asynchronously via the backend's `HttpService` API wrappers:
1. **Dependency Injection:** Injected the `HttpService` dependency.
2. **Read orders:** Replaced standard synchronous localStorage read with asynchronous `HttpService.getOrders()` on initialization. To avoid breaking direct array bindings in AngularJS controllers, we updated the `orders` array reference in-place (`self.orders.length = 0; self.orders.push(...)`).
3. **Create orders:** Updated `createOrder()` to map/flatten the frontend structure (separating `paymentInfo` and cart items) to match the relational database schema expected by the Django backend, and send it to the backend via `HttpService.createOrder()`.
4. **Delete orders:** Updated `deleteOrder()` to make a delete request via `HttpService.deleteOrder()`.

---

### 17. Updating Orders via HttpService
**Question:**
> modify this to use the updateorder from HttpService (referencing line 69 in order.service.js)

**Answer / Solution:**
Modified the `updateOrder` method in [order.service.js](file:///Users/alvin/Documents/MaisonApp/service/order.service.js) to call `HttpService.updateOrder()`. Upon success, it updates the corresponding order object in-place inside the local `orders` array using the response data.

---

### 18. Seeding Products into the Backend Database
**Question:**
> inject this to the database (referencing PRODUCTS array in app.js)

**Answer / Solution:**
We injected the 12 products (p001 through p012) into the Django SQLite database:
1. Created a standalone Django scripting utility `populate_products.py` mapping frontend object arrays (like sizes) to schema-compatible comma-separated strings.
2. Ran `makemigrations` and `migrate` to set up and construct the relational order/orderitem tables.
3. Executed the script using the project's virtualenv interpreter: `/Users/alvin/Documents/MaisonApp/.MaisonApp/bin/python populate_products.py`.
4. Successfully populated the database and cleaned up the temporary utility script.

---

### 19. AngularJS `$injector:unpr` Error (Unknown Provider)
**Question:**
> angular.js:15697 Error: [$injector:unpr] http://errors.angularjs.org/1.8.2/$injector/unpr?p0=HttpServiceProvider%20%3C-%20HttpService%20%3C-%20HomeController ...

**Answer / Solution:**
The `$injector:unpr` error was caused by two issues:
1. **Lowercase Module Name Casing Typo:** Inside `service/http.service.js`, the module name was declared as lowercase `"maisonApp"`, but the actual application module defined in `app.js` is uppercase `"MaisonApp"`. Because of this casing mismatch, AngularJS could not find the `HttpService` provider.
2. **Missing Script Tag:** The file `service/http.service.js` was never imported/referenced in `index.html`.

We resolved this by:
1. Fixing the module name casing typo in [http.service.js](file:///Users/alvin/Documents/MaisonApp/service/http.service.js) to `"MaisonApp"`.
2. Adding the script tag `<script src="service/http.service.js"></script>` to [index.html](file:///Users/alvin/Documents/MaisonApp/index.html) before any controllers/services that depend on it.

---

### 20. Enabling CORS for local Live Server development
**Question:**
> set cors to allow http://127.0.0.1:5500/

**Answer / Solution:**
Configured the Django backend to allow Cross-Origin Resource Sharing (CORS) from the local Live Server frontend origin:
1. Installed `django-cors-headers` package in the local virtual environment.
2. Added `'corsheaders'` to `INSTALLED_APPS` and `'corsheaders.middleware.CorsMiddleware'` to `MIDDLEWARE` inside [settings.py](file:///Users/alvin/Documents/MaisonApp/Backend/Backend/settings.py).
3. Added `CORS_ALLOWED_ORIGINS` to allow requests from `http://127.0.0.1:5500` and `http://localhost:5500`.

---

### 21. Asynchronous Product Fetching in CatalogController
**Question:**
> correct this (referencing const storedProducts = HttpService.getProducts(); in catalog.controller.js)

**Answer / Solution:**
`HttpService.getProducts()` is an asynchronous function taking success and error callbacks rather than returning products synchronously.
We modified [catalog.controller.js](file:///Users/alvin/Documents/MaisonApp/controller/catalog.controller.js) to:
1. Call `HttpService.getProducts` asynchronously.
2. Move the `$scope.products` assignment and the dependent `$scope.categories` mapping logic inside the success callback.














