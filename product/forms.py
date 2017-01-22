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
            'keywords',
        )

        widgets = \
        {
            'keywords': forms.TextInput(
                attrs=
                {
                    'placeholder': 'Keywords',
                    'class': 'test',
                }),
        }



class Form_New_Details_EN(forms.ModelForm):

    class Meta:

        model = Details_EN
        fields = \
        {
            'name',
            'description',
        }

        widgets = \
        {
            'name': forms.TextInput(
                attrs=
                {
                    'placeholder': 'Name',
                    'class': 'test',
                    'autofocus': 'true',
                }),

            'description': forms.TextInput(
                attrs=
                {
                    'placeholder': 'Name',
                    'class': 'test',
                    'autofocus': 'true',
                }),
        }



class Form_New_Details_PL(forms.ModelForm):

    class Meta:

        model = Details_PL
        fields = \
        {
            'name',
            'description',
        }

        widgets = \
        {
            'name': forms.TextInput(
                attrs=
                {
                    'placeholder': 'Name',
                    'class': 'test',
                    'autofocus': 'true',
                }),

            'description': forms.TextInput(
                attrs=
                {
                    'placeholder': 'Name',
                    'class': 'test',
                    'autofocus': 'true',
                }),
        }



class Form_New_Details_DE(forms.ModelForm):

    class Meta:

        model = Details_DE
        fields = \
        {
            'name',
            'description',
        }

        widgets = \
        {
            'name': forms.TextInput(
                attrs=
                {
                    'placeholder': 'Name',
                    'class': 'test',
                    'autofocus': 'true',
                }),

            'description': forms.TextInput(
                attrs=
                {
                    'placeholder': 'Name',
                    'class': 'test',
                    'autofocus': 'true',
                }),
        }



class Form_Where_Display(forms.ModelForm):

    class Meta:

        model = Where_Display
        fields = \
        {
            'display_en',
            'display_pl',
            'display_de',
        }



class Form_New_Brand(forms.ModelForm):

    class Meta:

        model = Brand
        fields = \
        {
            'name',
        }

        widgets = \
        {
            'name': forms.TextInput(
                attrs=
                {
                    'placeholder': 'Name',
                    'class': 'test',
                    'autofocus': 'true',
                }),
        }



class Form_New_Purpose(forms.ModelForm):

    class Meta:

        model = Purpose
        fields = \
        {
            'name',
        }

        widgets = \
        {
            'name': forms.TextInput(
                attrs=
                {
                    'placeholder': 'Name',
                    'class': 'test',
                    'autofocus': 'true',
                }),
        }