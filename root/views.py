from arbuz.views import *
from .forms import *


class Login(Manage_Dynamic_Event):

    def Manage_Content(self):
        self.content['form'] = Form_Root_Login()
        self.content['form_name'] = 'login'
        return self.Render_HTML('root/login.html')

    def Manage_Form_Login(self):

        self.content['form'] = \
            Form_Root_Login(self.request.POST)

        if self.content['form'].is_valid():
            self.request.session['root_login'] = True

            self.content['form'] = None  # message of correct
            return self.Render_HTML('root/login.html')

        return self.Render_HTML('user/login.html')

    def Manage_Form(self):

        if self.request.POST['__form__'] == 'login':
            return self.Manage_Form_Login()

        return super(Login, self).Manage_Form()

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
