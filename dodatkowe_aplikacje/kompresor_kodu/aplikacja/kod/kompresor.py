from .interfejs_firefox import *
from .kontroler_plikow import *
import requests



class Kompresor:

    def __Kompresuj_JS(self):
        self.interfejs_firefox.Wczytaj_Strone('https://jscompress.com/')
        self.interfejs_firefox.Wpisz_Kod_Do_Elementu('code', self.kod)
        self.interfejs_firefox.Wyslij_Formularz_Nazwa('copyPasteForm')
        return self.interfejs_firefox.Pobierz_Wynik_Kompresji_Klasa('output-code')

    def __Kompresuj_HTML(self):
        return True

    def __Kompresuj_CSS(self):
        url = 'https://cssminifier.com/raw'
        data = {'input': self.kod}
        response = requests.post(url, data=data)
        return response.text

    def Kompresuj(self, adres_pliku):

        self.adres_pliku = adres_pliku
        self.typ_pliku = adres_pliku.split('.')[-1]
        self.kod = Kontroler_Plikow.Pobierz_Zawartosc_Pliku(adres_pliku)

        switch = {
            'js':   self.__Kompresuj_JS,
            'html': self.__Kompresuj_HTML,
            'css':  self.__Kompresuj_CSS,
        }

        return switch[self.typ_pliku]() + ' '

    def __init__(self):
        self.interfejs_firefox = Interfejs_Firefox()
        self.adres_pliku = ''
        self.typ_pliku = ''
        self.kod = ''
