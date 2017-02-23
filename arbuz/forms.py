from django import forms
from arbuz.base import *
from translator.views import *


class Base_Form:

    def Create_Fields(self):
        pass

    def Set_Widgets(self):
        pass

    def __init__(self, request):
        self.request = request
        self.Create_Fields()
        self.Set_Widgets()



class Abstract_Model_Form(Base_Form, forms.ModelForm):

    def __init__(self, request, *args, **kwargs):
        forms.ModelForm.__init__(self, *args, **kwargs)
        Base_Form.__init__(self, request)



class Abstract_Form(Base_Form, forms.Form):

    def __init__(self, request, *args, **kwargs):
        forms.Form.__init__(self, *args, **kwargs)
        Base_Form.__init__(self, request)
