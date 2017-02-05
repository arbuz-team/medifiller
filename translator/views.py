from django.contrib.gis.geoip import GeoIP
from django.shortcuts import redirect
from arbuz.base import *
from .models import *


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

    @staticmethod
    def Translate(request, pk):

        if not Language_EN.objects.filter(id=pk):
            raise Exception('This value does not exist. '
                            '<translator.Translator.Translate>')

        method = 'Translate_' + request.session['translator_language']
        return getattr(Translator, method)(pk)

    @staticmethod
    def Load_Languages():

        # load EN language
        file = open(BASE_DIR + '/translator/language/EN')
        lines = file.readlines()
        file.close()
        for line in lines:
            Language_EN(value=line).save()

        # load PL language
        file = open(BASE_DIR + '/translator/language/PL')
        lines = file.readlines()
        file.close()
        for line in lines:
            Language_PL(value=line).save()

        # load DE language
        file = open(BASE_DIR + '/translator/language/DE')
        lines = file.readlines()
        file.close()
        for line in lines:
            Language_DE(value=line).save()

    @staticmethod
    def Check_Subdomain_Language(request):

        url = request.get_host()
        subdomain = url.split('.')[0]

        if subdomain in ['pl', 'de', 'en']:
            request.session['translator_language'] = subdomain.upper()

    @staticmethod
    def Get_Language_Redirect(request):

        url = request.get_host()
        subdomain = url.split('.')[0]

        if subdomain not in ['pl', 'de', 'en']:
            client_ip = request.META.get('REMOTE_ADDR', None)

            geo = GeoIP()
            country = geo.country_code(client_ip)
            dynamic_base = Dynamic_Base(request)

            if country == 'PL':
                return redirect(dynamic_base.Get_Urls(language='PL'))

            if country == 'DE':
                return redirect(dynamic_base.Get_Urls(language='DE'))

        return None


def Text(request, pk):
    return Translator.Translate(request, pk)