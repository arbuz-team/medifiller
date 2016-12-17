from django.db import models


class Details(models.Model):

    name = models.CharField(max_length=50)
    description = models.TextField()



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



class Product(models.Model):

    details_en = models.ForeignKey(Details_EN)
    details_pl = models.ForeignKey(Details_PL)
    details_de = models.ForeignKey(Details_DE)
    where_display = models.ForeignKey(Where_Display)

    image = models.ImageField()
    price_eur = models.IntegerField()
    price_pln = models.IntegerField()
