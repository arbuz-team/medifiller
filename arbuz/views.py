from django.shortcuts import render, redirect
from django.http import JsonResponse
from abc import ABCMeta, abstractmethod
from session.views import *


class Manage_Dynamic_Event(metaclass=ABCMeta):

    def Render_HTML(self, file_name):
        return render(self.request, file_name, self.content)

    @abstractmethod
    def Manage_Content(self):
        pass

    def Manage_Form(self):
        pass

    def Manage_Exist(self):
        pass

    def Manage_No_Event(self):
        self.content['message'] = 'Manage_Dynamic_Event:' \
                            ' no variable defining instruction.'

        return self.Render_HTML('arbuz/error.html')

    def Manage_Unauthorized(self):
        self.content['message'] = 'Manage_Dynamic_Event:' \
                            ' detecting unauthorized access.'

        return self.Render_HTML('arbuz/error.html')

    def Manage_Index(self):
        Check_Session(self.request)
        return render(self.request, 'index.html', {})

    def Check_Authorization(self):
        if self.authorization:
            if self.request.session['user_login']:
                return True

        else: return True
        return False

    def Manage(self):

        if self.request.method == 'POST':
            if self.Check_Authorization():

                if '__content__' in self.request.POST:
                    return self.Manage_Content()

                if '__form__' in self.request.POST:
                    return self.Manage_Form()

                if '__exist__' in self.request.POST:
                    return self.Manage_Exist()

                return self.Manage_No_Event()
            return self.Manage_Unauthorized()

        if self.request.method == 'GET':
            return self.Manage_Index()

    def __init__(self, request,
                 autostart=True,
                 authorization=False):

        self.request = request
        self.authorization = authorization
        self.content = {}

        if autostart:
            self.HTML = self.Manage()

    @staticmethod
    @abstractmethod
    def Launch(request):
        return Manage_Dynamic_Event(request)