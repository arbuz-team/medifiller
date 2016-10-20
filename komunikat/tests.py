from arbuz.tests import *


Tester.Testowe_Podstrony_GET = [
    '/komunikat/',
]


class Tester_Komunikat(Tester):

    def Testuj(self):
        self.Testuj_Widoki()


if __name__ == 'komunikat.tests':
    tester = Tester_Komunikat()
    tester.Start()
