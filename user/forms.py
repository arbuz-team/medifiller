from django import forms
from .models import *
from nocaptcha_recaptcha.fields import NoReCaptchaField


class Form_Login(forms.Form):

    email = forms.CharField\
    (
        widget=forms.TextInput(
            attrs=
            {
                'placeholder': 'Email',
                'class': 'test',
            }),
        max_length=50
    )

    password = forms.CharField\
    (
        widget=forms.PasswordInput(
            attrs=
            {
                'placeholder': 'Password',
                'class': 'test',
            }),
        max_length=100
    )

    def clean_email(self):
        email = self.cleaned_data['email']

        if not User.objects.filter(email=email):
            raise forms.ValidationError('User with this email '
                                        'does not exist.')

        if not User.objects.get(email=email).approved:
            raise forms.ValidationError('User with this email '
                                        'is not approved.')

        return email

    def clean_password(self):
        email = self.data['email']
        password = self.cleaned_data['password']

        if not User.objects.filter(email=email):
            return ''

        user = User.objects.get(email=email)
        if user.password != User.Encrypt(password):
            raise forms.ValidationError('Wrong password. '
                                        'Try again.')

        return User.Encrypt(password)



class Form_Register(forms.ModelForm):

    captcha = NoReCaptchaField()

    class Meta:

        model = User
        fields = \
        (
            'email',
            'username',
            'password',
        )

        widgets = \
        {
            'username': forms.TextInput(
                attrs=
                {
                    'placeholder': 'Username',
                    'class': 'test',
                }),

            'password': forms.PasswordInput(
                attrs=
                {
                    'placeholder': 'Password',
                    'class': 'test',
                }),

            'email': forms.TextInput(
                attrs=
                {
                    'placeholder': 'Email',
                    'class': 'test',
                }),
        }

    def clean_password(self):
        password = self.cleaned_data['password']
        return User.Encrypt(password)



class Form_User_Address(forms.ModelForm):

    def __init__(self, *args, **kwargs):
        super(Form_User_Address, self).__init__(*args, **kwargs)
        self.fields['address_line_2'].required = False

    class Meta:

        model = User_Address
        fields = \
        (
            'full_name',
            'address_line_1',
            'address_line_2',
            'city',
            'region',
            'postcode',
            'country',
        )

        widgets = \
        {
            'full_name': forms.TextInput(
                attrs=
                {
                    'placeholder': 'Full Name',
                    'class': 'test',
                }),

            'address_line_1': forms.TextInput(
                attrs=
                {
                    'placeholder': 'Address Line 1',
                    'class': 'test',
                }),

            'address_line_2': forms.TextInput(
                attrs=
                {
                    'placeholder': 'Address Line 2',
                }),

            'city': forms.TextInput(
                attrs=
                {
                    'placeholder': 'City',
                    'class': 'test',
                }),

            'region': forms.TextInput(
                attrs=
                {
                    'placeholder': 'State / Province / Region',
                    'class': 'test',
                }),

            'postcode': forms.TextInput(
                attrs=
                {
                    'placeholder': 'ZIP / Postal Code',
                    'class': 'test',
                }),

            'country': forms.TextInput(
                attrs=
                {
                    'placeholder': 'Country',
                    'class': 'test',
                }),
        }



class Form_Change_Password(forms.Form):

    password = forms.CharField\
    (
        widget=forms.PasswordInput(
            attrs=
            {
                'placeholder': 'Password',
                'class': 'test',
            }),
        max_length=100
    )

    def clean_password(self):
        return User.Encrypt(self.cleaned_data['password'])