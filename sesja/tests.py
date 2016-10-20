from arbuz.tests import *


class Tester_Sesji(Tester):

    def Testuj_Sesje(self):
        pass

    def Testuj(self):
        odpowiedz = self.klient.get('/')
        self.failUnlessEqual(odpowiedz.status_code, 200)
        self.Testuj_Sesje()


if __name__ == 'sesja.tests':

    tester = Tester_Sesji()
    tester.Start()
