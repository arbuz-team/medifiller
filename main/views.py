# -*- coding: utf-8 -*-
from sender.views import *
from searcher.views import *
from main.models import *
from main.forms import *


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

    def Create_Titles(self):

        self.content['form_detail'] = [
            {
                'title':    Text(self.request, 81),
                'hidden':   'url',
            },
            {
                'title':    Text(self.request, 82),
                'hidden':   'product',
            },
            {
                'title':    Text(self.request, 83),
                'hidden':   'url product',
            },
        ]

    def Manage_Content_Ground(self):
        self.content['content'] = Content_Tab.objects.filter(tab_name='contact')
        self.content['form'] = Form_Email_Contact(self.request)

        self.Create_Titles()
        return self.Render_HTML('main/contact.html', 'email_contact')

    def Manage_Form(self):

        self.Create_Titles()
        self.content['form'] = Form_Email_Contact(
            self.request, self.request.POST)

        if self.content['form'].is_valid():

            language = self.request.session['translator_language']
            title = self.content['form'].cleaned_data['title']
            email = self.content['form'].cleaned_data['email']

            content = {
                'client':   self.content['form'].cleaned_data['client'],
                'question': self.content['form'].cleaned_data['message'],
                'product':  self.content['form'].cleaned_data['product'],
                'url':      self.content['form'].cleaned_data['url'],
            }

            Sender(language).Send_Contact_Question(title, content, email)

            return self.Render_HTML('main/contact.html', 'email_contact')
        return self.Render_HTML('main/contact.html', 'email_contact')

    @staticmethod
    def Launch(request):
        return Contact(request).HTML
