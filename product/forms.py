from django import forms
from .models import *
from arbuz.base import *


class Form_New_Product(forms.ModelForm):

    def clean(self):

        if not self.request.session['product_new_details_en']:
            raise forms.ValidationError(
                'English details is required.')

        if not self.request.session['product_new_where_display']:
            raise forms.ValidationError(
                'Displays is required.')

        if not self.request.session['product_new_brand']:
            raise forms.ValidationError(
                'Brand name is required.')

        if not self.request.session['product_new_purpose']:
            raise forms.ValidationError(
                'Purpose is required.')

        if not self.request.session['product_new_image']:
            raise forms.ValidationError(
                'Product image is required.')

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

    def __init__(self, request=None, *args, **kwargs):
        super(Form_New_Product, self).__init__(*args, **kwargs)
        self.request = request



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

    image_base64 = forms.CharField\
    (
        required=False,
        widget=forms.TextInput(
            attrs=
            {
                'hidden': 'true'
            }),
    )

    url = forms.URLField\
    (
        required=False,
        widget=forms.TextInput(
            attrs=
            {
                'placeholder': 'Paste image address url'
            }),
    )

    def clean(self):
        url = self.cleaned_data['url']
        image = self.cleaned_data['image_base64']

        if url and image:
            os.remove(BASE_DIR + image)
            raise forms.ValidationError(
                'Only one image can save.')

        if not url and not image:
            raise forms.ValidationError(
                'Please select image.')

        return self.cleaned_data

    def clean_image_base64(self):
        image_base64 = self.cleaned_data['image_base64']

        if image_base64:
            image_base64 = Dynamic_Base.\
                Save_Image_From_Base64(image_base64)

            if not image_base64:
                raise forms.ValidationError(
                    'It\'s not image.')

        return image_base64

    def clean_url(self):
        url = self.cleaned_data['url']

        if url:
            plik = BytesIO(urlopen(url).read())

            if not imghdr.what(plik):
                raise forms.ValidationError(
                    'It\'s not image.')

        return url



class Form_New_Brand(forms.ModelForm):

    exists = forms.ModelChoiceField\
    (
        required=False,
        queryset=Brand.objects.all()
    )

    name = forms.ChoiceField\
    (
        required=False,
        widget=forms.TextInput(
            attrs=
            {
                'placeholder': 'Name',
                'class': 'test',
                'autofocus': 'true',
            }),
    )

    def clean(self):
        new_brand = self.data['name']
        select_brand = self.data['exists']

        if not new_brand and not select_brand:
            raise forms.ValidationError(
                'Please select or append brand.')

        if new_brand and select_brand:
            raise forms.ValidationError(
                'Select exist or create new brand. Not both.')

    class Meta:

        model = Brand
        fields = \
        {
            'name',
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