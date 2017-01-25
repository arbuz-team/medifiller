from product.forms import *
from translator.views import *
from inspect import getmembers, ismethod


class Dialog_Alert(Dynamic_Base):

    def Manage_Access_Denied(self):
        self.content['title'] = 'access_denied'
        return self.Render_HTML('dialog/alert.html')

    def Manage(self):

        if self.request.POST['name'] == 'access_denied':
            return self.Manage_Access_Denied()

    def __init__(self, request):
        super(Dialog_Alert, self).__init__(request)
        self.HTML = self.Manage()



class Dialog_Confirm(Dynamic_Base):

    def Manage(self):
        pass

        # if self.request.POST['name'] == 'new_brand':
        #     return self.Manage_New_Brand()

    def __init__(self, request):
        super(Dialog_Confirm, self).__init__(request)
        self.HTML = self.Manage()



class Dialog_Prompt(Dynamic_Base):

    def Manage_New_Brand(self):
        self.content['title'] = Text(self.request, 1)
        self.content['form'] = Form_New_Brand(self.Get_POST())
        return self.Render_HTML('dialog/prompt.html', 'new_brand')

    def Manage_New_Purpose(self):
        self.content['title'] = Text(self.request, 2)
        self.content['form'] = Form_New_Purpose(self.Get_POST())
        return self.Render_HTML('dialog/prompt.html', 'new_purpose')

    def Manage_New_Details_EN(self):
        self.content['title'] = Text(self.request, 3)
        self.content['form'] = Form_New_Details_EN(self.Get_POST())
        return self.Render_HTML('dialog/prompt.html', 'new_details_en')

    def Manage_New_Details_PL(self):
        self.content['title'] = Text(self.request, 4)
        self.content['form'] = Form_New_Details_PL(self.Get_POST())
        return self.Render_HTML('dialog/prompt.html', 'new_details_pl')

    def Manage_New_Details_DE(self):
        self.content['title'] = Text(self.request, 5)
        self.content['form'] = Form_New_Details_EN(self.Get_POST())
        return self.Render_HTML('dialog/prompt.html', 'new_details_de')

    def Manage_Where_Display(self):
        self.content['title'] = Text(self.request, 6)
        self.content['form'] = Form_Where_Display(self.Get_POST())
        return self.Render_HTML('dialog/prompt.html', 'where_display')

    def Manage_New_Image(self):
        self.content['title'] = Text(self.request, 7)
        self.content['form'] = Form_Image(self.Get_POST())
        return self.Render_HTML('dialog/prompt.html', 'new_image')

    def Response(self):
        self.content['title'] = Text(self.request, 8)
        self.content['form'] = None  # message of correct
        return self.Render_HTML('dialog/prompt.html')

    def Get_POST(self):

        if self.not_valid:
            return self.request.POST

        else: return None

    def Get_Form_Name(self):

        if 'form_name' in self.request.POST:
            return self.request.POST['form_name']

        else: return self.request.POST['__form__']

    def Manage(self):

        if self.response:
            return self.Response()

        methods = getmembers(self, predicate=ismethod)
        methods = [method[0] for method in methods]
        form_name = self.Get_Form_Name()

        for method in methods:
            if form_name in method.lower():
                return getattr(Dialog_Prompt, method)(self)

    def __init__(self, request, response=False, not_valid=False):
        super(Dialog_Prompt, self).__init__(request)
        self.response = response
        self.not_valid = not_valid
        self.HTML = self.Manage()
