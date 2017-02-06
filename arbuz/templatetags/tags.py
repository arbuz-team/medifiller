from django import template
register = template.Library()

@register.filter('fieldtype')
def fieldtype(field):
    return field.field.widget.__class__.__name__

@register.filter('to_money')
def to_money(value):
    return format(value / 100, '.2f')