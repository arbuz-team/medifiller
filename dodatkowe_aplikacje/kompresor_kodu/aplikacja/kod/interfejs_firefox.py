from os import path

KOMPRESOR_KODU = path.dirname(path.dirname(path.dirname(path.abspath(__file__))))
DODATKOWE_APLIKACJE_DIR = path.dirname(KOMPRESOR_KODU)
FIREFOX_DIR = path.join(DODATKOWE_APLIKACJE_DIR, 'firefox/firefox')
STATIC_DIR = path.join(path.dirname(DODATKOWE_APLIKACJE_DIR), 'static')

from selenium import webdriver
from selenium.webdriver.firefox.firefox_binary import FirefoxBinary
from selenium.common.exceptions import WebDriverException



class Interfejs_Firefox:

    def Wczytaj_Strone(self, url):

        try:
            self.__firefox.get(url)

        except WebDriverException:
            return False

        return True

    def Wpisz_Kod_Do_Elementu(self, nazwa_elementu, kod):
        element = self.__firefox.find_element_by_name(nazwa_elementu)
        element.send_keys(kod)

    def Wyslij_Formularz_Nazwa(self, nazwa_formularza):
        element = self.__firefox.find_element_by_name(nazwa_formularza)
        element.submit()

    def Wyslij_Formularz_ID(self, id_formularza):
        element = self.__firefox.find_element_by_id(id_formularza)
        element.submit()

    def Pobierz_Wynik_Kompresji_Klasa(self, klasa_elementu):
        element = self.__firefox.find_element_by_class_name(klasa_elementu)
        return element.get_attribute('value')

    def Pobierz_Wynik_Kompresji_Nazwa(self, nazwa_elementu):
        element = self.__firefox.find_element_by_name(nazwa_elementu)
        return element.get_attribute('value')


    def __init__(self):
        binary = FirefoxBinary(FIREFOX_DIR)
        self.__firefox = webdriver.Firefox(firefox_binary=binary)

    def __del__(self):
        self.__firefox.close()