from django import forms


class Form_Dotpay(forms.Form):

    # payment details
    amount = forms.CharField(widget=forms.HiddenInput())
    currency = forms.CharField(widget=forms.HiddenInput())
    description = forms.CharField(widget=forms.HiddenInput())

    # user details
    control = forms.CharField(widget=forms.HiddenInput())

    # static value
    ch_lock = forms.CharField(widget=forms.HiddenInput())
    channel = forms.CharField(widget=forms.HiddenInput())
    type = forms.CharField(widget=forms.HiddenInput())
    id = forms.CharField(widget=forms.HiddenInput())
    lang = forms.CharField(widget=forms.HiddenInput())

    # URLS
    URL = forms.CharField(widget=forms.HiddenInput())
    URLC = forms.CharField(widget=forms.HiddenInput())

# Details about dotpay POST
# Page: 8/44
# https://ssl.dotpay.pl/s2/login/cloudfs1/magellan_media/common_file/dotpay_instrukcja_techniczna_implementacji_platnosci.pdf


