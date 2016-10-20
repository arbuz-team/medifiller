from arbuz.tests import *


Tester.Testowe_Podstrony_GET = [
    '/',
    '/o_nas/',
    '/wizytowka/',
    '/kontakt/',
    '/edycja/'
]


class Tester_Stronki(Tester):

    def Testuj(self):
        self.Testuj_Widoki()


if __name__ == 'stronka.tests':

    tester = Tester_Stronki()
    tester.Start()
