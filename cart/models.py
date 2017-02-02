from django.db import models
from user.models import User
from product.models import Product


class Cart(models.Model):

    user = models.ForeignKey(User)
    product = models.ForeignKey(Product)
    approved = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username
