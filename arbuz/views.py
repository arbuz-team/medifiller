from django.shortcuts import render, redirect
from abc import ABCMeta, abstractmethod
from sesja.views import *


class Dynamiczna_Obsluga_Zdarzen(metaclass=ABCMeta):

    def Renderuj_HTML(self, szablon_html):
        return render(self.request, szablon_html, self.kontent)

    @abstractmethod
    def Zdarzenie_Dynamiczne(self):
        pass

    def Zdarzenie_POST(self):
        pass

    def Zdarzenie_Index(self):
        Sprawdz_Sesje(self.request)
        return render(self.request, 'index.html', {})

    def Zarzadzaj(self):

        if self.request.method == 'POST':

            if '__arbuz__' in self.request.POST:
                return self.Zdarzenie_Dynamiczne()

            else:
                return self.Zdarzenie_POST()

        return self.Zdarzenie_Index()

    def __init__(self, request):
        self.request = request
        self.kontent = {}
        self.HTML = self.Zarzadzaj()

    @staticmethod
    @abstractmethod
    def Uruchom(request):
        return Dynamiczna_Obsluga_Zdarzen(request)