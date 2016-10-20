from inspect import *


'''
    Składnia zmiennych w sesji służących do sprawdzania
    ma składnie:

        ta_b

    gdzie:

        t - test,
        a - pierwsza litera aplikacji,
        b - nazwa klasy
'''


class Kontroler_Sesji:

    def Sprawdz_Sesje_Uzytkownik(self):

        if 'uzytkownik_zalogowany' not in self.request.session:
            self.request.session['uzytkownik_zalogowany'] = False

    def Sprawdz_Sesje_Uzytkownik_Test(self):

        if 'tu_logowanie' not in self.request.session:
            self.request.session['tu_logowanie'] = False

        if 'tu_rejestracja' not in self.request.session:
            self.request.session['tu_rejestracja'] = False

    def Sprawdz_Sesje(self):

        metody = getmembers(self, predicate=ismethod)
        metody = [metoda[0] for metoda in metody]

        for metoda in metody:
            if 'Sprawdz_Sesje_' in metoda:
                getattr(Kontroler_Sesji, metoda)(self)


    def __init__(self, request):
        self.request = request
        self.Sprawdz_Sesje()



def Sprawdz_Sesje(request):
    Kontroler_Sesji(request)