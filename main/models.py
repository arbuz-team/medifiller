from django.db import models


class Content_Tab(models.Model):

    tab_name = models.CharField(max_length=20)
    header = models.CharField(max_length=200)
    paragraph = models.TextField()
    image = models.ImageField()

    def __str__(self):
        return self.header
