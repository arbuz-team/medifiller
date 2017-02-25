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

    def Create_Contact_Forms(self, post=None):

        product_availability = Form_Email_Contact(self.request, post)
        product_availability.Convert_To_Product_Availability()

        comments_on_website = Form_Email_Contact(self.request, post)
        comments_on_website.Convert_To_Comments_On_Website()

        other_message = Form_Email_Contact(self.request, post)
        other_message.Convert_To_Other_Message()

        self.content['titles'] = {
            'product_availability': Text(self.request, 81),
            'comments_on_website': Text(self.request, 82),
            'other_message': Text(self.request, 83),
        }

        self.content['forms'] = {
            'product_availability': product_availability,
            'comments_on_website': comments_on_website,
            'other_message': other_message,
        }

    def Manage_Content_Ground(self):
        self.content['content'] = Content_Tab.objects.filter(tab_name='contact')
        self.Create_Contact_Forms()
        return self.Render_HTML('main/contact.html')

    def Manage_Form(self):

        self.Create_Contact_Forms(self.request.POST)
        form_name = self.request.POST['__form__']
        email_contact = self.content['forms'][form_name]

        if email_contact.is_valid():

            language = self.request.session['translator_language']
            title = self.content['titles'][form_name]
            email = email_contact.cleaned_data['email']

            content = {
                'client':   email_contact.cleaned_data['client'],
                'question': email_contact.cleaned_data['message'],
                'product':  email_contact.cleaned_data['product'],
                'url':      email_contact.cleaned_data['url'],
            }

            Sender(language).Send_Contact_Question(title, content, email)

            return self.Render_HTML('main/contact.html')
        return self.Render_HTML('main/contact.html')

    @staticmethod
    def Launch(request):
        return Contact(request).HTML
