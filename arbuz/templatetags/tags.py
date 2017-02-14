from django import template
register = template.Library()

@register.filter('fieldtype')
def fieldtype(field):
    return field.field.widget.__class__.__name__

@register.filter('to_money')
def to_money(value):
    return format(value / 100, '.2f')

@register.filter('get_price')
def get_price(product, currency):

    prices = {
        'EUR': product.price_eur,
        'PLN': product.price_pln,
        'GBP': product.price_gbp,
        'USD': product.price_usd
    }

    price = str(to_money(prices[currency]))
    return '{0} {1}'.format(price, currency)
