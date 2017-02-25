from arbuz.forms import *
from nocaptcha_recaptcha.fields import NoReCaptchaField


class Form_Email_Contact(Abstract_Form):

    def Create_Fields(self):
        self.fields['title'] = forms.CharField(max_length=100)
        self.fields['client'] = forms.CharField(max_length=50)
        self.fields['email'] = forms.EmailField(max_length=50)
        self.fields['product'] = forms.CharField(max_length=50, required=False)
        self.fields['url'] = forms.URLField(required=False)
        self.fields['message'] = forms.CharField(max_length=2000)
        self.fields['captcha'] = NoReCaptchaField()

    def Set_Widgets(self):

        title_attr = {
            'placeholder': Text(self.request, 71),
            'class': 'test',
            'hidden': 'true',
        }

        client_attr = {
            'placeholder': Text(self.request, 72),
            'class': 'test',
        }

        email_attr = {
            'placeholder': Text(self.request, 73),
            'class': 'test',
        }

        message_attr = {
            'placeholder': Text(self.request, 74),
            'class': 'test',
        }

        self.fields['title'].widget = forms.TextInput(attrs=title_attr)
        self.fields['client'].widget = forms.TextInput(attrs=client_attr)
        self.fields['email'].widget = forms.EmailInput(attrs=email_attr)
        self.fields['message'].widget = forms.Textarea(attrs=message_attr)

    def Convert_To_Product_Availability(self):

        product_attr = {
            'placeholder': Text(self.request, 75),
            'class': 'test',
        }

        url_attr = {
            'placeholder': Text(self.request, 76),
            'class': 'test',
            'hidden': 'true',
        }

        self.fields['product'].widget = forms.TextInput(attrs=product_attr)
        self.fields['url'].widget = forms.URLInput(attrs=url_attr)

    def Convert_To_Comments_On_Website(self):

        product_attr = {
            'placeholder': Text(self.request, 77),
            'class': 'test',
            'hidden': 'true',
        }

        url_attr = {
            'placeholder': Text(self.request, 78),
            'class': 'test',
        }

        self.fields['product'].widget = forms.TextInput(attrs=product_attr)
        self.fields['url'].widget = forms.URLInput(attrs=url_attr)

    def Convert_To_Other_Message(self):

        product_attr = {
            'placeholder': Text(self.request, 79),
            'class': 'test',
            'hidden': 'true',
        }

        url_attr = {
            'placeholder': Text(self.request, 80),
            'class': 'test',
            'hidden': 'true',
        }

        self.fields['product'].widget = forms.TextInput(attrs=product_attr)
        self.fields['url'].widget = forms.URLInput(attrs=url_attr)
