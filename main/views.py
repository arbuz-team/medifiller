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



class Contains_Start(Dynamic_Event_Menager):

    def Manage_Content_Ground(self):
        self.content['recommended'] = Product.objects.\
            filter(pk=Recommended_Product.objects.all())

        return self.Render_HTML('main/start.html')

    @staticmethod
    def Launch(request):
        return Contains_Start(request).HTML


class Contains_Products(Dynamic_Event_Menager):

    def Manage_Content_Ground(self):
        self.content['products'] = Filter_Products(
            self.request,
            self.request.session['searcher_phrase']
        )

        return self.Render_HTML('main/products.html')

    @staticmethod
    def Launch(request):
        return Contains_Products(request).HTML


class Contains_About(Editable_Tab):

    def Manage_Content_Ground(self):
        self.content['texts'] = Text_Content.objects.filter(tab_name='about')
        self.content['images'] = Image_Content.objects.filter(tab_name='about')
        return self.Render_HTML('main/about.html')

    @staticmethod
    def Launch(request):
        return Contains_About(request).HTML


class Contains_Contact(Editable_Tab):

    def Manage_Content_Ground(self):
        self.content['texts'] = Text_Content.objects.filter(tab_name='contact')
        self.content['images'] = Image_Content.objects.filter(tab_name='contact')
        return self.Render_HTML('main/contact.html')

    @staticmethod
    def Launch(request):
        return Contains_Contact(request).HTML


class Contains_Edit(Dynamic_Event_Menager):

    def Manage_Content_Ground(self):
        return self.Render_HTML('main/edit.html')

    @staticmethod
    def Launch(request):
        return Contains_Edit(request, autostart=True).HTML
