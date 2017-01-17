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
            reduce(operator.or_, (Q(brand__name__icontains=s) for s in self.phrase))                |
            reduce(operator.or_, (Q(purpose__name__icontains=s) for s in self.phrase))              |
            Q(where_display__display_en=True)
        )

    def Search_Products_PL(self):

        self.result = Product.objects.filter(
            reduce(operator.or_, (Q(details_pl__name__icontains=s) for s in self.phrase))           |
            reduce(operator.or_, (Q(details_pl__description__icontains=s) for s in self.phrase))    |
            reduce(operator.or_, (Q(brand__name__icontains=s) for s in self.phrase))                |
            reduce(operator.or_, (Q(purpose__name__icontains=s) for s in self.phrase))              |
            Q(where_display__display_pl=True)
        )

    def Search_Products_DE(self):

        self.result = Product.objects.filter(
            reduce(operator.or_, (Q(details_de__name__icontains=s) for s in self.phrase))           |
            reduce(operator.or_, (Q(details_de__description__icontains=s) for s in self.phrase))    |
            reduce(operator.or_, (Q(brand__name__icontains=s) for s in self.phrase))                |
            reduce(operator.or_, (Q(purpose__name__icontains=s) for s in self.phrase))              |
            Q(where_display__display_de=True)
        )

    def Search_Products(self):

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

        # convert product to string
        products_as_string = \
            [
                (
                    index,
                    (
                        product.details_en.name +
                        product.details_en.description +
                        get_name(product.details_pl) +
                        get_description(product.details_pl) +
                        get_name(product.details_de) +
                        get_description(product.details_de) +
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

        # sort positions by hits
        positions.sort(reverse=True)

        # create sorting list products
        result = []
        for position in positions:
            result.append(self.result[position[1]])

        return result

    def Sort_Result_Filters(self, result):

        brand = self.request.session['searcher_filter_brand']
        purpose = self.request.session['searcher_filter_purpose']

        if brand: # user chose filter
            for product in result:
                if product.brand.name not in brand:
                    result.remove(product)

        if purpose: # user chose filter
            for product in result:
                if product.purpose.name not in purpose:
                    result.remove(product)

        return result

    def Sort_Result(self):

        result = self.Sort_Result_Order_By_Hits()
        result = self.Sort_Result_Filters(result)

        return result

    def __init__(self, request, phrase):
        self.result = []
        self.request = request
        self.phrase = phrase.split(' ')



class Set_Filters:

    def Manage_Brand(self):
        filters = self.request.session['searcher_filter_brand']

        if self.request.POST['action'] == 'append':
            if self.request.POST['value'] not in filters:
                self.request.session['searcher_filter_brand']\
                    .append(self.request.POST['value'])

        if self.request.POST['action'] == 'delete':
            if self.request.POST['value'] in filters:
                self.request.session['searcher_filter_brand']\
                    .remove(self.request.POST['value'])

        return JsonResponse({'__filter__': 'true'})

    def Manage_Purpose(self):
        filters = self.request.session['searcher_filter_purpose']

        if self.request.POST['action'] == 'append':
            if self.request.POST['value'] not in filters:
                self.request.session['searcher_filter_purpose']\
                    .append(self.request.POST['value'])

        if self.request.POST['action'] == 'delete':
            if self.request.POST['value'] in filters:
                self.request.session['searcher_filter_purpose']\
                    .remove(self.request.POST['value'])

        return JsonResponse({'__filter__': 'true'})

    def Manage(self):

        if self.request.POST['__filter__'] == 'brand':
            return self.Manage_Brand()

        if self.request.POST['__filter__'] == 'purpose':
            return self.Manage_Purpose()

        return JsonResponse({'__filter__': 'false'})

    def __init__(self, request):
        self.request = request
        self.HTML = self.Manage()

    @staticmethod
    def Launch(request):
        return Set_Filters(request).HTML



class Set_Phrase:

    def Manage(self):
        self.request.session['searcher_phrase'] = \
            self.request.POST['phrase']

        return JsonResponse({'__phrase__': 'true'})

    def __init__(self, request):
        self.request = request
        self.HTML = self.Manage()

    @staticmethod
    def Launch(request):
        return Set_Phrase(request).HTML



def Filter_Products(request, phrase):

    if not phrase:
        return Product.objects.all()

    searcher = Search_Engine(request, phrase)
    return searcher.Search_Products()
