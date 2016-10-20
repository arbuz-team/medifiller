from django.test import TestCase
from ..kod.kierownik import *



class Tester(TestCase):

    def Wyswietl_Zmienne_Globalne(self):

        print('\n')
        print(KOMPRESOR_KODU)
        print(DODATKOWE_APLIKACJE_DIR)
        print(FIREFOX_DIR)
        print(STATIC_DIR)
        print('\n')

    def Testuj_Kontroler_Plikow(self):

        kontroler_plikow = Kontroler_Plikow()
        self.assertTrue(kontroler_plikow.Wczytaj_Adresy_Plikow())
        # self.assertTrue(kontroler_plikow.Pobierz_Adresy(Typ_Pliku.JS))
        self.assertTrue(kontroler_plikow.Pobierz_Zawartosc_Pliku(self.przykladowy_plik))

    def Testuj_Kompresor(self):

        kompresor = Kompresor()
        self.assertTrue(kompresor.Kompresuj(self.przykladowy_plik))

    def Testuj_Kierownik(self):
        kierownik = Kierownik()

    def Testuj(self):

        self.Wyswietl_Zmienne_Globalne()
        self.przykladowy_plik = 'aplikacja/tests/test.js'
        self.Testuj_Kontroler_Plikow()
        self.Testuj_Kompresor()


    def __init__(self):
        super().__init__()
        self.Testuj()
