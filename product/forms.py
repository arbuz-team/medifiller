from django import forms
from .models import *
from io import StringIO
import imghdr


class Form_New_Product(forms.ModelForm):

    class Meta:

        model = Product
        fields = \
        (
            'price_eur',
            'price_pln',
            'keywords',
        )

        widgets = \
        {
            'keywords': forms.Textarea(
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

            'description': forms.Textarea(
                attrs=
                {
                    'placeholder': 'Description',
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

            'description': forms.Textarea(
                attrs=
                {
                    'placeholder': 'Description',
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

            'description': forms.Textarea(
                attrs=
                {
                    'placeholder': 'Description',
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



class Form_Image(forms.Form):

    image = forms.ImageField(required=False)
    url = forms.URLField\
    (
        required=False,
        widget=forms.TextInput(
            attrs=
            {
                'placeholder': 'Paste image address url'
            }),
    )

    def clean_image(self):
        url = self.data['url']
        image = self.cleaned_data['image']

        if url and image:
            raise forms.ValidationError(
                'Only one image can save.')

        if not url and not image:
            raise forms.ValidationError(
                'Please select image.')

        return image

    def clean_url(self):
        url = self.cleaned_data['url']

        if url:
            plik = StringIO(urlopen(url).read())

            if not imghdr.what(plik):
                raise forms.ValidationError(
                    'It\'s not image.')

        return url



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