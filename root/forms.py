from arbuz.forms import *
from root.models import *

class Form_Root_Login(Abstract_Form):

    def clean_password(self):
        password = self.data['password']

        if not Root.objects.all():
            raise forms.ValidationError(Text(self.request, 28))

        if not Root.objects.filter(password=Dynamic_Base.Encrypt(password)):
            raise forms.ValidationError(Text(self.request, 29))

        root = Root.objects.get(password=Dynamic_Base.Encrypt(password))
        if root.password != Dynamic_Base.Encrypt(password):
            raise forms.ValidationError(Text(self.request, 30))

        return Dynamic_Base.Encrypt(password)

    def Create_Fields(self):
        self.fields['password'] = forms.CharField(max_length=100)

    def Set_Widgets(self):

        password_attr = {
            'placeholder': Text(self.request, 31),
            'class': 'test',
            'autofocus': 'true',
        }

        self.fields['password'].widget = forms.PasswordInput(attrs=password_attr)
