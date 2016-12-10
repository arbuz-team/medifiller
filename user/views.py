from sender.views import *
from .forms import *
import os, binascii


class Login(Manage_Dynamic_Event):

    def Manage_Content(self):
        self.content['form'] = Form_Login()
        return self.Render_HTML('user/login.html')

    def Manage_Form(self):

        self.content['form'] = \
            Form_Login(self.request.POST)

        if self.content['form'].is_valid():
            self.request.session['user_login'] = True

            self.content['form'] = None # message of correct
            return self.Render_HTML('user/login.html')

        return self.Render_HTML('user/login.html')

    @staticmethod
    def Launch(request):
        return Login(request).HTML



class Register(Manage_Dynamic_Event):

    def Manage_Content(self):
        self.content['form'] = Form_Register()
        return self.Render_HTML('user/register.html')

    def Manage_Form_Register(self):

        self.content['form'] = Form_Register(self.request.POST)

        if self.content['form'].is_valid():
            self.content['form'].save()  # create user

            self.Create_No_Approved_User()
            self.Send_Activate_Link()

            self.content['form'] = Form_User_Address()
            return self.Render_HTML('user/register.html')

        return self.Render_HTML('user/register.html')

    def Manage_Form_Address_User(self):

        self.content['form'] = Form_User_Address(self.request.POST)

        if self.content['form'].is_valid():
            self.content['form'].save()  # create address_user

            self.content['form'] = None  # message of correct
            return self.Render_HTML('user/register.html')

        return self.Render_HTML('user/register.html')

    def Manage_Form(self):

        if 'username' in self.request.POST: # __step_register__
            return self.Manage_Form_Register()

        if 'full_name' in self.request.POST: # __step_address_user__
            return self.Manage_Form_Address_User()

    def Create_No_Approved_User(self):
        self.content['key'] = binascii.hexlify(os.urandom(20))
        form = self.content['form']

        if self.content['key'] not in No_Approved_User.objects.all():
            No_Approved_User\
            (
                user=User.objects.get(username=form.cleaned_data['username']),
                approved_key=self.content['key']
            ).save()

        else: self.Create_No_Approved_User()

    def Send_Activate_Link(self):

        activate_key = self.content['key'].decode("utf-8")
        activate_url = self.request.build_absolute_uri().replace('register/', '')
        activate_url = '{0}approved/{1}'.format(activate_url, activate_key)

        title = 'Confirm your new account.'
        content = activate_url
        email = self.content['form'].cleaned_data['email']

        Sender.Send_Email(title, content, email)

    @staticmethod
    def Launch(request):
        return Register(request).HTML



class Logout(Manage_Dynamic_Event):

    def Manage_Content(self):
        self.request.session['user_login'] = False
        print('__content__' in self.request.POST)
        return self.Render_HTML('user/logout.html')

    @staticmethod
    def Launch(request):
        return Logout(request).HTML



class Approved_Register(Manage_Dynamic_Event):

    def Manage_Content(self):
        return self.Render_HTML('user/approved.html')

    @staticmethod
    def Update_User_Status(request, key):
        all_keys = No_Approved_User.objects.values('approved_key')

        if {'approved_key': key} in all_keys:
            record = No_Approved_User.objects.get(approved_key=key)
            record.user.approved = True
            record.user.save()
            record.delete()

        return Approved_Register.Launch(request)

    @staticmethod
    def Launch(request):
        return Approved_Register(request).HTML