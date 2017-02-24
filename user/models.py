from django.db import models
import string, random


class User(models.Model):

    unique = models.CharField(max_length=8, primary_key=True)
    email = models.EmailField(max_length=50, unique=True)
    username = models.CharField(max_length=20)
    password = models.CharField(max_length=75)
    approved = models.BooleanField(default=False)

    @staticmethod
    def Generate_User_Unique():

        unique = ''
        permitted_chars = string.ascii_letters + \
                          string.digits

        for char_number in range(0, 8):
            unique += random.choice(permitted_chars)

        if {'unique': unique} in User.objects.values('unique'):
            return User.Generate_User_Unique()

        return unique

    def __str__(self):
        return self.username



class Abstract_Address(models.Model):

    full_name = models.CharField(max_length=50)
    doctor_number = models.CharField(max_length=7) # for polish users
    address_line_1 = models.CharField(max_length=50)
    address_line_2 = models.CharField(max_length=50, default='')
    city = models.CharField(max_length=50)
    region = models.CharField(max_length=50)  # state/province/region
    postcode = models.CharField(max_length=10)  # zip/postal code
    country = models.CharField(max_length=20)

    class Meta:
        abstract = True

    def __str__(self):
        return self.full_name



class User_Address(Abstract_Address):
    user = models.ForeignKey(User, on_delete=models.CASCADE)



class No_Approved_User(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    approved_key = models.CharField(max_length=20)

    def __str__(self):
        return self.user.username



class Forgot_Password_User(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    approved_key = models.CharField(max_length=20)

    def __str__(self):
        return self.user.username