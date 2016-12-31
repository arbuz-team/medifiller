from arbuz.views import *
from translator.views import *
from user.forms import *
from django.contrib.sites.models import Site
import os


class Control_Panel(Dynamic_Event_Menager):

    def Manage_Content(self):
        return self.Render_HTML('setting/control_panel.html')

    @staticmethod
    def Reset_Databases(request):
        os.system(BASE_DIR + '/reset.sh')
        return Control_Panel.Launch(request)

    @staticmethod
    def Change_Default_Domain(request):
        site = Site.objects.get(id=1)
        site.name = 'sungate.arbuz.team'
        site.domain = 'sungate.arbuz.team'
        site.save()
        return Control_Panel.Launch(request)

    @staticmethod
    def Load_Defautl_Users(request):

        User\
        (
            unique=User.Generate_User_Unique(),
            email='93.endo@gmail.com',
            username='arbuz93',
            password=User.Encrypt('asdfasdf'),
            language='EN',
            approved=True
        ).save()

        User \
        (
            unique=User.Generate_User_Unique(),
            email='dominik.betka@gmail.com',
            username='Drego31',
            password=User.Encrypt('kaktus88'),
            language='EN',
            approved=True
        ).save()

        User_Address \
        (
            full_name='Filip Betka',
            address_line_1='Zamenhofa 3/54',
            city='Gdynia',
            region='Pomorskie',
            postcode='81-218',
            country='Polska',
            user=User.objects.get(email='93.endo@gmail.com')
        ).save()

        User_Address \
        (
            full_name='Dominik Betka',
            address_line_1='Zamenhofa 3/54',
            city='Gdynia',
            region='Pomorskie',
            postcode='81-218',
            country='Polska',
            user=User.objects.get(email='dominik.betka@gmail.com')
        ).save()

        return Control_Panel.Launch(request)

    @staticmethod
    def Load_Languages(request):
        Translator.Load_Languages()
        return Control_Panel.Launch(request)

    @staticmethod
    def Launch(request):
        return Control_Panel(request).HTML
