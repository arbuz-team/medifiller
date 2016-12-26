from inspect import getmembers, ismethod
from translator.views import *


class Session_Controller:

    def Check_Session_Arbuz(self):

        if 'arbuz_navigation' not in self.request.session:
            self.request.session['arbuz_navigation'] = []

    def Check_Session_User(self):

        if 'user_login' not in self.request.session:
            self.request.session['user_login'] = False

        if 'user_unique' not in self.request.session:
            self.request.session['user_unique'] = 0

        if 'user_username' not in self.request.session:
            self.request.session['user_username'] = ''

    def Check_Session_Root(self):

        if 'root_login' not in self.request.session:
            self.request.session['root_login'] = False

    def Check_Session_Translator(self):

        if 'translator_language' not in self.request.session:
            self.request.session['translator_language'] = 'EN'
            translator = Translator(self.request)
            translator.Check_Subdomain_Language()

    def Check_Session(self):

        methods = getmembers(self, predicate=ismethod)
        methods = [metoda[0] for metoda in methods]

        for method in methods:
            if 'Check_Session_' in method:
                getattr(Session_Controller, method)(self)


    def __init__(self, request):
        self.request = request
        self.Check_Session()



def Check_Session(request):
    Session_Controller(request)