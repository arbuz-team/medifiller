from main.models import *

def Load_Default_Data():

    Text_Content(
        tab_name='contact_us',
        text='Kartka (także: karta, arkusz) – część książki, gazety, czasopisma, zeszytu lub notesu. Najczęściej jest biała i prostokątna. Może być wykonana z papieru, pergaminu, welinu albo papirusu.',
    ).save()

    Text_Content(
        tab_name='contact_us',
        text='<a href="/fgasgasg/">Błędny link</a> Jeśli jest czysta lub niezadrukowana to zwykle służy do pisania, rysowania lub drukowania.',
    ).save()

    Text_Content(
        tab_name='contact_us',
        text='Używana w wielu obszarach przemysłu, handlu, biurokracji, życia społecznego i codziennego ludzi, takich jak druk książek, czasopism i ulotek, prowadzenie korespondencji i dokonywania zapisków służbowych i prywatnych.',
    ).save()

    Text_Content(
        tab_name='contact_us',
        text='Kartka (a zwłaszcza strona) może stanowić jednostkę miary tekstu (np. ten rozdział ma/zawiera 20 kartek/stron maszynopisu). Należy jednak odróżniać strony od kartek (zwykle kartki mają dwie strony, zob. też model wstęgi Möbiusa).',
    ).save()

    Text_Content(
        tab_name='about_us',
        text='''<a href="/user/login/">/user/login/</a><br />
                <a href="/user/register/">/user/register/</a><br />
                <a href="/user/logout/">/user/logout/</a><br />
                <a href="/user/account/">/user/account/</a><br />
                <br />
                <a href="/root/create/">/root/create/</a><br />
                <a href="/root/login/">/root/login/</a><br />
                <a href="/root/logout/">/root/logout/</a><br />
                <br />
                <a href="/product/1/details/">/product/1/details/</a><br />
                <a href="/product/2/details/">/product/2/details/</a><br />
                <a href="/product/3/details/">/product/3/details/</a><br />
                <br />
                <a href="/setting/">/setting/</a><br />''',
    ).save()


    # Image_Content(
    #     tab_name='',
    #     image='',
    # )
