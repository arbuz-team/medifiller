from django import forms
from .models import *


class Form_Login(forms.Form):

    username = forms.CharField\
    (
        widget=forms.TextInput(attrs={'placeholder': 'Username'}),
        max_length=50
    )

    password = forms.CharField\
    (
        widget=forms.PasswordInput(attrs={'placeholder': 'Password'}),
        max_length=100
    )


class Form_Register(forms.ModelForm):

    class Meta:

        model = User
        fields = \
        (
            'username',
            'password',
        )

        widgets = \
        {
            'username': forms.TextInput(
                attrs={'placeholder': 'Username'}),

            'password': forms.PasswordInput(
                attrs={'placeholder': 'Password'}),
        }