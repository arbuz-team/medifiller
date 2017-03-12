from django.utils.safestring import mark_safe
from arbuz.templatetags.base import *


class Product_Manager(Base_Tag_Manager):

    @staticmethod
    def Convert_Text_To_URL(text):
        text = text.replace(' ', '_').lower()
        return Dynamic_Base.Convert_Polish_To_Ascii(text)

    def Get_Product_Name(self):
        product = self.values['product']
        language = self.request.session['translator_language']

        name = {
            'EN': product.details_en.name,
            'PL': product.details_pl.name,
            'DE': product.details_de.name,
        }

        if 'to_url' in self.values:
            return self.Convert_Text_To_URL(name[language])

        return name[language]

    def Get_Product_Description(self):
        product = self.values['product']

        description = {
            'EN': product.details_en.description,
            'PL': product.details_pl.description,
            'DE': product.details_de.description,
        }

        language = self.request.session['translator_language']
        selected = description[language]
        return mark_safe(selected.replace('\n', '<br>'))



@register.simple_tag(takes_context=True)
def product_name(context, product):

    task = 'Get_Product_Name'
    request = context['request']
    values = {'product': product}

    return Product_Manager(task, values, request).OUT

@register.simple_tag(takes_context=True)
def product_description(context, product):

    task = 'Get_Product_Description'
    request = context['request']
    values = {'product': product}

    return Product_Manager(task, values, request).OUT

@register.simple_tag(takes_context=True)
def product_name_url(context, product):

    task = 'Get_Product_Name'
    request = context['request']
    values = {
        'product': product,
        'to_url': True
    }

    return Product_Manager(task, values, request).OUT
