from user.forms import *

def Load_Default_Data():

    User(
        unique=User.Generate_User_Unique(),
        email='93.endo@gmail.com',
        username='arbuz93',
        password=User.Encrypt('asdfasdf'),
        approved=True
    ).save()

    User(
        unique=User.Generate_User_Unique(),
        email='dominik.betka@gmail.com',
        username='Drego31',
        password=User.Encrypt('kaktus88'),
        approved=True
    ).save()

    User_Address(
        full_name='Filip Betka',
        address_line_1='Zamenhofa 3/54',
        city='Gdynia',
        region='Pomorskie',
        postcode='81-218',
        country='Polska',
        user=User.objects.get(email='93.endo@gmail.com')
    ).save()

    User_Address(
        full_name='Dominik Betka',
        address_line_1='Zamenhofa 3/54',
        city='Gdynia',
        region='Pomorskie',
        postcode='81-218',
        country='Polska',
        user=User.objects.get(email='dominik.betka@gmail.com')
    ).save()
