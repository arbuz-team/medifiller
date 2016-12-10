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

    def clean_username(self):
        username = self.cleaned_data['username']

        if No_Approved_User.objects.filter(user__username=username):
            raise forms.ValidationError('User with username '
                                        'does not exist.')

        if not User.objects.filter(username=username):
            raise forms.ValidationError('User with username '
                                        'does not exist.')
        return username

    def clean_password(self):
        username = self.data['username']
        password = self.cleaned_data['password']
        user = User.objects.get(username=username)

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
        )

        widgets = \
        {
            'username': forms.TextInput(
                attrs={'placeholder': 'Username'}),

            'password': forms.PasswordInput(
                attrs={'placeholder': 'Password'}),
        }

    def clean_password(self):
        password = self.cleaned_data['password']
        return User.Encrypt(password)