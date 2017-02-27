from arbuz.views import *
from searcher.views import Search_Engine
from product.forms import *


class Start_App(Dynamic_Event_Menager):

    def Manage_Content_Ground(self):
        return self.Render_HTML('product/start.html')

    @staticmethod
    def Launch(request):
        return Start_App(request).HTML



class Product_Details(Dynamic_Event_Menager):

    def Manage_Content_Ground(self):
        product = Product.objects.get(pk=self.other_value)

        self.content['is_favorite'] = False
        self.content['is_recommended'] = False
        self.content['product'] = product

        if self.request.session['user_unique']:
            user = User.objects.get(unique=self.request.session['user_unique'])
            if Favorite_Product.objects.filter(product=product, user=user):
                self.content['is_favorite'] = True

        if Recommended_Product.objects.filter(product=product):
            self.content['is_recommended'] = True

        return self.Render_HTML('product/details.html')

    @staticmethod
    def Details(request, pk):
        return Product_Details(request, other_value=pk).HTML

    @staticmethod
    def Launch(request):
        return Product_Details(request).HTML



class Product_Elements(Dynamic_Event_Menager):

    def Manage_Content_Ground(self):
        pass

    def Manage_Form_Where_Display(self):

        where_display = Form_Where_Display(
            self.request, self.request.POST)

        if where_display.is_valid():

            display_en = where_display.cleaned_data['display_en']
            display_pl = where_display.cleaned_data['display_pl']
            display_de = where_display.cleaned_data['display_de']

            where_display = Where_Display.objects.get(display_en=display_en,
                      display_pl=display_pl, display_de=display_de)

            self.request.session['product_where_display'] = where_display

            return Dialog_Prompt(self.request, self.app_name, apply=True).HTML
        return Dialog_Prompt(self.request, self.app_name, not_valid=True).HTML

    def Manage_Form_Brand(self):
        brand = Form_Brand(self.request, self.request.POST)

        if brand.is_valid():
            brand = brand.Get_Filter()
            self.request.session['product_brand'] = brand

            return Dialog_Prompt(self.request, self.app_name, apply=True).HTML
        return Dialog_Prompt(self.request, self.app_name, not_valid=True).HTML

    def Manage_Form_Purpose(self):
        purpose = Form_Purpose(self.request, self.request.POST)

        if purpose.is_valid():
            purpose = purpose.Get_Filter()
            self.request.session['product_purpose'] = purpose

            return Dialog_Prompt(self.request, self.app_name, apply=True).HTML
        return Dialog_Prompt(self.request, self.app_name, not_valid=True).HTML

    def Manage_Form_Image(self):
        image = Form_Image(self.request, self.request.POST)

        if image.is_valid():
            self.request.session['product_image_url'] = image.cleaned_data['url']
            self.request.session['product_image'] = image.cleaned_data['image']

            return Dialog_Prompt(self.request, self.app_name, apply=True).HTML
        return Dialog_Prompt(self.request, self.app_name, not_valid=True).HTML

    def Manage_Form_Details(self, language):

        if language == 'EN':
            details = Form_Details_EN(
                self.request, self.request.POST)

            if details.is_valid():
                details = details.save(commit=False)
                details.save()
                self.request.session['product_details_en'] = details
                return Dialog_Prompt(self.request, self.app_name, apply=True).HTML

        if language == 'PL':
            details = Form_Details_PL(
                self.request, self.request.POST)

            if details.is_valid():
                details = details.save(commit=False)
                details.save()
                self.request.session['product_details_pl'] = details
                return Dialog_Prompt(self.request, self.app_name, apply=True).HTML

        if language == 'DE':
            details = Form_Details_DE(
                self.request, self.request.POST)

            if details.is_valid():
                details = details.save(commit=False)
                details.save()
                self.request.session['product_details_de'] = details
                return Dialog_Prompt(self.request, self.app_name, apply=True).HTML

        return Dialog_Prompt(self.request, self.app_name, not_valid=True).HTML

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

        return Dynamic_Event_Menager.Manage_Form(self)

    @staticmethod
    def Launch(request):
        return Product_Elements(request, only_root=True).HTML



class New_Product(Product_Elements):

    def Manage_Content_Ground(self):
        self.content['form'] = Form_Product(self.request)
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

        return Product_Elements.Manage_Form(self)

    def Manage_Get_Keywords(self):
        details_pl = self.request.session['product_details_pl']

        if details_pl:

            keywords = details_pl.keywords
            name = details_pl.name
            result = keywords

            for word in name:
                result += Search_Engine.\
                    Get_Polish_Word_Variations(word)

            return JsonResponse({'__get__': result})

        return JsonResponse({'__get__': ''})

    def Manage_Get(self):

        if self.request.POST['__get__'] == 'keywords':
            return self.Manage_Get_Keywords()

        return Dynamic_Event_Menager.Manage_Get(self)

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

        self.content['form'] = Form_Product(self.request, instance=product)
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

        return Product_Elements.Manage_Form(self)

    @staticmethod
    def Edit(request, pk):
        return Edit_Product(request, only_root=True, other_value={'pk': pk}).HTML



class Recommended_Product_Manager(Dynamic_Event_Menager):

    def Manage_Content_Ground(self):
        pass

    @staticmethod
    def Manage_Button_Append(product):
        if not Recommended_Product.objects.filter(product=product):
            Recommended_Product(product=product).save()

        return JsonResponse({'__button__': 'true'})

    @staticmethod
    def Manage_Button_Delete(product):
        if Recommended_Product.objects.filter(product=product):
            Recommended_Product.objects.get(product=product).delete()

        return JsonResponse({'__button__': 'true'})

    def Manage_Button(self):
        product = Product.objects.get(pk=self.request.POST['value'])

        if self.request.POST['__button__'] == 'append':
            return self.Manage_Button_Append(product)

        if self.request.POST['__button__'] == 'delete':
            return self.Manage_Button_Delete(product)

        return JsonResponse({'__button__': 'false'})

    @staticmethod
    def Launch(request):
        return Recommended_Product_Manager(request, only_root=True).HTML



class Favorite_Product_Manager(Dynamic_Event_Menager):

    def Manage_Content_Ground(self):
        pass

    @staticmethod
    def Manage_Button_Append(product, user):
        if not Favorite_Product.objects.filter(product=product, user=user):
            Favorite_Product(product=product, user=user).save()

        return JsonResponse({'__button__': 'true'})

    @staticmethod
    def Manage_Button_Delete(product, user):
        if Favorite_Product.objects.filter(product=product, user=user):
            Favorite_Product.objects.get(product=product, user=user).delete()

        return JsonResponse({'__button__': 'true'})

    def Manage_Button(self):
        product = Product.objects.get(pk=self.request.POST['value'])
        user = User.objects.get(unique=self.request.session['user_unique'])

        if self.request.POST['__button__'] == 'append':
            return self.Manage_Button_Append(product, user)

        if self.request.POST['__button__'] == 'delete':
            return self.Manage_Button_Delete(product, user)

        return JsonResponse({'__button__': 'false'})

    @staticmethod
    def Launch(request):
        return Favorite_Product_Manager(request, authorization=True).HTML



class Delete(Dynamic_Event_Menager):

    def Manage_Content_Ground(self):
        pass

    def Manage_Button(self):

        if self.other_value == 'product':
            Product.objects.get(pk=self.request.POST['value']).delete()

        if self.other_value == 'brand':
            Brand.objects.get(pk=self.request.POST['value']).delete()

        if self.other_value == 'purpose':
            Purpose.objects.get(pk=self.request.POST['value']).delete()

        return JsonResponse({'__button__': 'true'})

    @staticmethod
    def Product(request):
        return Delete(request, only_root=True,
                      other_value='product').HTML

    @staticmethod
    def Brand(request):
        return Delete(request, only_root=True,
                      other_value='brand').HTML

    @staticmethod
    def Purpose(request):
        return Delete(request, only_root=True,
                      other_value='purpose').HTML

    @staticmethod
    def Launch(request):
        pass
