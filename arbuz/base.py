from django.shortcuts import render
from django.http import JsonResponse


class Dynamic_Base:

    def Render_HTML(self, file_name, form_name = ''):

        # example: EN/user/sign_in.html
        template = self.request.session['translator_language'] \
                   + '/' + file_name

        self.content['form_name'] = form_name
        return render(self.request, template, self.content)

    def __init__(self, request):
        self.request = request
        self.content = {}
