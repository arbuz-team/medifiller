from django.contrib.sites.models import Site

def Load_Default_Data():

    site = Site.objects.get(id=1)
    site.name = 'sungate.arbuz.team'
    site.domain = 'sungate.arbuz.team'
    site.save()
