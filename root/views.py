from arbuz.views import *
from .forms import *
import string, random


class Login(Manage_Dynamic_Event):

    def Manage_Content(self):
        self.content['form'] = Form_Root_Login()
        return self.Render_HTML('root/login.html', 'login')

    def Manage_Form_Login(self):

        self.content['form'] = \
            Form_Root_Login(self.request.POST)

        if self.content['form'].is_valid():
            self.request.session['root_login'] = True

            self.content['message'] = Text(self.request, 10)
            self.content['form'] = None  # message of correct
            return self.Render_HTML('root/login.html')

        return self.Render_HTML('root/login.html', 'login')

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
        self.content['message'] = Text(self.request, 9)
        return self.Render_HTML('root/logout.html')

    @staticmethod
    def Launch(request):
        return Logout(request).HTML



class Create(Manage_Dynamic_Event):

    def Manage_Content(self):
        self.content['password'] = ''

        if not Root.objects.all():
            self.content['password'] = Create.Generate_Passwrod(8)
            Root(password=User.Encrypt(self.content['password'])).save()

        return self.Render_HTML('root/create.html')

    @staticmethod
    def Generate_Passwrod(length):
        password = ''
        permitted_chars = string.ascii_letters + \
                          string.digits + \
                          string.punctuation

        for char_number in range(0, length):
            password += random.choice(permitted_chars)

        return password

    @staticmethod
    def Launch(request):
        return Create(request).HTML
