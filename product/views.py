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
    def Details(request, pk):
        return Product_Details(request, other_value={'pk': pk}).HTML

    @staticmethod
    def Launch(request):
        return Product_Details(request).HTML



class Product_Elements(Dynamic_Event_Menager):

    def Manage_Content_Ground(self):
        pass

    def Manage_Form_Where_Display(self):

        where_display = Form_Where_Display(self.request.POST)

        if where_display.is_valid():

            display_en = where_display.cleaned_data['display_en']
            display_pl = where_display.cleaned_data['display_pl']
            display_de = where_display.cleaned_data['display_de']

            where_display = Where_Display.objects.get(display_en=display_en,
                      display_pl=display_pl, display_de=display_de)

            self.request.session['product_where_display'] = where_display

            return Dialog_Prompt(self.request, response=True).HTML
        return Dialog_Prompt(self.request, not_valid=True).HTML

    def Manage_Form_Brand(self):
        brand = Form_Brand(self.request.POST)

        if brand.is_valid():
            brand = brand.Get_Brand()
            self.request.session['product_brand'] = brand

            return Dialog_Prompt(self.request, response=True).HTML
        return Dialog_Prompt(self.request, not_valid=True).HTML

    def Manage_Form_Purpose(self):
        purpose = Form_Purpose(self.request.POST)

        if purpose.is_valid():
            purpose = purpose.Get_Purpose()
            self.request.session['product_purpose'] = purpose

            return Dialog_Prompt(self.request, response=True).HTML
        return Dialog_Prompt(self.request, not_valid=True).HTML

    def Manage_Form_Image(self):
        image = Form_Image(self.request.POST)

        if image.is_valid():
            self.request.session['product_image_url'] = image.data['url']
            image_base64 = image.cleaned_data['image_base64']
            image_url = image.cleaned_data['url']

            if image_base64:
                self.request.session['product_image'] = image_base64

            if image_url:
                self.request.session['product_image'] = image_url

            return Dialog_Prompt(self.request, response=True).HTML
        return Dialog_Prompt(self.request, not_valid=True).HTML

    def Manage_Form_Details(self, language):

        if language == 'EN':
            details = Form_Details_EN(self.request.POST)

            if details.is_valid():
                details = details.save(commit=False)
                details.save()
                self.request.session['product_details_en'] = details
                return Dialog_Prompt(self.request, response=True).HTML

        if language == 'PL':
            details = Form_Details_PL(self.request.POST)

            if details.is_valid():
                details = details.save(commit=False)
                details.save()
                self.request.session['product_details_pl'] = details
                return Dialog_Prompt(self.request, response=True).HTML

        if language == 'DE':
            details = Form_Details_DE(self.request.POST)

            if details.is_valid():
                details = details.save(commit=False)
                details.save()
                self.request.session['product_details_de'] = details
                return Dialog_Prompt(self.request, response=True).HTML

        return Dialog_Prompt(self.request, not_valid=True).HTML

    def Manage_Form(self):

        if self.request.POST['__form__'] == 'where_display':
            return self.Manage_Form_Where_Display()

        if self.request.POST['__form__'] == 'brand':
            return self.Manage_Form_Brand()

        if self.request.POST['__form__'] == 'purpose':
            return self.Manage_Form_Purpose()

        if self.request.POST['__form__'] == 'image':
            return self.Manage_Form_Image()

        if 'details' in self.request.POST['__form__']:
            return self.Manage_Form_Details\
                    (self.request.POST['__form__'][-2:].upper())

        return super(Product_Elements, self).Manage_Form()

    @staticmethod
    def Launch(request):
        return New_Product(request, only_root=True).HTML



class New_Product(Product_Elements):

    def Manage_Content_Ground(self):
        self.content['form'] = Form_Product()
        return self.Render_HTML('product/new.html', 'product')

    def Manage_Form_New_Product(self):

        self.content['form'] = Form_Product(
            self.request, self.request.POST)

        if self.content['form'].is_valid():
            product = self.content['form'].save(commit=False)
            product.details_en = self.request.session['product_details_en']
            product.details_pl = self.request.session['product_details_pl']
            product.details_de = self.request.session['product_details_de']
            product.where_display = self.request.session['product_where_display']
            product.brand = self.request.session['product_brand']
            product.purpose = self.request.session['product_purpose']
            product.save()

            # save image to /_static/img/product/<id>.<format>
            product.Save_Image(self.request.session['product_image'])

            self.Manage_Clear_Session('product')
            self.content['form'] = None  # message of correct
            return self.Render_HTML('product/new.html')

        return self.Render_HTML('product/new.html', 'product')

    def Manage_Form(self):

        if self.request.POST['__form__'] == 'product':
            return self.Manage_Form_New_Product()

        return super(New_Product, self).Manage_Form()

    @staticmethod
    def Launch(request):
        return New_Product(request, only_root=True).HTML



class Edit_Product(Product_Elements):

    def Manage_Content_Ground(self):

        product = Product.objects.get(pk=self.other_value['pk'])
        self.request.session['product_details_en'] = product.details_en
        self.request.session['product_details_pl'] = product.details_pl
        self.request.session['product_details_de'] = product.details_de
        self.request.session['product_where_display'] = product.where_display
        self.request.session['product_brand'] = product.brand
        self.request.session['product_purpose'] = product.purpose
        self.request.session['product_image'] = product.image

        self.content['form'] = Form_Product(instance=product)
        return self.Render_HTML('product/edit.html', 'product')

    def Manage_Form_Edit_Product(self):

        self.content['form'] = Form_Product(
            self.request, self.request.POST)

        if self.content['form'].is_valid():
            product = Product.objects.get(pk=self.other_value['pk'])
            product.details_en = self.request.session['product_details_en']
            product.details_pl = self.request.session['product_details_pl']
            product.details_de = self.request.session['product_details_de']
            product.where_display = self.request.session['product_where_display']
            product.brand = self.request.session['product_brand']
            product.purpose = self.request.session['product_purpose']
            product.price_eur = self.content['form'].cleaned_data['price_eur']
            product.price_pln = self.content['form'].cleaned_data['price_pln']
            product.keywords = self.content['form'].cleaned_data['keywords']
            product.save()

            # save image to /_static/img/product/<id>.<format>
            product.Save_Image(self.request.session['product_image'])

            self.Manage_Clear_Session('product')
            self.content['form'] = None  # message of correct
            return self.Render_HTML('product/edit.html')

        return self.Render_HTML('product/edit.html', 'product')

    def Manage_Form(self):

        if self.request.POST['__form__'] == 'product':
            return self.Manage_Form_Edit_Product()

        return super(Edit_Product, self).Manage_Form()

    @staticmethod
    def Edit(request, pk):
        return Edit_Product(request, only_root=True, other_value={'pk': pk}).HTML



class Delete_Product(Dynamic_Event_Menager):

    def Manage_Content_Ground(self):
        pass

    def Manage_Button(self):
        product = Product.objects.get(pk=self.other_value['pk'])
        product.delete()
        return JsonResponse({'__button__': 'true'})

    @staticmethod
    def Delete(request, pk):
        return Delete_Product(request, only_root=True, other_value={'pk': pk}).HTML

    @staticmethod
    def Launch(request):
        pass



class Delete_Brand(Dynamic_Event_Menager):

    def Manage_Content_Ground(self):
        pass

    def Manage_Button(self):
        brand = Brand.objects.get(pk=self.other_value['pk'])
        brand.delete()
        return JsonResponse({'__button__': 'true'})

    @staticmethod
    def Delete(request, pk):
        return Delete_Brand(request, only_root=True, other_value={'pk': pk}).HTML

    @staticmethod
    def Launch(request):
        pass



class Delete_Purpose(Dynamic_Event_Menager):

    def Manage_Content_Ground(self):
        pass

    def Manage_Button(self):
        purpose = Purpose.objects.get(pk=self.other_value['pk'])
        purpose.delete()
        return JsonResponse({'__button__': 'true'})

    @staticmethod
    def Delete(request, pk):
        return Delete_Purpose(request, only_root=True, other_value={'pk': pk}).HTML

    @staticmethod
    def Launch(request):
        pass