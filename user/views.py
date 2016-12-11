from sender.views import *
from .forms import *
import os, binascii


class Login(Manage_Dynamic_Event):

    def Manage_Content(self):
        self.content['form'] = Form_Login()
        self.content['form_name'] = 'login'
        return self.Render_HTML('user/login.html')

    def Manage_Form_Login(self):

        self.content['form'] = \
            Form_Login(self.request.POST)

        if self.content['form'].is_valid():
            email = self.content['form'].cleaned_data['email']

            self.request.session['user_login'] = True
            self.request.session['user_email'] = email
            self.request.session['user_username'] = \
                User.objects.get(email=email).username

            self.content['form'] = None  # message of correct
            return self.Render_HTML('user/login.html')

        return self.Render_HTML('user/login.html')

    def Manage_Form(self):

        if self.request.POST['__form__'] == 'login':
            return self.Manage_Form_Login()

        return super(Login, self).Manage_Form()

    @staticmethod
    def Launch(request):
        return Login(request).HTML



class Register(Manage_Dynamic_Event):

    def Manage_Content(self):
        self.content['form'] = Form_Register()
        self.content['form_name'] = 'register'
        return self.Render_HTML('user/register.html')

    def Manage_Form_Register(self):

        self.content['form'] = Form_Register(self.request.POST)

        if self.content['form'].is_valid():
            self.content['form'].save()  # create user

            self.Create_No_Approved_User()
            self.Send_Activate_Link()

            self.content['form'] = Form_User_Address()
            self.content['form_name'] = 'user_address'
            return self.Render_HTML('user/register.html')

        return self.Render_HTML('user/register.html')

    def Manage_Form_User_Address(self):

        self.content['form'] = Form_User_Address(self.request.POST)

        if self.content['form'].is_valid():
            self.content['form'].save()  # create address_user

            self.content['form'] = None  # message of correct
            return self.Render_HTML('user/register.html')

        return self.Render_HTML('user/register.html')

    def Manage_Form(self):

        if self.request.POST['__form__'] == 'register':
            return self.Manage_Form_Register()

        if self.request.POST['__form__'] == 'user_address':
            return self.Manage_Form_User_Address()

        return super(Register, self).Manage_Form()

    def Manage_Exist(self):

        if self.request.POST['__exist__'] == 'email':
            if User.objects.filter(email=self.request.POST['value']):
                return JsonResponse({'__exist__': 'true'})

        return JsonResponse({'__exist__': 'false'})

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
        self.request.session['user_id'] = 0
        self.request.session['user_name'] = ''
        return self.Render_HTML('user/logout.html')

    @staticmethod
    def Launch(request):
        return Logout(request).HTML



class Account(Manage_Dynamic_Event):

    def Manage_Content(self):
        return self.Render_HTML('user/account.html')

    def Manage_Form(self):

        pass

    @staticmethod
    def Launch(request):
        return Account(request).HTML



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