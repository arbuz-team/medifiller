# -*- coding: utf-8 -*-
from arbuz.views import *
from produkt.forms import *


class Wyswietl_Start(Dynamiczna_Obsluga_Zdarzen):

    def Zdarzenie_Esencja(self):
        self.kontent['polecane'] = Polecany.objects.all()
        return self.Renderuj_HTML('stronka/start.html')

    @staticmethod
    def Uruchom(request):
        return Wyswietl_Start(request).HTML


class Wyswietl_Products(Dynamiczna_Obsluga_Zdarzen):

    def Zdarzenie_Esencja(self):
        return self.Renderuj_HTML('stronka/products.html')

    @staticmethod
    def Uruchom(request):
        return Wyswietl_Products(request).HTML


class Wyswietl_About_Us(Dynamiczna_Obsluga_Zdarzen):

    def Zdarzenie_Esencja(self):
        return self.Renderuj_HTML('stronka/about_us.html')

    @staticmethod
    def Uruchom(request):
        return Wyswietl_About_Us(request).HTML


class Wyswietl_Contact_Us(Dynamiczna_Obsluga_Zdarzen):

    def Zdarzenie_Esencja(self):
        return self.Renderuj_HTML('stronka/contact_us.html')

    @staticmethod
    def Uruchom(request):
        return Wyswietl_Contact_Us(request).HTML


class Wyswietl_Edycja(Dynamiczna_Obsluga_Zdarzen):

    def Zdarzenie_Esencja(self):
        return self.Renderuj_HTML('stronka/edycja.html')

    @staticmethod
    def Uruchom(request):
        return Wyswietl_Edycja(request, wymagaj_logowania=True).HTML
