from arbuz.base import *
from product.forms import *


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
        self.content['title'] = 'new_brand'
        self.content['form'] = Form_New_Brand()
        return self.Render_HTML('dialog/prompt.html', 'new_brand')

    def Manage_New_Purpose(self):
        self.content['title'] = 'new_purpose'
        self.content['form'] = Form_New_Purpose()
        return self.Render_HTML('dialog/prompt.html', 'new_purpose')

    def Manage_New_Details_EN(self):
        self.content['title'] = 'new_details_en'
        self.content['form'] = Form_New_Details_EN()
        return self.Render_HTML('dialog/prompt.html', 'new_details_en')

    def Manage_New_Details_PL(self):
        self.content['title'] = 'new_details_pl'
        self.content['form'] = Form_New_Details_PL()
        return self.Render_HTML('dialog/prompt.html', 'new_details_pl')

    def Manage_New_Details_DE(self):
        self.content['title'] = 'new_details_de'
        self.content['form'] = Form_New_Details_EN()
        return self.Render_HTML('dialog/prompt.html', 'new_details_de')

    def Manage_Where_Display(self):
        self.content['title'] = 'where_display'
        self.content['form'] = Form_Where_Display()
        return self.Render_HTML('dialog/prompt.html', 'where_display')

    def Manage_New_Image(self):
        self.content['title'] = 'new_image'
        self.content['form'] = Form_Image()
        return self.Render_HTML('dialog/prompt.html', 'new_image')

    def Manage(self):

        if self.request.POST['name'] == 'new_brand':
            return self.Manage_New_Brand()

        if self.request.POST['name'] == 'new_purpose':
            return self.Manage_New_Purpose()

        if self.request.POST['name'] == 'new_details_en':
            return self.Manage_New_Details_EN()

        if self.request.POST['name'] == 'new_details_pl':
            return self.Manage_New_Details_PL()

        if self.request.POST['name'] == 'new_details_de':
            return self.Manage_New_Details_DE()

        if self.request.POST['name'] == 'where_display':
            return self.Manage_Where_Display()

        if self.request.POST['name'] == 'new_image':
            return self.Manage_New_Image()

    def __init__(self, request):
        super(Dialog_Prompt, self).__init__(request)
        self.HTML = self.Manage()
