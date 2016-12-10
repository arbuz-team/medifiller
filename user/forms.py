from django import forms
from .models import *


class Form_Login(forms.Form):

    email = forms.CharField\
    (
        widget=forms.TextInput(
            attrs=
            {
                'placeholder': 'Email',
                'data-test': 'yes',
            }),
        max_length=50
    )

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
            raise forms.ValidationError('User with this email '
                                        'does not exist.')

        user = User.objects.get(email=email)
        if user.password != User.Encrypt(password):
            raise forms.ValidationError('Wrong password. '
                                        'Try again.')

        return User.Encrypt(password)



class Form_Register(forms.ModelForm):

    class Meta:

        model = User
        fields = \
        (
            'username',
            'password',
            'email',
        )

        widgets = \
        {
            'username': forms.TextInput(
                attrs=
                {
                    'placeholder': 'Username',
                    'data-test': 'yes',
                }),

            'password': forms.PasswordInput(
                attrs=
                {
                    'placeholder': 'Password',
                    'data-test': 'yes',
                }),

            'email': forms.TextInput(
                attrs=
                {
                    'placeholder': 'Email',
                    'data-test': 'yes',
                }),
        }

    def clean_password(self):
        password = self.cleaned_data['password']
        return User.Encrypt(password)



class Form_User_Address(forms.ModelForm):

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
            'full_name': forms.PasswordInput(
                attrs=
                {
                    'placeholder': 'Full Name',
                    'data-test': 'yes',
                }),

            'address_line_1': forms.PasswordInput(
                attrs=
                {
                    'placeholder': 'Address Line 1',
                    'data-test': 'yes',
                }),

            'address_line_2': forms.PasswordInput(
                attrs=
                {
                    'placeholder': 'Address Line 2',
                    'data-test': 'yes',
                }),

            'city': forms.PasswordInput(
                attrs=
                {
                    'placeholder': 'City',
                    'data-test': 'yes',
                }),

            'region': forms.PasswordInput(
                attrs=
                {
                    'placeholder': 'State / Province / Region',
                    'data-test': 'yes',
                }),

            'postcode': forms.PasswordInput(
                attrs=
                {
                    'placeholder': 'ZIP / Postal Code',
                    'data-test': 'yes',
                }),

            'country': forms.PasswordInput(
                attrs=
                {
                    'placeholder': 'Country',
                    'data-test': 'yes',
                }),
        }
