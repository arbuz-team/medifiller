from arbuz.views import *
from product.models import *
from django.db.models import Q
from functools import reduce
import operator


class Search_Engine:

    def Search_Products_EN(self):

        self.result = Product.objects.filter(
            reduce(operator.or_, (Q(details_en__name__icontains=s) for s in self.phrase))           |
            reduce(operator.or_, (Q(details_en__description__icontains=s) for s in self.phrase))    |
            reduce(operator.or_, (Q(keywords__icontains=s) for s in self.phrase))                   |
            reduce(operator.or_, (Q(brand__name__icontains=s) for s in self.phrase))                |
            reduce(operator.or_, (Q(purpose__name__icontains=s) for s in self.phrase))              &
            Q(where_display__display_en=True)
        )

    def Search_Products_PL(self):

        self.result = Product.objects.filter(
            reduce(operator.or_, (Q(details_pl__name__icontains=s) for s in self.phrase))           |
            reduce(operator.or_, (Q(details_pl__description__icontains=s) for s in self.phrase))    |
            reduce(operator.or_, (Q(keywords__icontains=s) for s in self.phrase))                   |
            reduce(operator.or_, (Q(brand__name__icontains=s) for s in self.phrase))                |
            reduce(operator.or_, (Q(purpose__name__icontains=s) for s in self.phrase))              &
            Q(where_display__display_pl=True)
        )

    def Search_Products_DE(self):

        self.result = Product.objects.filter(
            reduce(operator.or_, (Q(details_de__name__icontains=s) for s in self.phrase))           |
            reduce(operator.or_, (Q(details_de__description__icontains=s) for s in self.phrase))    |
            reduce(operator.or_, (Q(keywords__icontains=s) for s in self.phrase))                   |
            reduce(operator.or_, (Q(brand__name__icontains=s) for s in self.phrase))                |
            reduce(operator.or_, (Q(purpose__name__icontains=s) for s in self.phrase))              &
            Q(where_display__display_de=True)
        )

    def Search_Products(self):

        if not self.phrase: # phrase is empty
            self.result = Product.objects.all()

        else:

            if self.request.session['translator_language'] == 'EN':
                self.Search_Products_EN()

            if self.request.session['translator_language'] == 'PL':
                self.Search_Products_PL()

            if self.request.session['translator_language'] == 'DE':
                self.Search_Products_DE()

        self.Sort_Result()
        return self.result

    def Sort_Result_Order_By_Hits(self):

        get_name = lambda details: details.name if details else ''
        get_description = lambda details: details.description if details else ''
        get_keywords = lambda keywords: keywords if keywords else ''

        # convert product to string
        products_as_string = \
        [
            (
                index, # repetitions set range
                (
                    product.details_en.name +
                    product.details_en.name +
                    product.details_en.name +
                    product.details_en.description +

                    get_name(product.details_pl) +
                    get_name(product.details_pl) +
                    get_name(product.details_pl) +
                    get_description(product.details_pl) +

                    get_name(product.details_de) +
                    get_name(product.details_de) +
                    get_name(product.details_de) +
                    get_description(product.details_de) +

                    get_keywords(product.keywords) +
                    get_keywords(product.keywords) +
                    get_keywords(product.keywords) +
                    get_keywords(product.keywords) +
                    get_keywords(product.keywords) +

                    product.brand.name +
                    product.purpose.name

                ).lower()
            )
            for index, product in enumerate(self.result)
        ]

        # tuple contains position of products
        positions = []
        for product in products_as_string:

            number_of_hits = 0
            for word in self.phrase:
                number_of_hits += product[1].count(word.lower())

            positions.append((number_of_hits, product[0]))  # (hits, id)

        self.Sort_Result_Apply(positions)

    def Sort_Result_Order_By_Price(self):

        # tuple contains position of products
        positions = \
        [
            (
                product.price_eur,
                index
            )
            for index, product in enumerate(self.result)
        ]  # (price, id)

        self.Sort_Result_Apply(positions)

    def Sort_Result_Order_By_Name(self):

        get_name = lambda product: product.details_pl.name \
            if self.request.session['translator_language'] == 'PL' else product.details_de.name \
            if self.request.session['translator_language'] == 'DE' else product.details_en.name

        # tuple contains position of products
        positions = \
        [
            (
                get_name(product),
                index
            )
            for index, product in enumerate(self.result)
        ]  # (name, id)

        self.Sort_Result_Apply(positions)

    def Sort_Result_Apply(self, positions):

        # sort positions by hits/price/name
        if self.request.session['searcher_order_direction'] == 'descending':
            positions.sort(reverse=True)

        else: positions.sort()

        # create sorting list products
        result = []
        for position in positions:
            result.append(self.result[position[1]])

        self.result = result

    def Sort_Result_Filters(self):

        brand = self.request.session['searcher_filter_brand']
        purpose = self.request.session['searcher_filter_purpose']
        result = self.result[:]

        if not brand and not purpose:
            return

        if brand: # user chose filter
            for product in self.result:
                if product.brand.name not in brand:
                    result.remove(product)

        self.result = result[:]
        if purpose: # user chose filter
            for product in self.result:
                if product.purpose.name not in purpose:
                    result.remove(product)

        self.result = result

    def Sort_Result(self):

        if self.request.session['searcher_order_name'] == 'search_accuracy':
            self.Sort_Result_Order_By_Hits()

        if self.request.session['searcher_order_name'] == 'price':
            self.Sort_Result_Order_By_Price()

        if self.request.session['searcher_order_name'] == 'name_of_product':
            self.Sort_Result_Order_By_Name()

        self.Sort_Result_Filters()

    def __init__(self, request, phrase):
        self.result = []
        self.request = request
        self.phrase = phrase

        if self.phrase:
            self.phrase = phrase.split(' ')



class Searcher(Dynamic_Event_Menager):

    def Manage_Content_Ground(self):
        pass

    def Manage_Content_Searcher(self):
        self.content['brands'] = Brand.objects.all()
        self.content['purposes'] = Purpose.objects.all()
        return self.Render_HTML('searcher/searcher.html')

    def Manage_Content(self):

        if self.request.POST['__content__'] == 'searcher':
            return self.Manage_Content_Searcher()

        return super(Searcher, self).Manage_Content()

    def Manage_Filter_Brand(self):
        filters = self.request.session['searcher_filter_brand']

        if self.request.POST['action'] == 'append':#
            if self.request.POST['name'] not in filters:
                filters.append(self.request.POST['name'])
                self.request.session['searcher_filter_brand'] = filters

        if self.request.POST['action'] == 'delete':
            if self.request.POST['name'] in filters:
                filters.remove(self.request.POST['name'])
                self.request.session['searcher_filter_brand'] = filters

        return JsonResponse({'__filter__': 'true'})

    def Manage_Filter_Purpose(self):
        filters = self.request.session['searcher_filter_purpose']

        if self.request.POST['action'] == 'append':
            if self.request.POST['name'] not in filters:
                filters.append(self.request.POST['name'])
                self.request.session['searcher_filter_purpose'] = filters

        if self.request.POST['action'] == 'delete':
            if self.request.POST['name'] in filters:
                filters.remove(self.request.POST['name'])
                self.request.session['searcher_filter_purpose'] = filters

        return JsonResponse({'__filter__': 'true'})

    def Manage_Filter_Phrase(self):
        self.request.session['searcher_phrase'] = \
            self.request.POST['value']

        return JsonResponse({'__filter__': 'true'})

    def Manage_Filter_Order(self):

        if 'name' in self.request.POST['__filter__']:
            self.request.session['searcher_order_name'] = \
                self.request.POST['value']

        if 'direction' in self.request.POST['__filter__']:
            self.request.session['searcher_order_direction'] = \
                self.request.POST['value']

        return JsonResponse({'__filter__': 'true'})

    def Manage_Filter(self):

        if self.request.POST['__filter__'] == 'brand':
            return self.Manage_Filter_Brand()

        if self.request.POST['__filter__'] == 'purpose':
            return self.Manage_Filter_Purpose()

        if self.request.POST['__filter__'] == 'phrase':
            return self.Manage_Filter_Phrase()

        if 'order' in self.request.POST['__filter__']:
            return self.Manage_Filter_Order()

        return JsonResponse({'__filter__': 'false'})

    def Manage(self):

        # filters
        if '__filter__' in self.request.POST:
            return self.Manage_Filter()

        return super(Searcher, self).Manage()

    @staticmethod
    def Launch(request):
        return Searcher(request, index_clear_session=True, clear_session=True).HTML



def Filter_Products(request, phrase):
    searcher = Search_Engine(request, phrase)
    return searcher.Search_Products()
