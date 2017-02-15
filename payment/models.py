from django.db import models
from user.models import User
from product.models import Product


class Payment(models.Model):

    user = models.ForeignKey(User)
    total_price = models.CharField(max_length=10)
    currency = models.CharField(max_length=3)
    service = models.CharField(max_length=10)
    language = models.CharField(max_length=2)
    approved = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username

class Selected_Product(models.Model):

    payment = models.ForeignKey(Payment)
    product = models.ForeignKey(Product)
    number = models.IntegerField()

    def __str__(self):
        return self.product.details_en.name
