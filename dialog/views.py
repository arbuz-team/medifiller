from product.forms import *
from translator.views import *
from inspect import getmembers, ismethod


class Dialog(Dynamic_Base):

    def Get_Dialog_Name(self):
        return self.request.POST['dialog_name']

    def Apply_Message(self):
        self.content['title'] = Text(self.request, 8)
        return self.Render_HTML('dialog/apply.html')

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

    def Manage_Access_Denied(self):
        self.content['title'] = 'access_denied'
        return self.Render_HTML('dialog/alert.html')

    def Manage_Language(self):
        return self.Render_HTML('dialog/language.html')

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
        self.content['form'] = Form_Brand(self.Get_POST(),
                    initial={'exists': initial})

        return self.Render_HTML('dialog/prompt.html', 'brand')

    def Manage_Purpose(self):
        initial = self.Get_Session_Variable()
        initial = initial.pk if initial else None

        self.content['title'] = Text(self.request, 2)
        self.content['form'] = Form_Purpose(self.Get_POST(),
                    initial={'exists': initial})

        return self.Render_HTML('dialog/prompt.html', 'purpose')

    def Manage_Details_EN(self):
        self.content['title'] = Text(self.request, 3)
        self.content['form'] = Form_Details_EN(self.Get_POST(),
                    instance=self.Get_Session_Variable())

        return self.Render_HTML('dialog/prompt.html', 'details_en')

    def Manage_Details_PL(self):
        self.content['title'] = Text(self.request, 4)
        self.content['form'] = Form_Details_PL(self.Get_POST(),
                    instance=self.Get_Session_Variable())

        return self.Render_HTML('dialog/prompt.html', 'details_pl')

    def Manage_Details_DE(self):
        self.content['title'] = Text(self.request, 5)
        self.content['form'] = Form_Details_EN(self.Get_POST(),
                    instance=self.Get_Session_Variable())

        return self.Render_HTML('dialog/prompt.html', 'details_de')

    def Manage_Where_Display(self):
        self.content['title'] = Text(self.request, 6)
        self.content['form'] = Form_Where_Display(self.Get_POST(),
                    instance=self.Get_Session_Variable())

        return self.Render_HTML('dialog/prompt.html', 'where_display')

    def Manage_Image(self):
        initial = self.Get_Session_Variable()
        url = self.request.session['product_image_url']

        self.content['title'] = Text(self.request, 7)
        self.content['image'] = initial
        self.content['form'] = Form_Image(self.Get_POST(),
                    initial={'url': url})

        return self.Render_HTML('dialog/prompt.html', 'image')


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
