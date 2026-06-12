from django.db import models

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
