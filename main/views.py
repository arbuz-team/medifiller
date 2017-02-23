# -*- coding: utf-8 -*-
from product.views import *
from searcher.views import *
from .models import *


class Editable_Tab(Dynamic_Event_Menager, metaclass=ABCMeta):

    def Manage_Edit_Text(self):

        pk = self.request.POST['pk']
        value = self.request.POST['value']

        record = Text_Content.objects.get(pk=pk)
        record.text = value

    def Manage_Edit_Image(self):

        pk = self.request.POST['pk']
        value = self.request.POST['value']

        record = Image_Content.objects.get(pk=pk)
        record.image = value

    def Manage_Edit(self):

        self.only_root = True
        if not self.Check():
            return self.ERROR_HTML

        if 'text' in self.request.POST['__edit__']:
            self.Manage_Edit_Text()

        if 'text' in self.request.POST['__edit__']:
            self.Manage_Edit_Image()

        return super(Editable_Tab, self).Manage_Edit()



class Start(Dynamic_Event_Menager):

    def Manage_Content_Ground(self):
        self.content['recommended'] = Product.objects.filter(
            pk__in=Recommended_Product.objects.all().values('product__pk'))

        return self.Render_HTML('main/start.html')

    @staticmethod
    def Launch(request):
        return Start(request).HTML



class Products(Dynamic_Event_Menager):

    def Manage_Content_Ground(self):
        self.content['products'] = Filter_Products(
            self.request,
            self.request.session['searcher_phrase']
        )

        return self.Render_HTML('main/products.html')

    @staticmethod
    def Launch(request):
        return Products(request).HTML



class About(Editable_Tab):

    def Manage_Content_Ground(self):
        self.content['content'] = Content_Tab.objects.filter(tab_name='about')
        return self.Render_HTML('main/about.html')

    @staticmethod
    def Launch(request):
        return About(request).HTML



class Contact(Editable_Tab):

    def Manage_Content_Ground(self):
        self.content['content'] = Content_Tab.objects.filter(tab_name='contact')
        return self.Render_HTML('main/contact.html')

    @staticmethod
    def Launch(request):
        return Contact(request).HTML
