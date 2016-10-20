from arbuz.tests import *
from .models import *


Tester.widoki_testowe_get = \
[
]

Tester.widoki_testowe_post = \
[
]


class Tester_Meta_Tag(Tester):

    def Testuj(self):
        self.Testuj_Widoki()
        self.Testuj_Modele()
        self.Testuj_Formularze()


if __name__ == 'meta_tag.tests':
    tester = Tester_Meta_Tag()
    tester.Start()
