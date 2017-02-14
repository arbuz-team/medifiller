from django import forms
from arbuz.base import *
from root.models import *

class Form_Root_Login(forms.Form):

    password = forms.CharField\
    (
        widget=forms.PasswordInput(
            attrs=
            {
                'placeholder': 'Password',
                'class': 'test',
                'autofocus': 'true',
            }),
        max_length=100
    )

    def clean_password(self):
        password = self.cleaned_data['password']

        if not Root.objects.all():
            raise forms.ValidationError('Root does not exist.')

        root = Root.objects.get(password=Dynamic_Base.Encrypt(password))
        if root.password != Dynamic_Base.Encrypt(password):
            raise forms.ValidationError('Wrong password. '
                                        'Try again.')
        return Dynamic_Base.Encrypt(password)
