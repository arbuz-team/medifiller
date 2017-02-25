from arbuz.views import *
from root.forms import *
from payment.models import *
import string, random


class Start_App(Dynamic_Event_Menager):

    def Manage_Content_Ground(self):

        self.content['apps'] = [
            {
                'name': Text(self.request, 23),
                'url':  self.Get_Path('root.sign_in', current_language=True),
                'icon': '/_static/img/icons/128/dark/padlock_open.png',
            },
            {
                'name': Text(self.request, 24),
                'url': self.Get_Path('root.sign_out', current_language=True),
                'icon': '/_static/img/icons/128/dark/logout.png',
            },
            {
                'name': Text(self.request, 25),
                'url': self.Get_Path('root.create', current_language=True),
                'icon': '/_static/img/icons/128/dark/moustache.png',
            },
            {
                'name': Text(self.request, 26),
                'url': self.Get_Path('root.map_references', current_language=True),
                'icon': '/_static/img/icons/128/dark/list_options.png',
            },
            {
                'name': Text(self.request, 27),
                'url': self.Get_Path('root.users_payments', current_language=True),
                'icon': '/_static/img/icons/128/dark/money.png',
            },
        ]

        return self.Render_HTML('arbuz/start_app.html')

    @staticmethod
    def Launch(request):
        return Start_App(request).HTML



class Sign_In(Dynamic_Event_Menager):

    def Manage_Content_Ground(self):
        self.content['form'] = Form_Root_Login(self.request)
        return self.Render_HTML('root/sign_in.html', 'login')

    def Manage_Form_Login(self):

        self.content['form'] = \
            Form_Root_Login(self.request, self.request.POST)

        if self.content['form'].is_valid():
            self.request.session['root_login'] = True

            self.content['form'] = None  # message of correct
            return self.Render_HTML('root/sign_in.html')

        return self.Render_HTML('root/sign_in.html', 'login')

    def Manage_Form(self):

        if self.request.POST['__form__'] == 'login':
            return self.Manage_Form_Login()

        return super(Sign_In, self).Manage_Form()

    @staticmethod
    def Launch(request):
        return Sign_In(request).HTML



class Sign_Out(Dynamic_Event_Menager):

    def Manage_Content_Ground(self):
        self.request.session['root_login'] = False
        return self.Render_HTML('root/sign_out.html')

    def Check_Authorization(self):

        if self.authorization:
            if self.request.session['root_login']:
                return True

        else: return True
        return False

    @staticmethod
    def Launch(request):
        return Sign_Out(request, only_root=True).HTML



class Create(Dynamic_Event_Menager):

    def Manage_Content_Ground(self):
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



class Map_References(Dynamic_Event_Menager):

    def Manage_Content_Ground(self):
        return self.Render_HTML('root/map_references.html')

    @staticmethod
    def Launch(request):
        return Map_References(request, only_root=True).HTML



class Users_Payments(Dynamic_Event_Menager):

    def Manage_Content_Ground(self):
        self.content['payments_approved'] = Payment.objects.filter(approved=True)
        self.content['payments_not_approved'] = Payment.objects.filter(approved=False)
        return self.Render_HTML('root/users_payments.html')

    @staticmethod
    def Launch(request):
        return Users_Payments(request, only_root=True).HTML
