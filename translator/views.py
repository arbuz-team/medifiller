from django.contrib.gis.geoip import GeoIP
from django.shortcuts import redirect
from .models import *


class Translator:

    @staticmethod
    def __Translate_EN(pk):
        return Language_EN.objects.get(id=pk).value

    @staticmethod
    def __Translate_PL(pk):
        return Language_PL.objects.get(id=pk).value

    @staticmethod
    def __Translate_DE(pk):
        return Language_DE.objects.get(id=pk).value

    @staticmethod
    def Translate(request, pk):

        if not Language_EN.objects.filter(id=pk):
            raise Exception('This value does not exist. '
                            '<translator.Translator.Translate>')

        method = '__Translate_' + request.session['translator_language']
        return getattr(Translator, method)(pk)

    @staticmethod
    def Load_Languages():

        # load EN language
        file = open('translator/language/EN')
        lines = file.readlines()
        file.close()
        for line in lines:
            Language_EN(value=line).save()

        # load PL language
        file = open('translator/language/PL')
        lines = file.readlines()
        file.close()
        for line in lines:
            Language_PL(value=line).save()

        # load DE language
        file = open('translator/language/DE')
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
            domain = request.get_host()

            if country == 'PL':
                return redirect('http://pl.{0}/'.format(domain))

            if country == 'DE':
                return redirect('http://de.{0}/'.format(domain))

        return None


def Text(request, pk):
    return Translator.Translate(request, pk)