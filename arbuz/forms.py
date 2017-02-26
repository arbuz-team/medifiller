from django import forms
from user.models import *
from translator.views import *


class Base_Form:

    def clean_secure(self):
        password = self.data['secure']

        if self.request.session['user_unique']:
            unique = self.request.session['user_unique']
            user = User.objects.get(unique=unique)

            if Dynamic_Base.Encrypt(password) == user.password:
                return True

        raise forms.ValidationError(Text(self.request, 85))

    def Create_Fields(self):
        pass

    def Set_Widgets(self):
        pass

    def Exclude_Fields(self):
        pass

    def Set_Secure_Form(self):

        secure_attrs = {
            'placeholder': Text(self.request, 84),
            'class': 'test',
        }

        self.fields['secure'] = forms.CharField(max_length=100)
        self.fields['secure'].widget = forms.PasswordInput(attrs=secure_attrs)

    def __init__(self, request):
        self.request = request

        self.Create_Fields()
        self.Set_Widgets()
        self.Exclude_Fields()



class Abstract_Model_Form(Base_Form, forms.ModelForm):

    def __init__(self, request, *args, **kwargs):
        forms.ModelForm.__init__(self, *args, **kwargs)
        Base_Form.__init__(self, request)



class Abstract_Form(Base_Form, forms.Form):

    def __init__(self, request, *args, **kwargs):
        forms.Form.__init__(self, *args, **kwargs)
        Base_Form.__init__(self, request)



