from arbuz.templatetags.base import *


class Finance_Manager(Base_Tag_Manager):

    def Get_Product_Price(self):
        product = self.values['product']
        currency = self.values['currency']

        if not currency:

            currency = self.request.session['translator_currency']
            selected_price = self.Get_Price(
                self.request, product, current_currency=True)

        else:

            selected_price = self.Get_Price(
                self.request, product, currency=currency)

        selected_price = '{0:.2f}'.format(selected_price)
        return '{0} {1}'.format(selected_price, currency)

    def Get_Netto_Value(self):
        price = self.values['price']
        product = self.values['product']
        rate = self.values['rate']

        if product:
            price = self.Get_Price(
                self.request, product, current_currency=True)

        return format((price * 100) / (100 + rate), '.2f')

    def Get_Brutto_Value(self):
        price = self.values['price']
        rate = self.values['rate']
        return format(price * (100 + rate) / 100, '.2f')

    def Get_VAT_Value(self):
        price = self.values['price']
        rate = self.values['rate']
        variant = self.values['variant']

        vats = {
            'netto': format(price * rate / 100, '.2f'),
            'brutto': format(price * rate / 100, '.2f')
        }

        return vats[variant]



@register.simple_tag(takes_context=True)
def get_price(context, product, currency=None):

    task = 'Get_Product_Price'
    request = context['request']
    values = {
        'product': product,
        'currency': currency
    }

    return Finance_Manager(task, values, request).OUT

@register.simple_tag(takes_context=True)
def netto(context, price=None, product=None, rate=8):

    task = 'Get_Netto_Value'
    request = context['request']
    values = {
        'price': price,
        'product': product,
        'rate': rate
    }

    return Finance_Manager(task, values, request).OUT

@register.simple_tag
def brutto(price, rate):

    task = 'Get_Brutto_Value'
    values = {
        'price': price,
        'rate': rate
    }

    return Finance_Manager(task, values).OUT

@register.simple_tag
def vat(price, rate, variant='netto'):

    task = 'Get_VAT_Value'
    values = {
        'price': price,
        'rate': rate,
        'variant': variant
    }

    return Finance_Manager(task, values).OUT
