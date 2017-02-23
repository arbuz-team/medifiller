from django.db import models
from arbuz.settings import BASE_DIR
from user.models import User
import os


class Details(models.Model):

    name = models.CharField(max_length=50)
    description = models.TextField()

    class Meta:
        abstract = True

    def __str__(self):
        return self.name

class Details_EN(Details):
    pass

class Details_PL(Details):
    pass

class Details_DE(Details):
    pass



class Where_Display(models.Model):

    display_en = models.BooleanField()
    display_pl = models.BooleanField()
    display_de = models.BooleanField()

    def __str__(self):
        return 'en: {0}, pl: {1}, de: {2}'\
            .format(self.display_en, self.display_pl, self.display_de)



class Filter(models.Model):

    name = models.CharField(max_length=20)

    class Meta:
        abstract = True

    def __str__(self):
        return self.name

class Brand(Filter):
    pass

class Purpose(Filter):
    pass



class Product(models.Model):

    details_en = models.ForeignKey(Details_EN)
    details_pl = models.ForeignKey(Details_PL, null=True)
    details_de = models.ForeignKey(Details_DE, null=True)

    price_eur = models.IntegerField(blank=True)
    price_pln = models.IntegerField(blank=True)

    image = models.ImageField(blank=True)
    keywords = models.TextField(blank=True)
    stock = models.IntegerField(blank=True)

    where_display = models.ForeignKey(Where_Display)
    brand = models.ForeignKey(Brand)
    purpose = models.ForeignKey(Purpose)

    def Save_Image(self, name):

        if '/_static/img/product/' in str(name):
            return 

        image_format = os.path.splitext(name)[1]
        old_path = BASE_DIR + name
        new_path = '/_static/img/product/{0}{1}' \
            .format(self.pk, image_format)

        os.rename(old_path, BASE_DIR + new_path)
        self.image.name = new_path
        self.save()

    def __str__(self):
        return self.details_en.name



class Recommended_Product(models.Model):

    product = models.ForeignKey(Product)

    def __str__(self):
        return self.product.details_en.name



class Favorite_Product(models.Model):

    product = models.ForeignKey(Product)
    user = models.ForeignKey(User)

    def __str__(self):
        return self.product.details_en.name
