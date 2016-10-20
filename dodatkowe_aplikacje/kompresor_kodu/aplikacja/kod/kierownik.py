import os
from .kompresor import *



class Kierownik:

    def __Kompresuj_Kod_JS(self):

        adresy_plikow = self.kontroler_plikow.\
            Pobierz_Adresy(Typ_Pliku.JS)

        os.system('rm ' + path.join(STATIC_DIR, 'js/js.js'))
        plik_zapis = open(path.join(
            STATIC_DIR, 'js/js.js'), 'w')

        for adres in adresy_plikow:
            plik_zapis.write(self.kompresor.
                 Kompresuj(path.join(STATIC_DIR, adres)))

    def __Kompresuj_Kod_CSS(self):

        adresy_plikow = self.kontroler_plikow.\
            Pobierz_Adresy(Typ_Pliku.CSS)

        os.system('rm ' + path.join(STATIC_DIR, 'css/css.css'))
        plik_zapis = open(path.join(
            STATIC_DIR, 'css/css.css'), 'w')

        for adres in adresy_plikow:
            plik_zapis.write(self.kompresor.
                 Kompresuj(path.join(STATIC_DIR, adres)))

    def __Kompresuj_Kod_HTML(self):
        pass

    def Kompresuj_Kod(self):
        self.__Kompresuj_Kod_JS()
        self.__Kompresuj_Kod_CSS()
        self.__Kompresuj_Kod_HTML()


    def __init__(self):
        self.kontroler_plikow = Kontroler_Plikow()
        self.kompresor = Kompresor()
