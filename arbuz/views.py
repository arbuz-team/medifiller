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
    def Zdarzenie_Problem():
        return redirect('/komunikat/zdarzenia_nok/')

    def Zdarzenie_Index(self):
        Sprawdz_Sesje(self.request)
        return render(self.request, 'index.html', {})

    def Zarzadzaj(self):

        if self.request.method == 'POST':

            if '__esencja__' in self.request.POST:
                return self.Zdarzenie_Esencja()

            if '__formularz__' in self.request.POST:
                return self.Zdarzenie_Formularz()

            if '__istnieje__' in self.request.POST:
                return self.Zdarzenie_Istnieje()

            return self.Zdarzenie_Problem()

        return self.Zdarzenie_Index()

    def __init__(self, request, automat=True):

        self.request = request
        self.kontent = {}

        if automat:
            self.HTML = self.Zarzadzaj()

    @staticmethod
    @abstractmethod
    def Uruchom(request):
        return Dynamiczna_Obsluga_Zdarzen(request)