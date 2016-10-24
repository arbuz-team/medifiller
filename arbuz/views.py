from django.shortcuts import render, redirect
from django.http import JsonResponse
from abc import ABCMeta, abstractmethod
from sesja.views import *


class Dynamiczna_Obsluga_Zdarzen(metaclass=ABCMeta):

    def Renderuj_HTML(self, szablon_html):
        return render(self.request, szablon_html, self.kontent)

    @abstractmethod
    def Zdarzenie_Esencja(self):
        pass

    def Zdarzenie_Formularz(self):
        pass

    def Zdarzenie_Istnieje(self):
        pass

    @staticmethod
    def Zdarzenie_Brak_Instrukcji():
        komunikat = 'POST - brak zmiennej określającej instrukcję.'
        return JsonResponse({'__problem__': komunikat})

    @staticmethod
    def Zdarzenie_Nieuprawniony():
        komunikat = 'Próba nieautoryzowanego dostępu.'
        return JsonResponse({'__problem__': komunikat})

    def Zdarzenie_Index(self):
        Sprawdz_Sesje(self.request)
        return render(self.request, 'index.html', {})

    def Sprawdz_Czy_Zalogowany(self):
        if self.wymagaj_logowania:
            if self.request.session['uzytkownik_zalogowany']:
                return True

        else: return True
        return False

    def Zarzadzaj(self):

        if self.request.method == 'POST':
            if self.Sprawdz_Czy_Zalogowany():

                if '__esencja__' in self.request.POST:
                    return self.Zdarzenie_Esencja()

                if '__formularz__' in self.request.POST:
                    return self.Zdarzenie_Formularz()

                if '__istnieje__' in self.request.POST:
                    return self.Zdarzenie_Istnieje()

                return self.Zdarzenie_Brak_Instrukcji()
            return self.Zdarzenie_Nieuprawniony()

        if self.request.method == 'GET':
            return self.Zdarzenie_Index()

    def __init__(self, request,
                 automatyczne_uruchamianie=True,
                 wymagaj_logowania=False):

        self.request = request
        self.wymagaj_logowania = wymagaj_logowania
        self.kontent = {}

        if automatyczne_uruchamianie:
            self.HTML = self.Zarzadzaj()

    @staticmethod
    @abstractmethod
    def Uruchom(request):
        return Dynamiczna_Obsluga_Zdarzen(request)