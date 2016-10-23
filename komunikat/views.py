from arbuz.views import *


class Komunikat(Dynamiczna_Obsluga_Zdarzen):

    def Zdarzenie_Esencja(self):
        self.kontent['komunikat'] = 'Obsługa komunikatów strony.'
        return self.Renderuj_HTML('komunikat/komunikat.html')

    @staticmethod
    def Uruchom(request):
        return Komunikat(request).HTML



class Komunikat_404(Dynamiczna_Obsluga_Zdarzen):

    def Zdarzenie_Esencja(self):
        self.kontent['komunikat'] = '404 - Nie znaleziono pliku.'
        return self.Renderuj_HTML('komunikat/komunikat.html')

    @staticmethod
    def Uruchom(request):
        return Komunikat_404(request).HTML



class Komunikat_Zdarzenia(Dynamiczna_Obsluga_Zdarzen):

    def Zdarzenie_Esencja(self):
        self.kontent['komunikat'] = 'Błąd zdarzeń dynamicznych.'
        return self.Renderuj_HTML('komunikat/komunikat.html')

    @staticmethod
    def Uruchom(request):
        return Komunikat_Zdarzenia(request).HTML



class Komunikat_Rejestracja(Dynamiczna_Obsluga_Zdarzen):

    def Zdarzenie_Esencja(self):
        return self.Renderuj_HTML('komunikat/komunikat.html')

    @staticmethod
    def Uruchom(request):
        pass

    @staticmethod
    def Uruchom_OK(request):
        komunikat = Komunikat_Rejestracja(request, False)
        komunikat.kontent['komunikat'] = 'Użytkownik został poprawnie zarejestrowany.'
        komunikat.Zdarzenie_Esencja()
        return komunikat.HTML

    @staticmethod
    def Uruchom_NOK(request):
        komunikat = Komunikat_Rejestracja(request, False)
        komunikat.kontent['komunikat'] = 'Wystąpił wyjątkowy błąd podczas rejestracji.'
        komunikat.Zdarzenie_Esencja()
        return komunikat.HTML



class Komunikat_Logowanie(Dynamiczna_Obsluga_Zdarzen):

    def Zdarzenie_Esencja(self):
        return self.Renderuj_HTML('komunikat/komunikat.html')

    @staticmethod
    def Uruchom(request):
        pass

    @staticmethod
    def Uruchom_OK(request):
        komunikat = Komunikat_Logowanie(request, False)
        komunikat.kontent['komunikat'] = 'Użytkownik został poprawnie zalogowany.'
        komunikat.Zdarzenie_Esencja()
        return komunikat.HTML

    @staticmethod
    def Uruchom_NOK(request):
        komunikat = Komunikat_Logowanie(request, False)
        komunikat.kontent['komunikat'] = 'Wystąpił wyjątkowy błąd podczas logowaniu.'
        komunikat.Zdarzenie_Esencja()
        return komunikat.HTML
