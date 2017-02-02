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
    def Load_Default_Data(request):
        main.Load_Default_Data()
        setting.Load_Default_Data()
        products.Load_Default_Data()
        users.Load_Default_Data()
        return JsonResponse({})

    @staticmethod
    def Launch(request):
        return Control_Panel(request).HTML



class Reset_Database(Dynamic_Event_Menager):

    def Manage_Content_Ground(self):
        pass

    def Manage_Button(self):
        os.system(BASE_DIR + '/reset.sh')
        return JsonResponse({'__button__': 'true'})

    @staticmethod
    def Launch(request):
        return Reset_Database(request).HTML
