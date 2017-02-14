from product.views import *

def Load_Default_Filters():

    Brand(
        name='Excellent'
    ).save()

    Brand(
        name='Juvederm'
    ).save()

    Brand(
        name='Teosyal'
    ).save()

    Purpose(
        name='Cellulite'
    ).save()

    Purpose(
        name='Anti-aging'
    ).save()

    Purpose(
        name='Baldness'
    ).save()

def Load_Where_Display():

    for number in range(0, 8):

        en = False
        pl = False
        de = False

        if number >= 4:
            de = True
            number -= 4

        if number >= 2:
            pl = True
            number -= 2

        if number >= 1:
            en = True
            number -= 1

        Where_Display(
            display_en=en,
            display_pl=pl,
            display_de=de,
        ).save()

def Load_Default_Product():

    for numer in [1, 2, 3]:

        details_en = Details_EN(
            name='Product en ' + str(numer),
            description='He graduated from philology at the Jagiellonian University and journalism at Warsaw University, a Masters Degree, which znostryfikował the University of Vienna. He also completed a PhD in political science in the United States. Member of the Polish and Austrian PEN-Club (up to 2002 he was a member of the presidium, and then obtained a senator).'
        )
        details_en.save()

        details_pl = Details_PL(
            name='Produkt pl ' + str(numer),
            description='Ukończył filologię na Uniwersytecie Jagiellońskim oraz dziennikarstwo na Uniwersytecie Warszawskim uzyskując tytuł magistra, który to znostryfikował na Uniwersytecie Wiedeńskim. Ukończył również studia doktoranckie z politologii w USA. Członek polskiego oraz austriackiego PEN-Clubu (do 2002 pełnił funkcję członka prezydium, po czym uzyskał godność senatora). '
        )
        details_pl.save()

        details_de = Details_DE(
            name='Produkt de ' + str(numer),
            description='Er studierte an der Philologie an der Jagiellonen-Universität und Journalistik an der Universität Warschau, einen Master-Abschluss, der die Universität Wien znostryfikował. Außerdem absolvierte er einen Doktortitel in Politikwissenschaft in den Vereinigten Staaten. Mitglied der polnischen und österreichischen PEN-Club (bis 2002 war er Mitglied des Präsidiums, und dann einen Senator) erhalten haben.'
        )
        details_de.save()

        where_display = Where_Display.objects.get(display_en=True, display_pl=True, display_de=True)

        Product(
            details_en=Details_EN.objects.get(pk=details_en.pk),
            details_pl=Details_PL.objects.get(pk=details_pl.pk),
            details_de=Details_DE.objects.get(pk=details_de.pk),
            where_display=Where_Display.objects.get(pk=where_display.pk),

            image='/_static/img/product/{0}.jpeg'.format(numer),
            price_eur=100*numer,
            price_pln=400*numer,
            price_gbp=600*numer,
            price_usd=300*numer,
            stock=3,

            brand=Brand.objects.get(pk=numer),
            purpose=Purpose.objects.get(pk=numer),
        ).save()

def Load_Default_Data():
    Load_Default_Filters()
    Load_Where_Display()
    Load_Default_Product()