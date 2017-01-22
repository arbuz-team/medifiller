from django import forms
from .models import *
from user.models import User

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

        user = Root.objects.get(password=User.Encrypt(password))
        if user.password != User.Encrypt(password):
            raise forms.ValidationError('Wrong password. '
                                        'Try again.')
        return User.Encrypt(password)
