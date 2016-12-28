from .models import *
from arbuz.settings import BASE_DIR
from django.contrib.gis.geoip import GeoIP
from django.shortcuts import redirect


class Translator:

    @staticmethod
    def Translate_EN(pk):
        return Language_EN.objects.get(id=pk).value

    @staticmethod
    def Translate_PL(pk):
        return Language_PL.objects.get(id=pk).value

    @staticmethod
    def Translate_DE(pk):
        return Language_DE.objects.get(id=pk).value

    def Translate(self, pk):

        if not Language_EN.objects.filter(id=pk):
            raise Exception('This value does not exist. '
                            '<translator.Translator.Translate>')

        method = 'Translate_' + self.request.session['translator_language']
        return getattr(Translator, method)(pk)

    @staticmethod
    def Load_Languages():

        # load EN language
        file = open(BASE_DIR + '/translator/language/EN', encoding='utf-8')
        lines = file.readlines()
        file.close()
        for line in lines:
            Language_EN(value=line).save()

        # load PL language
        file = open(BASE_DIR + '/translator/language/PL', encoding='utf-8')
        lines = file.readlines()
        file.close()
        for line in lines:
            Language_PL(value=line).save()

        # load DE language
        file = open(BASE_DIR + '/translator/language/DE', encoding='utf-8')
        lines = file.readlines()
        file.close()
        for line in lines:
            Language_DE(value=line).save()

    @staticmethod
    def Check_Subdomain_Language(request):

        url = request.get_host()
        subdomain = url.split('.')[0]

        if subdomain in ['pl', 'de']:
            request.session['translator_language'] = subdomain.upper()

    @staticmethod
    def Get_Language_Redirect(request):

        url = request.get_host()
        subdomain = url.split('.')[0]

        if subdomain not in ['pl', 'de']:
            client_ip = request.META.get('REMOTE_ADDR', None)

            geo = GeoIP()
            country = geo.country_code(client_ip)
            domain = request.get_host()

            if country == 'PL':
                return redirect('http://pl.{0}/'.format(domain))

            if country == 'DE':
                return redirect('http://de.{0}/'.format(domain))

        return None

    def __init__(self, request):
        self.request = request



def Text(request, pk):
    translator = Translator(request)
    return translator.Translate(pk)
