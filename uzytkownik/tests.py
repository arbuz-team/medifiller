from arbuz.tests import *
from .models import *
from .forms import *


Tester.Testowe_Podstrony_GET = \
[
    '/uzytkownik/logowanie/',
    '/uzytkownik/rejestracja/',
    '/uzytkownik/wyloguj/',
]

Tester.Testowe_Podstrony_POST = \
[
    Informacje_Post
    (
        '/uzytkownik/rejestracja/',
        {
            'login': 'endo93',
            'haslo': 'kaktus8',
            'powtorz_haslo': 'kaktus8',
        },
        'tu_rejestracja',
    ),

    Informacje_Post
    (
        '/uzytkownik/logowanie/',
        {
            'login': 'endo93',
            'haslo': 'kaktus8',
        },
        'tu_logowanie',
    ),
]


class Tester_Uzytkownik(Tester):

    def Testuj_Widoki(self):
        super().Testuj_Widoki()
        self.Usuwanie_Dodanych_Rekordow_BD()

    def Utworz_Modele(self):

        self.uzytkownik = \
            Uzytkownik(
                login='endo93',
                haslo=Uzytkownik.Szyfruj('kaktus8')
            )

        self.uzytkownik.full_clean()

    def Zarzadzaj_Modelami(self):

        self.assertEqual(str(self.uzytkownik),
                         self.uzytkownik.login)

        self.assertEqual(Uzytkownik.Szyfruj('kaktus8'),
                         self.uzytkownik.haslo)

    def Utworz_Formularze(self):

        self.formularz_logowania = \
            Formularz_Logowania\
            (
                data=
                {
                    'login': self.uzytkownik.login,
                    'haslo': self.uzytkownik.haslo,
                }
            )

        self.assertTrue(self.formularz_logowania.is_valid())

    @staticmethod
    def Usuwanie_Dodanych_Rekordow_BD():
        if Uzytkownik.objects.filter(login='endo93'):
            Uzytkownik.objects.get(login='endo93').delete()

    def Testuj(self):
        self.Testuj_Widoki()
        self.Testuj_Modele()
        self.Testuj_Formularze()


if __name__ == 'uzytkownik.tests':
    tester = Tester_Uzytkownik()
    tester.Start()
