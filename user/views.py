from arbuz.views import *
from .forms import *


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
            self.content['form'].save()
            return_value['__form__'] = 'true'
            return_value['__url__'] = '/statement/register_ok/'
            return JsonResponse(return_value)

        return_value['__form__'] = 'false'
        return_value['__url__'] = '/statement/register_nok/'
        return JsonResponse(return_value)

    def Manage_Exist(self):

        if 'username' in self.request.POST:
            if User.objects.filter(username=self.request.POST['username']):
                return JsonResponse({'__exist__': 'true'})

        return JsonResponse({'__exist__': 'false'})

    @staticmethod
    def Launch(request):
        return Register(request, authorization=True).HTML


class Logout(Manage_Dynamic_Event):

    def Manage_Content(self):
        self.request.session['user_login'] = False
        return self.Render_HTML('user/logout.html')

    @staticmethod
    def Launch(request):
        return Logout(request).HTML
