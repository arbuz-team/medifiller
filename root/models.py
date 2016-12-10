from django.db import models


class Root(models.Model):
    password = models.CharField(max_length=75)
