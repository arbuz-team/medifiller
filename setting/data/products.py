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

def Load_Default_Product():

    for numer in [1, 2, 3]:

        details_en_1 = Details_EN(
            name='Product en ' + str(numer),
            description='He graduated from philology at the Jagiellonian University and journalism at Warsaw University, a Masters Degree, which znostryfikował the University of Vienna. He also completed a PhD in political science in the United States. Member of the Polish and Austrian PEN-Club (up to 2002 he was a member of the presidium, and then obtained a senator).'
        )
        details_en_1.save()

        details_pl_1 = Details_PL(
            name='Produkt pl ' + str(numer),
            description='Ukończył filologię na Uniwersytecie Jagiellońskim oraz dziennikarstwo na Uniwersytecie Warszawskim uzyskując tytuł magistra, który to znostryfikował na Uniwersytecie Wiedeńskim. Ukończył również studia doktoranckie z politologii w USA. Członek polskiego oraz austriackiego PEN-Clubu (do 2002 pełnił funkcję członka prezydium, po czym uzyskał godność senatora). '
        )
        details_pl_1.save()

        details_de_1 = Details_DE(
            name='Produkt de ' + str(numer),
            description='Er studierte an der Philologie an der Jagiellonen-Universität und Journalistik an der Universität Warschau, einen Master-Abschluss, der die Universität Wien znostryfikował. Außerdem absolvierte er einen Doktortitel in Politikwissenschaft in den Vereinigten Staaten. Mitglied der polnischen und österreichischen PEN-Club (bis 2002 war er Mitglied des Präsidiums, und dann einen Senator) erhalten haben.'
        )
        details_de_1.save()

        where_display_1 = Where_Display(
            display_en=True,
            display_pl=True,
            display_de=True,
        )
        where_display_1.save()

        Product(
            details_en=Details_EN.objects.get(pk=details_en_1.pk),
            details_pl=Details_PL.objects.get(pk=details_pl_1.pk),
            details_de=Details_DE.objects.get(pk=details_de_1.pk),
            where_display=Where_Display.objects.get(pk=where_display_1.pk),

            image='/static/pluginy/arbuz/img/logo.png',
            price_eur=200*numer,
            price_pln=500*numer,

            brand=Brand.objects.get(pk=numer),
            purpose=Purpose.objects.get(pk=numer),
        ).save()

def Load_Default_Data():
    Load_Default_Filters()
    Load_Default_Product()