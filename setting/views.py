from arbuz.settings import BASE_DIR
from arbuz.views import *
import os

from setting.data import main
from setting.data import setting
from setting.data import products
from setting.data import users


class Control_Panel(Dynamic_Event_Menager):

    def Manage_Content_Ground(self):
        return self.Render_HTML('setting/control_panel.html')

    @staticmethod
    def Reset_Databases(request):
        os.system(BASE_DIR + '/reset.sh')
        return Control_Panel.Launch(request)

    @staticmethod
    def Load_Default_Data(request):
        main.Load_Default_Data()
        setting.Load_Default_Data()
        products.Load_Default_Data()
        users.Load_Default_Data()
        return Control_Panel.Launch(request)

    @staticmethod
    def Launch(request):
        return Control_Panel(request).HTML
