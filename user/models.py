from django.db import models
from django.contrib.auth.hashers import make_password


class User(models.Model):

    username = models.CharField(max_length=50, primary_key=True)
    password = models.CharField(max_length=100)
    approved = models.BooleanField(default=False)

    @staticmethod
    def Encrypt(password):
        return make_password(password=password, salt='arbuz-team')

    def __str__(self):
        return self.username



class No_Approved_User(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    approved_key = models.CharField(max_length=20)

    def __str__(self):
        return self.user.username