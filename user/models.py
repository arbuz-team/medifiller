from django.db import models
from django.contrib.auth.hashers import make_password


class User(models.Model):

    username = models.CharField(max_length=50, primary_key=True)
    password = models.CharField(max_length=100)

    @staticmethod
    def Encrypt(password):
        return make_password(password=password, salt='arbuz-team')

    def __str__(self):
        return self.username
