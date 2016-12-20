from arbuz.views import *
from translator.views import *
import os


class Control_Panel(Manage_Dynamic_Event):

    def Manage_Content(self):
        return self.Render_HTML('setting/control_panel.html')

    @staticmethod
    def Reset_Databases(request):
        os.system('./reset.sh')
        return Control_Panel.Launch(request)

    @staticmethod
    def Load_Languages(request):
        Translator.Load_Languages()
        return Control_Panel.Launch(request)

    @staticmethod
    def Launch(request):
        return Control_Panel(request).HTML
