from user.forms import *
from root.models import *

def Load_Social_Media():

    Social_Media(
        name='Facebook',
        url='',
    ).save()

    Social_Media(
        name='Google Plus',
        url='',
    ).save()

    Social_Media(
        name='Twitter',
        url='',
    ).save()

    Social_Media(
        name='Instagram',
        url='',
    ).save()

    Social_Media(
        name='Linkedin',
        url='',
    ).save()

    Social_Media(
        name='Tumblr',
        url='',
    ).save()

    Social_Media(
        name='YouTube',
        url='',
    ).save()

def Load_Default_Data():
    Load_Social_Media()

    Root_Address(
        full_name='',
        doctor_number='',
        address_line_1='Pl. Powstańców Warszawy 2',
        address_line_2='',
        city='Warszawa',
        region='Mazowieckie',
        postcode='00-030',
        country='Polska',
        telefon='+48 22 58 29 474',
        email='info@spasungate.pl'
    ).save()
