from django.shortcuts import render
from django.http import JsonResponse
from abc import ABCMeta, abstractmethod
from session.views import *
from translator.views import *
import re


class Manage_Dynamic_Event(metaclass=ABCMeta):

    def Render_HTML(self, file_name, form_name = ''):

        # example: EN/user/login.html
        template = self.request.session['translator_language'] \
                   + '/' + file_name

        self.content['form_name'] = form_name
        return render(self.request, template, self.content)

    @abstractmethod
    def Manage_Content(self):
        pass

    def Manage_Form(self):
        self.content['error'] = 'form'
        return self.Render_HTML('arbuz/error.html')

    def Manage_Exist(self):
        return JsonResponse({'__exist__': 'false'})

    def Manage_Edit(self):
        return JsonResponse({'__edit__': 'false'})

    def Manage_Button(self):
        return JsonResponse({'__button__': 'false'})

    def Manage_No_Event(self):
        self.content['error'] = 'no_event'
        return self.Render_HTML('arbuz/error.html')

    def Manage_Unauthorized(self):
        self.content['error'] = 'unauthorized'
        return self.Render_HTML('arbuz/error.html')

    def Manage_Index(self):
        Check_Session(self.request)

        lang_redirect = Translator.Get_Language_Redirect(self.request)
        if lang_redirect:
            return lang_redirect

        return render(self.request, 'index.html', {})

    def Check_Authorization(self):

        if self.authorization:
            if self.request.session['user_login']:
                return True

        else: return True
        return False

    def Check_POST_Is_Dangerous(self):

        for key in self.request.POST:
            if re.findall('<.*>', self.request.POST[key]):
                return True

        return False

    def Update_Navigation(self):

        self.request.session['arbuz_navigation'] = []
        url = self.request.build_absolute_uri()
        navigation = url.split('/')[3:-1]
        page = '/'

        for element in navigation:
            page += element + '/'
            self.request.session['arbuz_navigation']\
                .append((element, page))

    def Manage(self):

        self.Update_Navigation()
        if self.Check_POST_Is_Dangerous():
            self.content['error'] = 'post_is_dangerous'
            return self.Render_HTML('arbuz/error.html')

        if self.request.method == 'POST':
            if self.Check_Authorization():

                # parts of pages
                if '__content__' in self.request.POST:
                    return self.Manage_Content()

                # manage forms
                if '__form__' in self.request.POST:
                    return self.Manage_Form()

                if '__edit__' in self.request.POST:
                    return self.Manage_Edit()

                # checkers
                if '__exist__' in self.request.POST:
                    return self.Manage_Exist()

                # options
                if '__button__' in self.request.POST:
                    return self.Manage_Button()

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