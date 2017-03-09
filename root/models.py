from arbuz.models import *


class Root(Abstract_Model):

    password = models.CharField(max_length=75)

    def __str__(self):
        return 'Root'



class Social_Media(Abstract_Model):

    name = models.CharField(max_length=20)
    url = models.URLField()

    def __str__(self):
        return self.name



class Root_Address(Abstract_Address):

    telefon = models.CharField(max_length=20)
    email = models.EmailField(max_length=50)
