from product.forms import *
from user.account.forms import *
from translator.views import *
from inspect import getmembers, ismethod


class Dialog(Dynamic_Base):

    def Render_Dialog(self, file_name, form_name = '',
                      authorization=False, only_root=False):

        if not authorization and not only_root:
            return self.Render_HTML(file_name, form_name)

        if authorization:
            if self.request.session['user_login']:
                return self.Render_HTML(file_name, form_name)

        if only_root:
            if self.request.session['root_login']:
                return self.Render_HTML(file_name, form_name)

        return self.Unauthorized_Access()

    def Get_Dialog_Name(self):
        return self.request.POST['dialog_name']

    def Apply_Message(self):
        self.content['title'] = Text(self.request, 8)
        return self.Render_HTML('dialog/apply.html')

    def Unauthorized_Access(self):
        self.content['title'] = Text(self.request, 69)
        self.content['text'] = Text(self.request, 70)
        return self.Render_HTML('dialog/alert.html')

    def Manage(self):

        if self.apply:
            return self.Apply_Message()

        methods = getmembers(self, predicate=ismethod)
        methods = [method[0] for method in methods]
        dialog_name = self.Get_Dialog_Name()

        for method in methods:
            if dialog_name in method.lower():
                return getattr(self.__class__, method)(self)

    def __init__(self, request, apply=False):
        super(Dialog, self).__init__(request)
        self.apply = apply



class Dialog_Alert(Dialog):

    def Manage_Language(self):
        return self.Render_Dialog('dialog/language.html')

    def Manage_Product_Recommended(self):
        self.content['title'] = Text(self.request, 9)
        self.content['text'] = Text(self.request, 10)
        return self.Render_Dialog('dialog/alert.html', only_root=True)

    def __init__(self, request):
        super(Dialog_Alert, self).__init__(request)
        self.HTML = self.Manage()



class Dialog_Confirm(Dialog):

    def __init__(self, request):
        super(Dialog_Confirm, self).__init__(request)
        self.HTML = self.Manage()



class Dialog_Prompt(Dialog):

    def Manage_Brand(self):
        initial = self.Get_Session_Variable()
        initial = initial.pk if initial else None

        self.content['title'] = Text(self.request, 1)
        self.content['form'] = Form_Brand(self.request,
            self.Get_POST(), initial={'exists': initial})

        return self.Render_Dialog('dialog/prompt.html',
                                  'brand', only_root=True)

    def Manage_Purpose(self):
        initial = self.Get_Session_Variable()
        initial = initial.pk if initial else None

        self.content['title'] = Text(self.request, 2)
        self.content['form'] = Form_Purpose(self.request,
            self.Get_POST(), initial={'exists': initial})

        return self.Render_Dialog('dialog/prompt.html',
                                  'purpose', only_root=True)

    def Manage_Details_EN(self):
        self.content['title'] = Text(self.request, 3)
        self.content['form'] = Form_Details_EN(self.request,
            self.Get_POST(), instance=self.Get_Session_Variable())

        return self.Render_Dialog('dialog/prompt.html',
                                  'details_en', only_root=True)

    def Manage_Details_PL(self):
        self.content['title'] = Text(self.request, 4)
        self.content['form'] = Form_Details_PL(self.request,
            self.Get_POST(), instance=self.Get_Session_Variable())

        return self.Render_Dialog('dialog/prompt.html',
                                  'details_pl', only_root=True)

    def Manage_Details_DE(self):
        self.content['title'] = Text(self.request, 5)
        self.content['form'] = Form_Details_EN(self.request,
            self.Get_POST(), instance=self.Get_Session_Variable())

        return self.Render_Dialog('dialog/prompt.html',
                                  'details_de', only_root=True)

    def Manage_Where_Display(self):
        self.content['title'] = Text(self.request, 6)
        self.content['form'] = Form_Where_Display(self.request,
            self.Get_POST(), instance=self.Get_Session_Variable())

        return self.Render_Dialog('dialog/prompt.html',
                                  'where_display', only_root=True)

    def Manage_Image(self):
        initial = self.Get_Session_Variable()
        url = self.request.session['product_image_url']

        self.content['title'] = Text(self.request, 7)
        self.content['image'] = initial
        self.content['form'] = Form_Image(self.request,
            self.Get_POST(), initial={'url': url})

        return self.Render_Dialog('dialog/prompt.html',
                                  'image', only_root=True)


    def Manage_Edit_Email(self):
        self.content['title'] = Text(self.request, 86)
        self.content['form'] = Form_User_Details(
            self.request, self.Get_POST())

        self.content['form'].Set_Hidden('username')
        self.content['form'].Set_Hidden('password')

        return self.Render_Dialog('dialog/prompt.html',
                                  'edit_email', authorization=True)

    def Manage_Edit_Username(self):
        self.content['title'] = Text(self.request, 87)
        self.content['form'] = Form_User_Details(
            self.request, self.Get_POST())

        self.content['form'].Set_Hidden('email')
        self.content['form'].Set_Hidden('password')

        return self.Render_Dialog('dialog/prompt.html',
                                  'edit_username', authorization=True)

    def Manage_Edit_Password(self):
        self.content['title'] = Text(self.request, 88)
        self.content['form'] = Form_User_Details(
            self.request, self.Get_POST())

        self.content['form'].Set_Hidden('username')
        self.content['form'].Set_Hidden('email')

        return self.Render_Dialog('dialog/prompt.html',
                                  'edit_password', authorization=True)


    def Get_POST(self):

        if self.not_valid:
            return self.request.POST

        return None

    def Get_Session_Variable(self):

        session_variable = 'product_' + self.Get_Dialog_Name()
        if session_variable in self.request.session:
            if self.request.session[session_variable]:
                return self.request.session[session_variable]

        return None

    def Get_Dialog_Name(self):

        if 'dialog_name' in self.request.POST:
            return self.request.POST['dialog_name']

        return self.request.POST['__form__']

    def __init__(self, request, apply=False, not_valid=False):
        super(Dialog_Prompt, self).__init__(request, apply)
        self.not_valid = not_valid
        self.HTML = self.Manage()
