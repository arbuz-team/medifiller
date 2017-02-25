from main.models import *

def Load_Default_About():

    Content_Tab(
        tab_name='about',
        header='',
        image='',
        paragraph='Day Spa Warszawa Sungate Beauty & SPA – jest takie magiczne miejsce… '
                 'miejsce w Warszawie, w którym doświadczycie Państwo wielu niezapomnianych '
                 'doznań w miłej atmosferze przepełnionej tradycyjną, polską gościnnością. '
                 'Proponujemy Wam wszechstronne terapie Spa & Wellness będące inspirującym, '
                 'wyrafinowanym połączeniem najcenniejszych skarbów natury ukrytych w morzu '
                 'i na lądzie z nowoczesnym luksusem w najlepszym wydaniu. Oferujemy również '
                 'szereg zabiegów z medycyny estetycznej, wykonywanych przez lekarzy, '
                 'które w szybki, bezpieczny i naturalny sposób podkreślą urodę, odmłodzą '
                 'całe ciało i przyniosą większą atrakcyjność sylwetki. <br><br>'
                 'Każdy, kto Nas odwiedzi, pozna nieodkryte dotąd przestrzenie odprężenia '
                 'i harmonii pozwalające odnaleźć w sobie naturalne pokłady niezbędnych do '
                 'osiągnięcia sukcesu sił witalnych. To magiczne miejsce w którym królują '
                 'relaks i odpoczynek to:',
    ).save()

    Content_Tab(
        tab_name='about',
        header='Sungate Beauty & Spa Warszawa',
        image='/_static/img/tabs/zabiegi.jpg',
        paragraph='Zarezerwuj już dziś czas na zabiegi medycyny estetycznej, które odmłodzą Cię , '
                 'uelastycznią i ujędrnią skórę twarzy i ciała a także wyeliminują niedoskonałości, '
                 'zmarszczki, bruzdy i cellulit, . Lekarz medycyny estetycznej podczas '
                 'konsultacji dobierze indywidualnie zabieg, produkt i terapię do Twojej '
                 'problemu. Pracujemy na markach: Stylage, Croma, Juvederm, Restylane, '
                 'Teosyal, Ellanse, Dermaheal, Botoks, Azzalure, Bocouture, Aqualyx, '
                 'Phosphatidylcholine, Regeneris. ',
    ).save()

    Content_Tab(
        tab_name='about',
        header='',
        image='',
        paragraph='''Oferujemy:<br>
                    WYPEŁNIANIE ZMARSZCZEK NA BAZIE PREPARATU NATURALNEGO<br>
                    POWIĘKSZENIE, MODELOWANIE I NAWILŻENIE UST<br>
                    NICI PDO, FIRST LIFT, SCREW, BARB 4D<br>
                    VOLUMETRIA TWARZY<br>
                    ODMŁODZENIE DŁONI – poprawa wyglądu<br>
                    BOTOKS, AZZALURE, BOCOUTURE – Korekcja zmarszczek mimicznych<br>
                    LECZENIE NADPOTLIOŚCI<br>
                    MEZOTERAPIA IGŁOWA<br>
                    BRUKSIZM<br>
                    REGENERIS– osocze bogatopłytkowe<br>
                    Już teraz możecie Państwo wykonać u nas w salonie makijaż permanentny
                    różnymi technikami. Zapraszamy do zapoznania się z ofertą.''',
    ).save()

    Content_Tab(
        tab_name='about',
        header='Poznaj bogactwo i moc luksusowych zabiegów na twarz i ciało oraz masaży Sungate Beauty & Spa Warszawa',
        image='/_static/img/tabs/salon.jpg',
        paragraph='Już teraz macie Państwo szansę doświadczyć rozkoszy niczym tej z pól Arkadyjskich. '
                 '<br><br> Nasza oferta skierowana specjalnie do Ciebie to wyrafinowane '
                 'połączenie bogactwa natury z luksusem codzienności, którego możesz doświadczyć '
                 'bez względu na to kim jesteś.',
    ).save()

    Content_Tab(
        tab_name='about',
        header='',
        image='',
        paragraph='''Odważ się podarować swojemu ciału „czarną perłę” wśród zabiegów kosmetycznych i skorzystaj z naszej oferty na: <br>
                    zabiegi pielęgnacyjne twarzy (nawilżenie, odżywienie, złuszczenie, oczyszczenie )<br>
                    zabiegi pielęgnacyjne ciała (peelingi, rytuały Spa & Wellness)<br>
                    masaże: masaż klasyczny, masaż relaksacyjny, masaż antycelulitowy, masaż odchudzający<br>
                    zabiegi dla Par w Vip Room.<br>
                    zabiegi dla Kobiet<br>
                    zabiegi dla Mężczyzn''',
    ).save()

    Content_Tab(
        tab_name='about',
        header='',
        image='',
        paragraph='Gwarantujemy, że Twoje ciało dzięki odpowiednio dobranym maskom oraz '
                 'na przykład zabiegom wspomagającym odchudzanie szybko odwdzięczy Ci się '
                 'za to niebywałą energią, chęcią do życia, do tworzenia czegoś nowego '
                 '– do rozwoju. Pamiętaj, to właśnie one są niezbędne w dążeniu ku sukcesom, '
                 'niezależnie od tego, czym się aktualnie zajmujesz. <br><br> Koniecznie '
                 'skorzystaj z naszej ekskluzywnej oferty na medycynę estetyczną, makijaż '
                 'permanentny, masaże i inne zabiegi w Warszawie już teraz, a osiągniesz '
                 'upragnione zwycięstwo szybciej niż się spodziewasz. Poznaj naszą ,,Ucztę Pięciu Zmysłów”',
    ).save()

def Load_Default_Contact():

    Content_Tab(
        tab_name='contact',
        header='Sungate Beauty & Spa',
        image='',
        paragraph='''Pl. Powstańców Warszawy 2<br>
                    00-030 Warszawa<br>
                    Tel.: +48 22 58 29 474<br>
                    Tel. kom.: +48 517 012 880<br>
                    E-mail: info@spasungate.pl''',
    ).save()

def Load_Default_Data():
    Load_Default_About()
    Load_Default_Contact()
