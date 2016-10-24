from django import forms
from .models import *


class Formularz_Produkt(forms.ModelForm):

    class Meta:

        model = Produkt
        fields = \
        (
            'nazwa',
            'opis',
            'cena',
            'zdjecie',
        )

        widgets = \
        {
            'nazwa': forms.TextInput(
                attrs={'placeholder': 'Wpisz nazwę'}),

            'opis': forms.Textarea(
                attrs={'placeholder': 'Wpisz opis',
                       'rows': 'none', 'cols': 'none'}),

            'cena': forms.IntegerField(
                attrs={'placeholder': 'Wpisz cenę'}),
        }