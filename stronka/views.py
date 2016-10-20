# -*- coding: utf-8 -*-
from arbuz.views import *


class Wyswietl_Start(Dynamiczna_Obsluga_Zdarzen):

    def Zdarzenie_Dynamiczne(self):
        return self.Renderuj_HTML('stronka/start.html')

    @staticmethod
    def Uruchom(request):
        return Wyswietl_Start(request).HTML


class Wyswietl_O_Nas(Dynamiczna_Obsluga_Zdarzen):

    def Zdarzenie_Dynamiczne(self):
        return self.Renderuj_HTML('stronka/o_nas.html')

    @staticmethod
    def Uruchom(request):
        return Wyswietl_O_Nas(request).HTML


class Wyswietl_Wizytowka(Dynamiczna_Obsluga_Zdarzen):

    def Zdarzenie_Dynamiczne(self):
        return self.Renderuj_HTML('stronka/wizytowka.html')

    @staticmethod
    def Uruchom(request):
        return Wyswietl_Wizytowka(request).HTML


class Wyswietl_Kontakt(Dynamiczna_Obsluga_Zdarzen):

    def Zdarzenie_Dynamiczne(self):
        return self.Renderuj_HTML('stronka/kontakt.html')

    @staticmethod
    def Uruchom(request):
        return Wyswietl_Kontakt(request).HTML


class Wyswietl_Edycja(Dynamiczna_Obsluga_Zdarzen):

    def Zdarzenie_Dynamiczne(self):
        return self.Renderuj_HTML('stronka/edycja.html')

    @staticmethod
    def Uruchom(request):
        return Wyswietl_Edycja(request).HTML
