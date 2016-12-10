from django import forms
from .models import *

class Form_Root_Login(forms.Form):

    password = forms.CharField\
    (
        widget=forms.PasswordInput(
            attrs=
            {
                'placeholder': 'Password',
                'data-test': 'yes',
            }),
        max_length=100
    )

    def clean_password(self):
        password = self.cleaned_data['password']
        user = Root.objects.get(password=password)

        if user.password != Root.Encrypt(password):
            raise forms.ValidationError('Wrong password. '
                                        'Try again.')
        return Root.Encrypt(password)
