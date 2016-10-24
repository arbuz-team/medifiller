from django import forms
from .models import *


class Formularz_Logowania(forms.Form):

    login = forms.CharField\
    (
        widget=forms.TextInput(attrs={'placeholder': 'Login'}),
        max_length=50
    )

    haslo = forms.CharField\
    (
        widget=forms.PasswordInput(attrs={'placeholder': 'Hasło'}),
        max_length=100
    )


class Formularz_Rejestracji(forms.ModelForm):

    powtorz_haslo = forms.CharField\
    (
        widget=forms.PasswordInput(attrs={'placeholder': 'Powtórz hasło'}),
        max_length=100
    )

    class Meta:

        model = Uzytkownik
        fields = \
        (
            'login',
            'haslo',
            'powtorz_haslo',
        )

        widgets = \
        {
            'login': forms.TextInput(
                attrs={'placeholder': 'Login'}),

            'haslo': forms.PasswordInput(
                attrs={'placeholder': 'Hasło'}),
        }