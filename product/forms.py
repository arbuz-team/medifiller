from django import forms
from .models import *


class Form_New_Product(forms.ModelForm):

    class Meta:

        model = Product
        fields = \
        (
            'image',
            'price_eur',
            'price_pln',
        )
