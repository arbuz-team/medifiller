from django.db import models


class Text_Content(models.Model):
    tab_name = models.CharField(max_length=20)
    text = models.TextField()

class Image_Content(models.Model):
    tab_name = models.CharField(max_length=20)
    image = models.ImageField()
