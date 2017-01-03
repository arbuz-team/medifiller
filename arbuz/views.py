from django.shortcuts import render
from django.core.urlresolvers import reverse, resolve
from django.http import JsonResponse
from abc import ABCMeta, abstractmethod
from session.views import *
from translator.views import *
import re


class Dynamic_Base:

    def Render_HTML(self, file_name, form_name = ''):

        # example: EN/user/login.html
        template = self.request.session['translator_language'] \
                   + '/' + file_name

        self.content['form_name'] = form_name
        return render(self.request, template, self.content)

    def __init__(self, request):
        self.request = request
        self.content = {}



class Manager(Dynamic_Base):

    @abstractmethod
    def Manage_Content(self):
        pass

    def Manage_Form(self):
        self.content['error'] = 'form'
        return self.Render_HTML('arbuz/error.html')

    def Manage_Edit(self):
        return JsonResponse({'__edit__': 'false'})

    def Manage_Exist(self):
        return JsonResponse({'__exist__': 'false'})

    #def Manage_Secure(self):
    #    return JsonResponse({'__secure__': 'false'})

    def Manage_Button(self):
        return JsonResponse({'__button__': 'false'})

    def Manage_Index(self):
        Check_Session(self.request)

        lang_redirect = Translator.Get_Language_Redirect(self.request)
        if lang_redirect:
            return lang_redirect

        return render(self.request, 'index.html', {})

    def __init__(self, request):
        Dynamic_Base.__init__(self, request)



class Checker(Dynamic_Base):

    def Error_No_Event(self):
        self.content['error'] = 'no_event'
        return self.Render_HTML('arbuz/error.html')

    def Error_Authorization(self):
        self.content['error'] = 'unauthorized'
        return self.Render_HTML('arbuz/error.html')

    def Error_Secure_POST(self):
        self.content['error'] = 'post_is_dangerous'
        return self.Render_HTML('arbuz/error.html')

    def Check_Authorization(self):

        if self.authorization:
            if self.request.session['user_login']:
                return True

        else: return True
        return False

    def Check_Secure_POST(self):

        for key in self.request.POST:
            if re.findall('<.*>', self.request.POST[key]):
                return False

        return True

    def __init__(self, request):
        Dynamic_Base.__init__(self, request)

        self.ERROR_HTML = None
        self.authorization = False



class Updater(Dynamic_Base):

    def Update_Navigation(self):

        self.request.session['arbuz_navigation'] = []
        url = self.request.get_full_path()
        navigation = url.split('/')[1:-1]
        page = '/'

        for element in navigation:
            page += element + '/'
            self.request.session['arbuz_navigation']\
                .append((element, page))

    def Update_Current_Url(self):

        name = resolve(self.request.path_info).url_name
        kwargs = resolve(self.request.path_info).kwargs
        url = self.request.get_host()

        if self.request.is_secure():
            url = 'https://' + url

        else: url = 'http://' + url

        self.request.session['arbuz_url'] = \
        {
            'en': url + reverse(name, urlconf='arbuz.urls.en', kwargs=kwargs),
            'pl': url + reverse(name, urlconf='arbuz.urls.pl', kwargs=kwargs),
            #'de': url + reverse(name, urlconf='arbuz.urls.de', kwargs=kwargs),
        }

    def __init__(self, request):
        Dynamic_Base.__init__(self, request)



class Dynamic_Event_Menager(Manager, Checker, Updater, metaclass=ABCMeta):

    def Check(self):

        if self.error_method:
            self.ERROR_HTML = self.Error()
            return False

        methods = getmembers(self, predicate=ismethod)
        methods = [method[0] for method in methods]

        # call all of methods Check_*
        for method in methods:
            if 'Check_' in method:

                # Check_* returned False
                if not getattr(Dynamic_Event_Menager, method)(self):

                    # render error HTML
                    method = method.replace('Check', 'Error')
                    self.ERROR_HTML = getattr(Dynamic_Event_Menager, method)(self)

                    return False

        return True

    def Update(self):

        methods = getmembers(self, predicate=ismethod)
        methods = [method[0] for method in methods]

        for method in methods:
            if 'Update_' in method:
                getattr(Dynamic_Event_Menager, method)(self)

    def Error(self):
        return getattr(Dynamic_Event_Menager, self.error_method)(self)

    def Manage(self):

        self.Update()

        if self.request.method == 'POST':
            if self.Check():

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

                #if '__secure__' in self.request.POST:
                #    return self.Manage_Secure()

                # options
                if '__button__' in self.request.POST:
                    return self.Manage_Button()

                return self.Error_No_Event()
            return self.ERROR_HTML

        if self.request.method == 'GET':
            return self.Manage_Index()

    def __init__(self, request,
                 autostart=True,
                 authorization=False,
                 error_method=None,
                 other_value=None):

        Manager.__init__(self, request)
        Checker.__init__(self, request)
        Updater.__init__(self, request)

        self.authorization = authorization
        self.error_method = error_method
        self.other_value = other_value

        if autostart:
            self.HTML = self.Manage()

    @staticmethod
    @abstractmethod
    def Launch(request):
        return Dynamic_Event_Menager(request)