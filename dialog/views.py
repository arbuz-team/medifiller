from arbuz.views import *
from product.forms import *


class Dialog_Alert(Dynamic_Event_Menager):

    def Manage_Content_Ground(self):
        pass

    def Manage(self):

        # if self.request.POST['name'] == 'new_brand':
        #     return self.Manage_New_Brand()

        return self.Error_No_Event()

    @staticmethod
    def Launch(request):
        return Dialog_Prompt(request, autostart=False).HTML



class Dialog_Confirm(Dynamic_Event_Menager):

    def Manage_Content_Ground(self):
        pass

    def Manage(self):

        # if self.request.POST['name'] == 'new_brand':
        #     return self.Manage_New_Brand()

        return self.Error_No_Event()

    @staticmethod
    def Launch(request):
        return Dialog_Prompt(request, autostart=False).HTML



class Dialog_Prompt(Dynamic_Event_Menager):


    def Manage_Content_Ground(self):
        pass

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

        return self.Error_No_Event()

    @staticmethod
    def Launch(request):
        return Dialog_Prompt(request).HTML
