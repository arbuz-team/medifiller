from django.db import models
from django.contrib.auth.hashers import make_password


class Uzytkownik(models.Model):

    login = models.CharField(max_length=50, primary_key=True)
    haslo = models.CharField(max_length=100)

    @staticmethod
    def Szyfruj(haslo):
        return make_password(password=haslo, salt='arbuz-team')

    def __str__(self):
        return self.login
