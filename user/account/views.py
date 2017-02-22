from arbuz.views import *
from user.forms import *
from payment.models import *


class Start_App(Dynamic_Event_Menager):

    def Manage_Content_Ground(self):

        self.content['apps'] = [
            {
                'name': 'Account details',
                'url':  '/user/account/details/',
                'icon': '/_static/img/icons/128/user-shape.png',
            },
            {
                'name': 'User addresses',
                'url': '/user/account/addresses/',
                'icon': '/_static/img/icons/128/identity-card.png',
            },
            {
                'name': 'My shopping',
                'url': '/user/account/my_shopping/',
                'icon': '/_static/img/icons/128/options-list.png',
            },
            {
                'name': 'Favorite products',
                'url': '/user/account/favorite/',
                'icon': '/_static/img/icons/128/favorite.png',
            },
            {
                'name': 'Shopping cart',
                'url': '/payment/',
                'icon': '/_static/img/icons/128/shopping-cart.png',
            },
        ]

        return self.Render_HTML('arbuz/start_app.html')

    @staticmethod
    def Launch(request):
        return Start_App(request, authorization=True).HTML



class Account_Details(Dynamic_Event_Menager):

    def Manage_Content_Ground(self):
        unique = self.request.session['user_unique']
        self.content['user'] = User.objects.get(unique=unique)
        return self.Render_HTML('user/account/details.html')

    def Manage_Edit(self):
        user = User.objects.get(unique=self.request.session['user_unique'])

        if self.request.POST['__edit__'] == 'email':
            user.email = self.request.POST['value']
            user.save()
            return JsonResponse({'__edit__': 'true'})

        if self.request.POST['__edit__'] == 'username':
            user.username = self.request.POST['value']
            user.save()
            return JsonResponse({'__edit__': 'true'})

        return JsonResponse({'__edit__': 'false'})

    @staticmethod
    def Launch(request):
        return Account_Details(request, authorization=True).HTML



class User_Addresses(Dynamic_Event_Menager):

    def Get_User_Details(self):
        unique = self.request.session['user_unique']
        self.content['form_name_new'] = 'new_user_address'
        self.content['form_name_edit'] = 'edit_user_address'
        self.content['edit_forms_address'] = {}

        for address in User_Address.objects.filter(user=unique):
            self.content['edit_forms_address'][address.pk] = \
                Form_User_Address(instance=address)

    def Get_User_Address_ID(self):
        form_name = self.request.POST['__form__']
        id_address = int(form_name.replace('edit_user_address_', ''))

        if self.Check_ID_Address(id_address):
            return id_address

        raise Exception('An attempt unauthorized removal of address. '
                        '<user.Account.Get_User_Address_ID>')

    def Check_ID_Address(self, id_address):
        user = User.objects.get(unique=self.request.session['user_unique'])
        ids_address = User_Address.objects.filter(user=user).\
            values_list('id', flat=True)

        if id_address in ids_address:
            return True

        return False

    def Manage_Content_Ground(self):
        self.Get_User_Details()
        self.content['new_form_address'] = Form_User_Address()
        return self.Render_HTML('user/account/addresses.html')

    def Manage_Form_New_User_Address(self):

        self.content['form'] = Form_User_Address(self.request.POST)

        if self.content['form'].is_valid():
            unique = self.request.session['user_unique']
            address_user = self.content['form'].save(commit=False)
            address_user.user = User.objects.get(unique=unique)
            address_user.save()  # create address_user

            self.content['new_form_address'] = Form_User_Address()

        self.Get_User_Details()
        return self.Render_HTML('user/account/addresses.html')

    def Manage_Form_Edit_User_Address(self):

        id_address = self.Get_User_Address_ID()
        address = User_Address.objects.get(id=id_address)
        self.content['form'] = Form_User_Address(self.request.POST, instance=address)

        if self.content['form'].is_valid():
            self.content['form'].save() # save change of address_user

        self.Get_User_Details()
        self.content['new_form_address'] = Form_User_Address()
        return self.Render_HTML('user/account/addresses.html')

    def Manage_Form(self):

        if self.request.POST['__form__'] == 'new_user_address':
            return self.Manage_Form_New_User_Address()

        # all of edit forms
        if 'edit_user_address' in self.request.POST['__form__']:
            return self.Manage_Form_Edit_User_Address()

        return super(User_Addresses, self).Manage_Form()

    def Manage_Button(self):

        # removed address
        if '__button__' in self.request.POST:
            id_address = int(self.request.POST['value'])

            if self.Check_ID_Address(id_address):
                User_Address.objects.get(id=id_address).delete()
                return JsonResponse({'__button__': 'true'})

        return JsonResponse({'__button__': 'false'})

    @staticmethod
    def Launch(request):
        return User_Addresses(request, authorization=True).HTML



class My_Shopping(Dynamic_Event_Menager):

    def Manage_Content_Ground(self):
        self.content['payments'] = Payment.objects.filter(approved=True)
        return self.Render_HTML('user/account/my_shopping.html')

    @staticmethod
    def Launch(request):
        return My_Shopping(request, authorization=True).HTML



class Favorite(Dynamic_Event_Menager):

    def Manage_Content_Ground(self):
        user = User.objects.get(unique=self.request.session['user_unique'])
        self.content['favorites'] = Favorite_Product.objects.filter(user=user)
        return self.Render_HTML('user/account/favorite.html')

    @staticmethod
    def Launch(request):
        return Favorite(request, authorization=True).HTML
