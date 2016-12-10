from arbuz.views import *
from .forms import *


class Login(Manage_Dynamic_Event):

    def Manage_Content(self):
        self.content['form'] = Form_Root_Login()
        return self.Render_HTML('root/login.html')

    def Manage_Form(self):

        return_value = {}
        self.content['form'] = \
            Form_Root_Login(self.request.POST)

        if self.content['form'].is_valid():
            self.request.session['root_login'] = True
            return_value['__form__'] = 'true'
            return_value['__url__'] = '/statement/login_ok/'
            return JsonResponse(return_value)

        return_value['__form__'] = 'false'
        return_value['__url__'] = '/statement/login_nok/'
        return JsonResponse(return_value)

    @staticmethod
    def Launch(request):
        return Login(request).HTML



class Logout(Manage_Dynamic_Event):

    def Manage_Content(self):
        self.request.session['root_login'] = False
        return self.Render_HTML('root/logout.html')

    @staticmethod
    def Launch(request):
        return Logout(request).HTML
