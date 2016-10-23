from arbuz.views import *
from .forms import *


class Logowanie(Dynamiczna_Obsluga_Zdarzen):

    def Zdarzenie_Esencja(self):
        self.kontent['formularz'] = Formularz_Logowania()
        return self.Renderuj_HTML('uzytkownik/logowanie.html')

    def Zdarzenie_Formularz(self):

        informacja_zwrotna = {}
        self.kontent['formularz'] = \
            Formularz_Logowania(self.request.POST)

        if self.kontent['formularz'].is_valid():
            self.request.session['uzytkownik_zalogowany'] = True
            informacja_zwrotna['__formularz__'] = 'true'
            informacja_zwrotna['__url__'] = '/komunikat/logowanie_ok/'
            return JsonResponse(informacja_zwrotna)

        informacja_zwrotna['__formularz__'] = 'false'
        informacja_zwrotna['__url__'] = '/komunikat/logowanie_nok/'
        return JsonResponse(informacja_zwrotna)

    @staticmethod
    def Uruchom(request):
        return Logowanie(request).HTML


class Rejestracja(Dynamiczna_Obsluga_Zdarzen):

    def Zdarzenie_Esencja(self):
        self.kontent['formularz'] = Formularz_Rejestracji()
        return self.Renderuj_HTML('uzytkownik/rejestracja.html')

    def Zdarzenie_Formularz(self):

        informacja_zwrotna = {}
        self.kontent['formularz'] = \
            Formularz_Rejestracji(self.request.POST)

        if self.kontent['formularz'].is_valid():
            self.kontent['formularz'].save()
            informacja_zwrotna['__formularz__'] = 'true'
            informacja_zwrotna['__url__'] = '/komunikat/rejestracja_ok/'
            return JsonResponse(informacja_zwrotna)

        informacja_zwrotna['__formularz__'] = 'false'
        informacja_zwrotna['__url__'] = '/komunikat/rejestracja_nok/'
        return JsonResponse(informacja_zwrotna)

    def Zdarzenie_Istnieje(self):

        if 'login' in self.request.POST:
            if Uzytkownik.objects.filter(login=self.request.POST['login']):
                return JsonResponse({'__istnieje__': 'true'})

        return JsonResponse({'__istnieje__': 'false'})

    @staticmethod
    def Uruchom(request):
        return Rejestracja(request).HTML


class Wyloguj(Dynamiczna_Obsluga_Zdarzen):

    def Zdarzenie_Esencja(self):
        self.request.session['uzytkownik_zalogowany'] = False
        return self.Renderuj_HTML('uzytkownik/wyloguj.html')

    @staticmethod
    def Uruchom(request):
        return Wyloguj(request).HTML
