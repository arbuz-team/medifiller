from django.db import models


class Details_EN(models.Model):

    name = models.CharField(max_length=50)
    description = models.TextField()

    def __str__(self):
        return self.name

class Details_PL(models.Model):

    name = models.CharField(max_length=50)
    description = models.TextField()

    def __str__(self):
        return self.name

class Details_DE(models.Model):

    name = models.CharField(max_length=50)
    description = models.TextField()

    def __str__(self):
        return self.name



class Where_Display(models.Model):

    display_en = models.BooleanField()
    display_pl = models.BooleanField()
    display_de = models.BooleanField()

    def __str__(self):
        return 'en: {0}, pl: {1}, de: {2}'\
            .format(self.display_en, self.display_pl, self.display_de)



class Product(models.Model):

    details_en = models.ForeignKey(Details_EN)
    details_pl = models.ForeignKey(Details_PL)
    details_de = models.ForeignKey(Details_DE)
    where_display = models.ForeignKey(Where_Display)

    image = models.ImageField()
    price_eur = models.IntegerField()
    price_pln = models.IntegerField()

    def __str__(self):
        return self.details_en.name
