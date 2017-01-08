from django.contrib.gis.geoip import GeoIP
from django.shortcuts import redirect


class Translator:

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

    def __init__(self, request):
        self.request = request
