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
            reduce(operator.or_, (Q(purpose__name__icontains=s) for s in self.phrase))              |
            Q(where_display__display_en=True)
        )

    def Search_Products_PL(self):

        self.result = Product.objects.filter(
            reduce(operator.or_, (Q(details_pl__name__icontains=s) for s in self.phrase))           |
            reduce(operator.or_, (Q(details_pl__description__icontains=s) for s in self.phrase))    |
            reduce(operator.or_, (Q(keywords__icontains=s) for s in self.phrase))                   |
            reduce(operator.or_, (Q(brand__name__icontains=s) for s in self.phrase))                |
            reduce(operator.or_, (Q(purpose__name__icontains=s) for s in self.phrase))              |
            Q(where_display__display_pl=True)
        )

    def Search_Products_DE(self):

        self.result = Product.objects.filter(
            reduce(operator.or_, (Q(details_de__name__icontains=s) for s in self.phrase))           |
            reduce(operator.or_, (Q(details_de__description__icontains=s) for s in self.phrase))    |
            reduce(operator.or_, (Q(keywords__icontains=s) for s in self.phrase))                   |
            reduce(operator.or_, (Q(brand__name__icontains=s) for s in self.phrase))                |
            reduce(operator.or_, (Q(purpose__name__icontains=s) for s in self.phrase))              |
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

        return self.Sort_Result()

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

        if brand: # user chose filter
            for product in self.result:
                if product.brand.name not in brand:
                    self.result.remove(product)

        if purpose: # user chose filter
            for product in self.result:
                if product.purpose.name not in purpose:
                    self.result.remove(product)

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
        self.phrase = phrase.split(' ')



class Set_Filters:

    def Manage_Brand(self):
        filters = self.request.session['searcher_filter_brand']

        if self.request.POST['action'] == 'append':#
            if self.request.POST['name'] not in filters:
                self.request.session['searcher_filter_brand']\
                    .append(self.request.POST['name'])

        if self.request.POST['action'] == 'delete':
            if self.request.POST['name'] in filters:
                self.request.session['searcher_filter_brand']\
                    .remove(self.request.POST['name'])

        return JsonResponse({'__filter__': 'true'})

    def Manage_Purpose(self):
        filters = self.request.session['searcher_filter_purpose']

        if self.request.POST['action'] == 'append':
            if self.request.POST['name'] not in filters:
                self.request.session['searcher_filter_purpose']\
                    .append(self.request.POST['name'])

        if self.request.POST['action'] == 'delete':
            if self.request.POST['name'] in filters:
                self.request.session['searcher_filter_purpose']\
                    .remove(self.request.POST['name'])

        return JsonResponse({'__filter__': 'true'})

    def Manage_Phrase(self):
        self.request.session['searcher_phrase'] = \
            self.request.POST['value']

        return JsonResponse({'__filter__': 'true'})

    def Manage_Order(self):

        if 'name' in self.request.POST['__filter__']:
            self.request.session['searcher_order_name'] = \
                self.request.POST['value']

        if 'direction' in self.request.POST['__filter__']:
            self.request.session['searcher_order_direction'] = \
                self.request.POST['value']

        return JsonResponse({'__filter__': 'true'})

    def Manage(self):

        if self.request.POST['__filter__'] == 'brand':
            return self.Manage_Brand()

        if self.request.POST['__filter__'] == 'purpose':
            return self.Manage_Purpose()

        if self.request.POST['__filter__'] == 'phrase':
            return self.Manage_Phrase()

        if 'order' in self.request.POST['__filter__']:
            return self.Manage_Order()

        return JsonResponse({'__filter__': 'false'})

    def __init__(self, request):
        self.request = request
        self.HTML = self.Manage()

    @staticmethod
    def Launch(request):
        return Set_Filters(request).HTML



def Filter_Products(request, phrase):
    searcher = Search_Engine(request, phrase)
    return searcher.Search_Products()
