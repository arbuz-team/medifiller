from arbuz.views import *
from .forms import *


class Start_App(Dynamic_Event_Menager):

    def Manage_Content_Ground(self):
        return self.Render_HTML('product/start.html')

    @staticmethod
    def Launch(request):
        return Start_App(request).HTML



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

    def Manage_Form_Where_Display(self):

        where_display = Form_Where_Display(self.request.POST)

        if where_display.is_valid():

            display_en = where_display.cleaned_data['display_en']
            display_pl = where_display.cleaned_data['display_pl']
            display_de = where_display.cleaned_data['display_de']

            where_display = Where_Display.objects.get(display_en=display_en,
                      display_pl=display_pl, display_de=display_de)

            self.content['form'] = None
            self.request.session['product_where_display'] = where_display
            return self.Render_HTML('dialog/prompt.html', 'where_display')

        self.content['form'] = None
        return self.Render_HTML('dialog/prompt.html', 'where_display')

    def Manage_Form_New_Brand(self):
        brand = Form_New_Brand(self.request.POST)

        if brand.is_valid():
            brand.save()
            self.request.session['product_new_brand'] = brand

            self.content['form'] = None  # message of correct
            return self.Render_HTML('dialog/prompt.html')

        self.content['form'] = brand
        return self.Render_HTML('dialog/prompt.html', 'new_brand')

    def Manage_Form_New_Purpose(self):
        purpose = Form_New_Purpose(self.request.POST)

        if purpose.is_valid():
            purpose.save()
            self.request.session['product_new_purpose'] = purpose

            self.content['form'] = None  # message of correct
            return self.Render_HTML('dialog/prompt.html')

        self.content['form'] = purpose
        return self.Render_HTML('dialog/prompt.html', 'new_purpose')

    def Manage_Form_New_Details(self, language):
        details = None

        if language == 'EN':
            details = Form_New_Details_EN(self.request.POST)

            if details.is_valid():
                details.save()
                self.request.session['product_new_details_en'] = details.pk
                self.content['form'] = None
                return self.Render_HTML('dialog/prompt.html')

        if language == 'PL':
            details = Form_New_Details_PL(self.request.POST)

            if details.is_valid():
                details.save()
                self.request.session['product_new_details_pl'] = details.pk
                self.content['form'] = None
                return self.Render_HTML('dialog/prompt.html')

        if language == 'DE':
            details = Form_New_Details_DE(self.request.POST)

            if details.is_valid():
                details.save()
                self.request.session['product_new_details_de'] = details.pk
                self.content['form'] = None
                return self.Render_HTML('dialog/prompt.html')

        self.content['form'] = details
        return self.Render_HTML('dialog/prompt.html', 'details')

    def Manage_Form(self):

        if self.request.POST['__form__'] == 'new_product':
            return self.Manage_Form_New_Product()

        if self.request.POST['__form__'] == 'where_display':
            return self.Manage_Form_Where_Display()

        if self.request.POST['__form__'] == 'new_brand':
            return self.Manage_Form_New_Brand()

        if self.request.POST['__form__'] == 'new_purpose':
            return self.Manage_Form_New_Purpose()

        if 'new_details' in self.request.POST['__form__']:
            return self.Manage_Form_New_Details\
                    (self.request.POST['__form__'][-2:].upper())

        return super(Insert_Product, self).Manage_Form()

    @staticmethod
    def Launch(request):
        return Insert_Product(request, only_root=True).HTML
