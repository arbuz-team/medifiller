from django.db import models
from django.contrib.auth.hashers import make_password


class User(models.Model):

    unique = models.CharField(max_length=8, primary_key=True)
    email = models.EmailField(max_length=50, unique=True)
    username = models.CharField(max_length=20)
    password = models.CharField(max_length=75)
    approved = models.BooleanField(default=False)

    @staticmethod
    def Encrypt(password):
        return make_password(password=password, salt='arbuz-team')

    def __str__(self):
        return self.username



class User_Address(models.Model):

    full_name = models.CharField(max_length=50)
    address_line_1 = models.CharField(max_length=50)
    address_line_2 = models.CharField(max_length=50, default='')
    city = models.CharField(max_length=50)
    region = models.CharField(max_length=50)  # state/province/region
    postcode = models.CharField(max_length=10)  # zip/postal code
    country = models.CharField(max_length=20)

    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.full_name



class No_Approved_User(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    approved_key = models.CharField(max_length=20)

    def __str__(self):
        return self.user.username