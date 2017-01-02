from product.views import *
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
    def Load_Default_Users(request):

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
    def Load_Default_Products(request):

        for numer in ['1', '2', '3']:

            details_en_1 = Details_EN\
            (
                name='Product en ' + numer,
                description='He graduated from philology at the Jagiellonian University and journalism at Warsaw University, a Masters Degree, which znostryfikował the University of Vienna. He also completed a PhD in political science in the United States. Member of the Polish and Austrian PEN-Club (up to 2002 he was a member of the presidium, and then obtained a senator).'
            )
            details_en_1.save()

            details_pl_1 = Details_PL\
            (
                name='Produkt pl ' + numer,
                description='Ukończył filologię na Uniwersytecie Jagiellońskim oraz dziennikarstwo na Uniwersytecie Warszawskim uzyskując tytuł magistra, który to znostryfikował na Uniwersytecie Wiedeńskim. Ukończył również studia doktoranckie z politologii w USA. Członek polskiego oraz austriackiego PEN-Clubu (do 2002 pełnił funkcję członka prezydium, po czym uzyskał godność senatora). '
            )
            details_pl_1.save()

            details_de_1 = Details_DE\
            (
                name='Produkt de ' + numer,
                description='Er studierte an der Philologie an der Jagiellonen-Universität und Journalistik an der Universität Warschau, einen Master-Abschluss, der die Universität Wien znostryfikował. Außerdem absolvierte er einen Doktortitel in Politikwissenschaft in den Vereinigten Staaten. Mitglied der polnischen und österreichischen PEN-Club (bis 2002 war er Mitglied des Präsidiums, und dann einen Senator) erhalten haben.'
            )
            details_de_1.save()

            where_display_1 = Where_Display\
            (
                display_en=True,
                display_pl=True,
                display_de=True
            )
            where_display_1.save()

            Product\
            (
                details_en=Details_EN.objects.get(pk=details_en_1.pk),
                details_pl=Details_PL.objects.get(pk=details_pl_1.pk),
                details_de=Details_DE.objects.get(pk=details_de_1.pk),
                where_display=Where_Display.objects.get(pk=where_display_1.pk),

                image='/static/pluginy/arbuz/img/logo.png',
                price_eur=500,
                price_pln=2000
            ).save()

        return Control_Panel.Launch(request)

    @staticmethod
    def Launch(request):
        return Control_Panel(request).HTML
