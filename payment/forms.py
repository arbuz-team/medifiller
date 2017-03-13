from django import forms


class Form_Dotpay(forms.Form):

    # payment details
    amount = forms.CharField(widget=forms.HiddenInput())
    currency = forms.CharField(widget=forms.HiddenInput())
    description = forms.CharField(widget=forms.HiddenInput())

    # user details
    id = forms.CharField(widget=forms.HiddenInput())
    control = forms.CharField(widget=forms.HiddenInput())

    # service details
    ch_lock = forms.CharField(widget=forms.HiddenInput())
    channel = forms.CharField(widget=forms.HiddenInput())
    type = forms.CharField(widget=forms.HiddenInput())
    lang = forms.CharField(widget=forms.HiddenInput())

    # URLS
    URL = forms.CharField(widget=forms.HiddenInput())
    URLC = forms.CharField(widget=forms.HiddenInput())

# Details about dotpay POST
# Page: 8/44
# https://ssl.dotpay.pl/s2/login/cloudfs1/magellan_media/common_file/dotpay_instrukcja_techniczna_implementacji_platnosci.pdf



class Form_PayPal(forms.Form):

    # payment details
    amount = forms.CharField(widget=forms.HiddenInput())
    currency_code = forms.CharField(widget=forms.HiddenInput())
    item_name = forms.CharField(widget=forms.HiddenInput())

    # user details
    business = forms.CharField(widget=forms.HiddenInput())
    custom = forms.CharField(widget=forms.HiddenInput())

    # service details
    cmd = forms.ChoiceField(widget=forms.HiddenInput(), initial='_xclick')
    charset = forms.CharField(widget=forms.HiddenInput(), initial='utf-8')
    no_shipping = forms.ChoiceField(widget=forms.HiddenInput(), initial='1')

    # URLS
    notify_url = forms.CharField(widget=forms.HiddenInput())
    cancel_return = forms.CharField(widget=forms.HiddenInput())
    return_url = forms.CharField(widget=forms.HiddenInput(attrs={'name': 'return'}))

