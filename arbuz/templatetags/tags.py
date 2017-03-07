from django.utils.safestring import mark_safe
from translator.views import *
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
def url(context, name=None, full=False, *args, **kwargs):
    request = context['request']

    if full:
        return Dynamic_Base(request).\
            Get_Urls(name, kwargs, current_language=True)

    if not full:
        return Dynamic_Base(request).\
            Get_Path(name, kwargs, current_language=True)

    return None

@register.simple_tag(takes_context=True)
def sign_in_redirect(context, app, name=None, *args, **kwargs):
    request = context['request']

    redirect = Dynamic_Base(request).\
        Get_Path(name, kwargs, current_language=True)

    redirect_url = b64encode(bytes(redirect, 'utf-8'))
    redirect_url = redirect_url.decode('utf-8')
    return '/{0}/sign_in/redirect/{1}/'.format(app, redirect_url)

@register.simple_tag
def dict_value(my_dict, value):
    return my_dict[value]

@register.simple_tag(takes_context=True)
def text(context, pk, language=None):
    return Text(context['request'], pk, language)

@register.simple_tag(takes_context=True, name='product_name')
def product_name(context, product):

    name = {
        'EN': product.details_en.name,
        'PL': product.details_pl.name,
        'DE': product.details_de.name,
    }

    request = context['request']
    language = request.session['translator_language']
    return name[language]

@register.simple_tag(takes_context=True)
def product_name_url(context, product):
    name = product_name(context, product)
    return to_url(name)

@register.simple_tag(takes_context=True)
def product_description(context, product):

    description = {
        'EN': product.details_en.description,
        'PL': product.details_pl.description,
        'DE': product.details_de.description,
    }

    request = context['request']
    language = request.session['translator_language']
    return mark_safe(to_html(description[language]))

@register.simple_tag(takes_context=True)
def get_app_name(context):
    request = context['request']
    app_name = request.session['arbuz_app']
    pk = Language_EN.objects.get(value=app_name).pk
    return Text(request, pk).replace('.', ' ').title()

def to_html(text):
    return text.replace('\n', '<br>')

