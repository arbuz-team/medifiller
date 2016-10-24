from django.db import models


class Produkt(models.Model):

    nazwa = models.CharField(max_length=150)
    opis = models.TextField()
    cena = models.IntegerField()
    zdjecie = models.ImageField(null=True, blank=True)

    def __str__(self):
        return self.nazwa


class Polecany(models.Model):

    produkt = models.ForeignKey(Produkt, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.produkt)
