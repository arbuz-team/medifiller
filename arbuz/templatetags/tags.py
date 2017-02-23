from arbuz.base import *
from django import template
from base64 import b64encode

register = template.Library()

@register.filter('fieldtype')
def fieldtype(field):
    return field.field.widget.__class__.__name__

@register.filter('to_money')
def to_money(value):
    return format(value / 100, '.2f')

@register.filter('to_url')
def to_url(text):
    text = text.replace(' ', '_')
    text = text.lower()
    text = Dynamic_Base.Convert_Polish_To_Ascii(text)
    return text

@register.simple_tag(takes_context=True)
def price(context, product):

    prices = {
        'EUR': product.price_eur,
        'PLN': product.price_pln,
    }

    request = context['request']
    currency = request.session['translator_currency']
    selected_price = str(to_money(prices[currency]))
    return '{0} {1}'.format(selected_price, currency)

@register.simple_tag
def price_currency(product, currency):

    prices = {
        'EUR': product.price_eur,
        'PLN': product.price_pln,
    }

    selected_price = str(to_money(prices[currency]))
    return '{0} {1}'.format(selected_price, currency)

@register.simple_tag(takes_context=True)
def url(context, name):

    urls = {
        'EN': reverse(name, urlconf='arbuz.urls.en'),
        'PL': reverse(name, urlconf='arbuz.urls.pl'),
        # 'DE': reverse(name, urlconf='arbuz.urls.de'),
    }

    request = context['request']
    language = request.session['translator_language']
    return urls[language]

@register.simple_tag(takes_context=True)
def sign_in_redirect(context, name, *args, **kwargs):

    urls = {
        'EN': reverse(name, urlconf='arbuz.urls.en', kwargs=kwargs),
        'PL': reverse(name, urlconf='arbuz.urls.pl', kwargs=kwargs),
        # 'DE': reverse(name, urlconf='arbuz.urls.de', kwargs=kwargs),
    }

    request = context['request']
    language = request.session['translator_language']
    selected_url = b64encode(bytes(urls[language], 'utf-8'))
    selected_url = selected_url.decode('utf-8')
    return '/user/sign_in/redirect/{0}/'.format(selected_url)
