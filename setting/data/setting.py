from django.contrib.sites.models import Site
from translator.views import *

def Load_Translator_Database():
    Translator.Load_Languages()

def Load_Data_Of_Domain():
    site = Site.objects.get(id=1)
    site.name = 'sungate.arbuz.team'
    site.domain = 'sungate.arbuz.team'
    site.save()

def Load_Default_Data():
    Load_Translator_Database()
    Load_Data_Of_Domain()
