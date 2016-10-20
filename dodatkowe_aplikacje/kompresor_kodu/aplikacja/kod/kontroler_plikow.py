from enum import Enum



class Typ_Pliku(Enum):
    JS = 1
    CSS = 2
    HTML = 3



class Kontroler_Plikow:

    @staticmethod
    def Pobierz_Zawartosc_Pliku(adres_pliku):

        try:
            plik = open(adres_pliku, 'r')
            return plik.read()

        except FileNotFoundError:
            return False

    def __WAP_Otworz_Pliki(self):

        try:
            self.plik_css = open('aplikacja/adresy_plikow/css', 'r')
            self.plik_html = open('aplikacja/adresy_plikow/html', 'r')
            self.plik_js = open('aplikacja/adresy_plikow/js', 'r')

        except FileNotFoundError:
            return False

        return True

    def Wczytaj_Adresy_Plikow(self):

        if not self.__WAP_Otworz_Pliki():
            return False

        else:
            adresy_css = self.plik_css.read().splitlines()
            adresy_html = self.plik_html.read().splitlines()
            adresy_js = self.plik_js.read().splitlines()

            self.adresy = {
                Typ_Pliku.JS:   adresy_js,
                Typ_Pliku.HTML: adresy_html,
                Typ_Pliku.CSS:  adresy_css,
            }

            return True

    def Pobierz_Adresy(self, typ_pliku):

        if self.adresy:
            return self.adresy[typ_pliku]

        else:
            return False


    def __init__(self):
        self.adresy = {}
        self.Wczytaj_Adresy_Plikow()

    def __del__(self):
        self.plik_css.close()
        self.plik_html.close()
        self.plik_js.close()
