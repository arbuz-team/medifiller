from inspect import getmembers, ismethod
from translator.views import *


class Session_Controller:

    def Check_Session_Arbuz(self):

        if 'arbuz_navigation' not in self.request.session:
            self.request.session['arbuz_navigation'] = []

        if 'arbuz_url' not in self.request.session:
            self.request.session['arbuz_url'] = {}

    def Check_Session_User(self):

        if 'user_login' not in self.request.session:
            self.request.session['user_login'] = False

        if 'user_unique' not in self.request.session:
            self.request.session['user_unique'] = 0

        if 'user_username' not in self.request.session:
            self.request.session['user_username'] = ''

    def Check_Session_Root(self):

        if 'root_login' not in self.request.session:
            self.request.session['root_login'] = True

    def Check_Session_Translator(self):

        if 'translator_language' not in self.request.session:
            self.request.session['translator_language'] = 'EN'

        Translator.Check_Subdomain_Language(self.request)

    def Check_Session_Product(self):

        if 'product_new_details_en' not in self.request.session:
            self.request.session['product_new_details_en'] = None

        if 'product_new_details_pl' not in self.request.session:
            self.request.session['product_new_details_pl'] = None

        if 'product_new_details_de' not in self.request.session:
            self.request.session['product_new_details_de'] = None

        if 'product_where_display' not in self.request.session:
            self.request.session['product_where_display'] = None

        if 'product_new_brand' not in self.request.session:
            self.request.session['product_new_brand'] = None

        if 'product_new_purpose' not in self.request.session:
            self.request.session['product_new_purpose'] = None

    def Check_Session_Cart(self):

        if 'cart_products' not in self.request.session:
            self.request.session['cart_products'] = []

    def Check_Session_Searcher(self):

        self.request.session['searcher_filter_brand'] = []
        self.request.session['searcher_filter_purpose'] = []
        self.request.session['searcher_phrase'] = ''
        self.request.session['searcher_order_name'] = 'search_accuracy'
        self.request.session['searcher_order_direction'] = 'descending'

    def Check_Session(self):

        methods = getmembers(self, predicate=ismethod)
        methods = [method[0] for method in methods]

        for method in methods:
            if 'Check_Session_' in method:
                getattr(Session_Controller, method)(self)


    def __init__(self, request):
        self.request = request
        self.Check_Session()



def Check_Session(request):
    Session_Controller(request)