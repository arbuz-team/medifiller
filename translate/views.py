from .models import *


class Translate:

    @staticmethod
    def Get_PL(en_value):

        if not Language_EN.objects.filter(value=en_value):
            raise Exception('This value does not exist. '
                            '<translate.Translate.Get_PL>')

        pk = Language_EN.objects.get(value=en_value)
        return Language_PL.objects.get(id=pk).value

    @staticmethod
    def Load_Languages():

        # load EN language
        file = open('language/EN')
        lines = file.readlines()
        file.close()
        for line in lines:
            Language_EN(value=line).save()

        # load PL language
        file = open('language/PL')
        lines = file.readlines()
        file.close()
        for line in lines:
            Language_EN(value=line).save()
