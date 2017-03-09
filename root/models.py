from arbuz.models import *


class Root(models.Model):

    password = models.CharField(max_length=75)

    def __str__(self):
        return 'Root'



class Social_Media(Abstract_Model):

    name = models.CharField(max_length=20)
    url = models.URLField()

    def __str__(self):
        return self.name
