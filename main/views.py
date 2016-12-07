# -*- coding: utf-8 -*-
from arbuz.views import *


class Contains_Start(Manage_Dynamic_Event):

    def Manage_Content(self):
        return self.Render_HTML('main/start.html')

    @staticmethod
    def Launch(request):
        return Contains_Start(request).HTML


class Contains_Products(Manage_Dynamic_Event):

    def Manage_Content(self):
        return self.Render_HTML('main/products.html')

    @staticmethod
    def Launch(request):
        return Contains_Products(request).HTML


class Contains_About_Us(Manage_Dynamic_Event):

    def Manage_Content(self):
        return self.Render_HTML('main/about_us.html')

    @staticmethod
    def Launch(request):
        return Contains_About_Us(request).HTML


class Contains_Contact_Us(Manage_Dynamic_Event):

    def Manage_Content(self):
        return self.Render_HTML('main/contact_us.html')

    @staticmethod
    def Launch(request):
        return Contains_Contact_Us(request).HTML


class Contains_Edit(Manage_Dynamic_Event):

    def Manage_Content(self):
        return self.Render_HTML('main/edit.html')

    @staticmethod
    def Launch(request):
        return Contains_Edit(request, autostart=True).HTML
