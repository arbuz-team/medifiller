from sender.views import *
from .forms import *
import os, binascii


class Login(Manage_Dynamic_Event):

    def Manage_Content(self):
        self.content['form'] = Form_Login()
        return self.Render_HTML('user/login.html')

    def Manage_Form(self):

        return_value = {}
        self.content['form'] = \
            Form_Login(self.request.POST)

        if self.content['form'].is_valid():
            self.request.session['user_login'] = True
            return_value['__form__'] = 'true'
            return_value['__url__'] = '/statement/login_ok/'
            return JsonResponse(return_value)

        return_value['__form__'] = 'false'
        return_value['__url__'] = '/statement/login_nok/'
        return JsonResponse(return_value)

    @staticmethod
    def Launch(request):
        return Login(request).HTML


class Register(Manage_Dynamic_Event):

    def Manage_Content(self):
        self.content['form'] = Form_Register()
        return self.Render_HTML('user/register.html')

    def Manage_Form(self):

        return_value = {}
        self.content['form'] = \
            Form_Register(self.request.POST)

        if self.content['form'].is_valid():
            self.content['form'].save()  # create user

            self.Create_No_Approved_User()
            self.Generate_Email_Message()
            return_value['__form__'] = 'true'
            return_value['__url__'] = '/statement/register_ok/'
            return JsonResponse(return_value)

        return_value['__form__'] = 'false'
        return_value['__url__'] = '/statement/register_nok/'
        return JsonResponse(return_value)

    def Create_No_Approved_User(self):
        self.content['key'] = binascii.hexlify(os.urandom(20))

        if self.content['key'] not in No_Approved_User.objects.all():
            No_Approved_User\
            (
                user=User.objects.get(username=self.content['form'].username),
                approved_key=self.content['key']
            ).save()

        else: self.Create_No_Approved_User()

    def Generate_Email_Message(self):
        title = 'Confirm your new account.'
        content = self.content['key']
        Sender.Send_Email(title, content)

    @staticmethod
    def Launch(request):
        return Register(request).HTML


class Logout(Manage_Dynamic_Event):

    def Manage_Content(self):
        self.request.session['user_login'] = False
        return self.Render_HTML('user/logout.html')

    @staticmethod
    def Launch(request):
        return Logout(request).HTML



class Approved_Register(Manage_Dynamic_Event):

    def Manage_Content(self):
        return self.Render_HTML('user/approved.html')

    @staticmethod
    def Update_User_Status(request, key):

        if key in No_Approved_User.objects.all():
            record = No_Approved_User.objects.get(approved_key=key)
            record.user.update(approved=True)
            record.delete()

        return Approved_Register.Launch(request)

    @staticmethod
    def Launch(request):
        return Approved_Register(request).HTML