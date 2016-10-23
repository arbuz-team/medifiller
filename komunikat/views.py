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
