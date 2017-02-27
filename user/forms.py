from arbuz.forms import *
from user.models import *
from nocaptcha_recaptcha.fields import NoReCaptchaField


class Form_Login(Abstract_Form):

    def clean_email(self):
        email = self.data['email']

        if not User.objects.filter(email=email):
            raise forms.ValidationError(Text(self.request, 41))

        if not User.objects.get(email=email).approved:
            raise forms.ValidationError(Text(self.request, 42))

        return email

    def clean_password(self):
        email = self.data['email']
        password = self.data['password']

        if not User.objects.filter(email=email):
            return ''

        user = User.objects.get(email=email)
        if user.password != Dynamic_Base.Encrypt(password):
            raise forms.ValidationError(Text(self.request, 43))

        return Dynamic_Base.Encrypt(password)

    def Create_Fields(self):
        self.fields['email'] = forms.CharField(max_length=50)
        self.fields['password'] = forms.CharField(max_length=100)

    def Set_Widgets(self):

        email_attrs = {
            'placeholder': Text(self.request, 39),
            'class': 'test',
            'autofocus': 'true',
        }

        password_attrs = {
            'placeholder': Text(self.request, 40),
            'class': 'test',
        }

        self.fields['email'].widget = forms.TextInput(attrs=email_attrs)
        self.fields['password'].widget = forms.PasswordInput(attrs=password_attrs)



class Form_Register(Abstract_Model_Form):

    class Meta:

        model = User
        fields = \
        (
            'email',
            'username',
            'password',
        )

    def clean_password(self):
        password = self.data['password']
        return Dynamic_Base.Encrypt(password)

    def Create_Fields(self):
        self.fields['captcha'] = NoReCaptchaField()

    def Set_Widgets(self):

        username_attr = {
            'placeholder': Text(self.request, 44),
            'class': 'test',
        }

        password_attr = {
            'placeholder': Text(self.request, 45),
            'class': 'test',
        }

        email_attr = {
            'placeholder': Text(self.request, 46),
            'class': 'test',
            'autofocus': 'true',
        }

        self.fields['username'].widget = forms.TextInput(attrs=username_attr)
        self.fields['password'].widget = forms.PasswordInput(attrs=password_attr)
        self.fields['email'].widget = forms.TextInput(attrs=email_attr)



class Form_Abstract_Address(Abstract_Model_Form):

    class Meta:
        exclude = '__all__'
        #fields = '__all__'

    def Create_Fields(self):
        self.fields['address_line_2'].required = False

    def Set_Widgets(self):

        full_name_attr = {
            'placeholder': Text(self.request, 47),
            'class': 'test',
            'autofocus': 'true',
        }

        doctor_number_attr = {
            'placeholder': Text(self.request, 63),
            'class': 'test',
        }

        address_line_1_attr = {
            'placeholder': Text(self.request, 48),
            'class': 'test',
        }

        address_line_2_attr = {
            'placeholder': Text(self.request, 49),
        }

        city_attr = {
            'placeholder': Text(self.request, 50),
            'class': 'test',
        }

        region_attr = {
            'placeholder': Text(self.request, 51),
            'class': 'test',
        }

        postcode_attr = {
            'placeholder': Text(self.request, 52),
            'class': 'test',
        }

        country_attr = {
            'placeholder': Text(self.request, 53),
            'class': 'test',
        }

        self.fields['full_name'].widget = forms.TextInput(attrs=full_name_attr)
        self.fields['doctor_number'].widget = forms.TextInput(attrs=doctor_number_attr)
        self.fields['address_line_1'].widget = forms.TextInput(attrs=address_line_1_attr)
        self.fields['address_line_2'].widget = forms.TextInput(attrs=address_line_2_attr)
        self.fields['city'].widget = forms.TextInput(attrs=city_attr)
        self.fields['region'].widget = forms.TextInput(attrs=region_attr)
        self.fields['postcode'].widget = forms.TextInput(attrs=postcode_attr)
        self.fields['country'].widget = forms.TextInput(attrs=country_attr)

    def Exclude_Fields(self):
        if self.request.session['translator_language'] != 'PL':
            del self.fields['doctor_number']



class Form_User_Address(Form_Abstract_Address):

    class Meta(Form_Abstract_Address.Meta):
        model = User_Address
        exclude = ('user', )



class Form_Forgot_Password(Abstract_Form):

    def clean_email(self):
        email = self.data['email']

        if not User.objects.filter(email=email):
            raise forms.ValidationError(Text(self.request, 54))

        if not User.objects.get(email=email).approved:
            raise forms.ValidationError(Text(self.request, 55))

        return email

    def Create_Fields(self):
        self.fields['email'] = forms.CharField(max_length=50)

    def Set_Widgets(self):

        widget_attr = {
            'placeholder': Text(self.request, 56),
            'class': 'test',
            'autofocus': 'true',
        }

        self.fields['email'].widget = forms.TextInput(attrs=widget_attr)



class Form_Change_Password(Abstract_Form):

    def clean_password(self):
        return Dynamic_Base.Encrypt(self.data['password'])

    def Create_Fields(self):
        self.fields['password'] = forms.CharField(max_length=100)

    def Set_Widgets(self):

        password_attr = {
            'placeholder': Text(self.request, 57),
            'class': 'test',
            'autofocus': 'true',
        }

        self.fields['password'].widget = forms.PasswordInput(attrs=password_attr)
