from django.db import models


class Produkt(models.Model):

    nazwa = models.CharField(max_length=150)
    opis = models.TextField()
    cena = models.IntegerField()
    zdjecie = models.ImageField(null=True, blank=True)
