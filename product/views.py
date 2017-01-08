from arbuz.views import *
from .forms import *


class Product_Details(Dynamic_Event_Menager):

    def Manage_Content_Ground(self):
        self.content['product'] = \
            Product.objects.get(pk=self.other_value['pk'])

        return self.Render_HTML('product/details.html')

    @staticmethod
    def Product(request, pk):
        return Product_Details(request, other_value={'pk': pk}).HTML

    @staticmethod
    def Launch(request):
        return Product_Details(request).HTML



class Insert_Product(Dynamic_Event_Menager):

    def Manage_Content_Ground(self):
        self.content['form'] = Form_New_Product()
        return self.Render_HTML('product/new.html', 'new_product')

    def Manage_Form_New_Product(self):

        self.content['form'] = Form_New_Product(self.request.POST)

        if self.content['form'].is_valid():
            product = self.content['form'].save(commit=False)
            product.details_en = self.request.session['product_new_details_en']
            product.details_pl = self.request.session['product_new_details_pl']
            product.details_de = self.request.session['product_new_details_de']
            product.where_display = self.request.session['product_where_display']
            product.save()

            self.content['form'] = None  # message of correct
            return self.Render_HTML('product/new.html')

        return self.Render_HTML('product/new.html', 'new_product')

    def Manage_Form_New_Details_EN(self, language):

        if 'name' in self.request.POST:
            if 'description' in self.request.POST:

                nazwa = self.request.POST['name']
                description = self.request.POST['description']

                if language == 'EN':
                    details = Details_EN(nazwa=nazwa, description=description)
                    details.save()
                    self.request.session['product_new_details_en'] = details.pk

                if language == 'PL':
                    details = Details_PL(nazwa=nazwa, description=description)
                    details.save()
                    self.request.session['product_new_details_pl'] = details.pk

                if language == 'DE':
                    details = Details_DE(nazwa=nazwa, description=description)
                    details.save()
                    self.request.session['product_new_details_de'] = details.pk

                return JsonResponse({'__form__': 'true'})

        return JsonResponse({'__form__': 'false'})

    def Manage_Form_Where_Display(self):

        if 'display_en' in self.request.POST:
            if 'display_pl' in self.request.POST:
                if 'display_de' in self.request.POST:

                    display_en = 1 if self.request.POST['display_en'] == 'true' else 0
                    display_pl = 1 if self.request.POST['display_pl'] == 'true' else 0
                    display_de = 1 if self.request.POST['display_de'] == 'true' else 0

                    where_display = Where_Display.objects.get(display_en=display_en,
                              display_pl=display_pl, display_de=display_de)

                    self.request.session['product_where_display'] = where_display.pk
                    return JsonResponse({'__form__': 'true'})

        return JsonResponse({'__form__': 'false'})

    def Manage_Form(self):

        if self.request.POST['__form__'] == 'new_product':
            return self.Manage_Form_New_Product()

        if self.request.POST['__form__'] == 'where_display':
            return self.Manage_Form_Where_Display()

        if 'new_details' in self.request.POST['__form__']:
            return self.Manage_Form_New_Details_EN\
                    (self.request.POST['__form__'][-2:].upper())

        return super(Insert_Product, self).Manage_Form()

    @staticmethod
    def Launch(request):
        return Insert_Product(request, only_root=True).HTML
