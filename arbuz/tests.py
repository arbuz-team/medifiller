from django.test import TestCase
from django.test import Client
from abc import ABCMeta, abstractmethod


class Informacje_Post:

    def __init__(self, adres, dane, wynik_testu):
        self.adres = adres
        self.dane = dane
        self.wynik_testu = wynik_testu


class Tester_Widokow(TestCase):

    Testowe_Podstrony_GET = []
    Testowe_Podstrony_POST = []

    def Testuj_Widoki_GET(self):

        for strona in self.Testowe_Podstrony_GET:
            odpowiedz = self.klient.get(strona)

            if odpowiedz.status_code not in (200, 302):
                self.failUnlessEqual(odpowiedz.status_code, '200 or 302')

    def Testuj_Widoki_POST(self):

        for strona in self.Testowe_Podstrony_POST:
            odpowiedz = self.klient.post(strona.adres, strona.dane)

            if odpowiedz.status_code not in (200, 302):
                self.failUnlessEqual(odpowiedz.status_code, '200 or 302')

            self.assertTrue(self.klient.session[strona.wynik_testu])

    def Testuj_Widoki_Dynamiczne(self):

        for strona in self.Testowe_Podstrony_GET:
            odpowiedz = self.klient.post(strona, {'__arbuz__': 'True'})

            if odpowiedz.status_code not in (200, 302):
                self.failUnlessEqual(odpowiedz.status_code, '200 or 302')

    def Testuj_Widoki(self):
        self.Testuj_Widoki_GET()
        self.Testuj_Widoki_POST()
        self.Testuj_Widoki_Dynamiczne()

    def __init__(self):
        super().__init__()
        self.klient = Client()


class Tester_Modeli(TestCase):

    def Utworz_Modele(self):
        pass

    def Zarzadzaj_Modelami(self):
        pass

    def Testuj_Modele(self):
        self.Utworz_Modele()
        self.Zarzadzaj_Modelami()

    def __init__(self):
        super().__init__()


class Tester_Formularzy(TestCase):

    def Utworz_Formularze(self):
        pass

    def Zarzadzaj_Formularzami(self):
        pass

    def Testuj_Formularze(self):
        self.Utworz_Formularze()
        self.Zarzadzaj_Formularzami()

    def __init__(self):
        super().__init__()


class Tester(Tester_Widokow, Tester_Modeli,
             Tester_Formularzy, metaclass=ABCMeta):

    @abstractmethod
    def Testuj(self):
        pass

    def Start(self):
        self.Testuj()
