from .models import *


class Translator:

    @staticmethod
    def Translate_EN(pk):
        return Language_EN.objects.get(id=pk).value

    @staticmethod
    def Translate_PL(pk):
        return Language_PL.objects.get(id=pk).value

    @staticmethod
    def Translate_DE(pk):
        return Language_DE.objects.get(id=pk).value

    def Translate(self, pk):

        if not Language_EN.objects.filter(id=pk):
            raise Exception('This value does not exist. '
                            '<translator.Translator.Translate>')

        method = 'Translate_' + self.request.session['translator_language']
        return getattr(Translator, method)(pk)

    @staticmethod
    def Load_Languages():

        # load EN language
        file = open('translator/language/EN')
        lines = file.readlines()
        file.close()
        for line in lines:
            Language_EN(value=line).save()

        # load PL language
        file = open('translator/language/PL')
        lines = file.readlines()
        file.close()
        for line in lines:
            Language_PL(value=line).save()

        # load DE language
        file = open('translator/language/DE')
        lines = file.readlines()
        file.close()
        for line in lines:
            Language_DE(value=line).save()

    def __init__(self, request):
        self.request = request



def Text(request, pk):
    translator = Translator(request)
    return translator.Translate(pk)

def Check_Translator():
    if not Language_EN.objects.all():
        Translator.Load_Languages()
