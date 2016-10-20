from django import forms
from .models import *


class Formularz_Logowania(forms.Form):

    login = forms.CharField(max_length=50)
    haslo = forms.CharField(max_length=100)


class Formularz_Rejestracji(forms.ModelForm):

    powtorz_haslo = forms.CharField(max_length=100)

    class Meta:
        model = Uzytkownik
        fields = \
        (
            'login',
            'haslo',
            'powtorz_haslo',
        )