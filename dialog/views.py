from arbuz.views import *
from product.forms import *


class Dialog_Alert(Dynamic_Event_Menager):

    def Manage_Content_Ground(self):
        pass

    def Manage(self):

        # if self.request.POST['__dialog__'] == 'dialog':
        #     return None

        return super(Dialog_Alert, self).Manage_Form()

    @staticmethod
    def Launch(request):
        return Dialog_Prompt(request, autostart=False).HTML



class Dialog_Confirm(Dynamic_Event_Menager):

    def Manage_Content_Ground(self):
        pass

    def Manage(self):

        # if self.request.POST['__dialog__'] == 'dialog':
        #     return None

        return super(Dialog_Confirm, self).Manage_Form()

    @staticmethod
    def Launch(request):
        return Dialog_Prompt(request, autostart=False).HTML



class Dialog_Prompt(Dynamic_Event_Menager):


    def Manage_Content_Ground(self):
        pass

    def Manage_New_Brand(self):
        self.content['form'] = Form_New_Brand()
        return self.Render_HTML('dialog/prompt.html', 'new_brand')

    def Manage_New_Purpose(self):
        self.content['form'] = Form_New_Purpose()
        return self.Render_HTML('dialog/prompt.html', 'new_purpose')

    def Manage_New_Details(self):
        self.content['form'] = Form_New_Details_EN()
        return self.Render_HTML('dialog/prompt.html', 'new_details')

    def Manage_Where_Display(self):
        self.content['form'] = Form_Where_Display()
        return self.Render_HTML('dialog/prompt.html', 'where_display')

    def Manage(self):

        if self.request.POST['name'] == 'new_brand':
            return self.Manage_New_Brand()

        if self.request.POST['name'] == 'new_purpose':
            return self.Manage_New_Brand()

        if self.request.POST['name'] == 'new_details':
            return self.Manage_New_Brand()

        if self.request.POST['name'] == 'where_display':
            return self.Manage_New_Brand()

        return super(Dialog_Prompt, self).Manage_Form()

    @staticmethod
    def Launch(request):
        return Dialog_Prompt(request, autostart=False).HTML



class Dialog:

    @staticmethod
    def Launch(request):

        if request.POST['__dialog__'] == 'alert':
            return Dialog_Alert.Launch(request)

        if request.POST['__dialog__'] == 'confirm':
            return Dialog_Confirm.Launch(request)

        if request.POST['__dialog__'] == 'prompt':
            return Dialog_Prompt.Launch(request)

