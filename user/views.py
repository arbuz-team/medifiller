from sender.views import *
from .forms import *
import os, binascii, string, random


class Login(Manage_Dynamic_Event):

    def Manage_Content(self):
        self.content['form'] = Form_Login()
        return self.Render_HTML('user/login.html', 'login')

    def Manage_Form_Login(self):

        self.content['form'] = \
            Form_Login(self.request.POST)

        if self.content['form'].is_valid():
            email = self.content['form'].cleaned_data['email']
            unique = User.objects.get(email=email).unique

            self.request.session['user_login'] = True
            self.request.session['user_unique'] = unique
            self.request.session['user_username'] = \
                User.objects.get(unique=unique).username

            self.content['form'] = None  # message of correct
            return self.Render_HTML('user/login.html')

        return self.Render_HTML('user/login.html', 'login')

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
        return self.Render_HTML('user/register.html', 'register')

    def Manage_Form_Register(self):

        self.content['form'] = Form_Register(self.request.POST)

        if self.content['form'].is_valid():
            user = self.content['form'].save(commit=False)
            user.unique = self.Generate_User_Unique()
            self.request.session['user_unique'] = user.unique
            user.save()

            self.Create_No_Approved_User()
            self.Send_Activate_Link()

            self.content['form'] = Form_User_Address()
            return self.Render_HTML('user/register.html', 'user_address')

        return self.Render_HTML('user/register.html', 'register')

    def Manage_Form_User_Address(self):

        self.content['form'] = Form_User_Address(self.request.POST)

        if self.content['form'].is_valid():
            unique = self.request.session['user_unique']
            address_user = self.content['form'].save(commit=False)
            address_user.user = User.objects.get(unique=unique)
            address_user.save()  # create address_user

            self.content['form'] = None  # message of correct
            return self.Render_HTML('user/register.html')

        return self.Render_HTML('user/register.html', 'user_address')

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
                user=User.objects.get(email=form.cleaned_data['email']),
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
    def Generate_User_Unique():

        unique = ''
        permitted_chars = string.ascii_letters + \
                          string.digits

        for char_number in range(0, 8):
            unique += random.choice(permitted_chars)

        if {'unique': unique} in User.objects.values('unique'):
            return Register.Generate_User_Unique()

        return unique

    @staticmethod
    def Launch(request):
        return Register(request).HTML



class Logout(Manage_Dynamic_Event):

    def Manage_Content(self):
        self.request.session['user_login'] = False
        self.request.session['user_unique'] = ''
        self.request.session['user_username'] = ''
        return self.Render_HTML('user/logout.html')

    @staticmethod
    def Launch(request):
        return Logout(request, authorization=True).HTML



class Account(Manage_Dynamic_Event):

    def Manage_Content(self):
        unique = self.request.session['user_unique']
        self.content['user'] = User.objects.get(unique=unique)
        return self.Render_HTML('user/account.html')

    def Manage_Form(self):

        pass

    @staticmethod
    def Launch(request):
        return Account(request, authorization=True).HTML



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