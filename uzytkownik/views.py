from arbuz.views import *
from .forms import *


class Logowanie(Dynamiczna_Obsluga_Zdarzen):

    def Zdarzenie_Esencja(self):
        self.kontent['formularz'] = Formularz_Logowania()
        return self.Renderuj_HTML('uzytkownik/logowanie.html')

    def Zdarzenie_Formularz(self):

        self.kontent['formularz'] = \
            Formularz_Logowania(self.request.POST)

        if self.kontent['formularz'].is_valid():
            self.request.session['uzytkownik_zalogowany'] = True
            self.request.session['tu_logowanie'] = True
            return redirect('/')

        return self.Zdarzenie_Esencja()

    @staticmethod
    def Uruchom(request):
        return Logowanie(request).HTML


class Rejestracja(Dynamiczna_Obsluga_Zdarzen):

    def Zdarzenie_Esencja(self):
        self.kontent['formularz'] = Formularz_Rejestracji()
        return self.Renderuj_HTML('uzytkownik/rejestracja.html')

    def Zdarzenie_Formularz(self):

        self.kontent['formularz'] = \
            Formularz_Rejestracji(self.request.POST)

        if self.kontent['formularz'].is_valid():
            self.request.session['tu_rejestracja'] = True

            self.kontent['formularz'].save()
            return redirect('/komunikat/')

        return self.Zdarzenie_Esencja()

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
        return redirect('/komunikat/')

    @staticmethod
    def Uruchom(request):
        return Wyloguj(request).HTML
