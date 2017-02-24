from arbuz.forms import *
from product.models import *


class Form_Product(Abstract_Model_Form):

    def Clean_Price(self, price, currency):

        if not price:
            return 0

        if price < 0:
            raise forms.ValidationError(
                Text(self.request, 11)
                    .format(currency))

        return int(float(price) * 100) # convert to cents / grosz / pens

    def clean_price_eur(self):
        price = self.cleaned_data['price_eur']
        return self.Clean_Price(price, 'EUR')

    def clean_price_pln(self):
        price = self.cleaned_data['price_pln']
        return self.Clean_Price(price, 'PLN')

    def clean_stock(self):
        stock = self.cleaned_data['stock']
        if not stock:
            return 0

        if stock < 0:
            raise forms.ValidationError(
                Text(self.request, 12))

        return stock

    def clean(self):

        if not self.request.session['product_details_en']:
            raise forms.ValidationError(
                Text(self.request, 13))

        if not self.request.session['product_where_display']:
            raise forms.ValidationError(
                Text(self.request, 14))

        if not self.request.session['product_brand']:
            raise forms.ValidationError(
                Text(self.request, 15))

        if not self.request.session['product_purpose']:
            raise forms.ValidationError(
                Text(self.request, 16))

        if not self.request.session['product_image']:
            raise forms.ValidationError(
                Text(self.request, 17))

    def Set_Widgets(self):

        keywords_attr = {
            'placeholder': Text(self.request, 18),
            'class': 'test',
        }

        price_attr = {
            'step': '0.01'
        }

        self.fields['keywords'].widget = forms.Textarea(attrs=keywords_attr)
        self.fields['price_eur'].widget = forms.NumberInput(attrs=price_attr)
        self.fields['price_pln'].widget = forms.NumberInput(attrs=price_attr)

    class Meta:

        model = Product
        fields = \
        (
            'price_eur',
            'price_pln',
            'keywords',
            'stock',
        )



class Form_Details(Abstract_Model_Form):

    def Set_Widgets(self):

        name_attr = {
            'placeholder': Text(self.request, 19),
            'class': 'test',
            'autofocus': 'true',
        }

        description_attr = {
            'placeholder': Text(self.request, 20),
            'class': 'test',
        }

        self.fields['name'].widget = forms.TextInput(attrs=name_attr)
        self.fields['description'].widget = forms.Textarea(attrs=description_attr)

    class Meta:
        exclude = '__all__'



class Form_Details_EN(Form_Details):

    class Meta(Form_Details.Meta):

        model = Details_EN
        fields = '__all__'



class Form_Details_PL(Form_Details):

    class Meta(Form_Details.Meta):

        model = Details_PL
        fields = '__all__'



class Form_Details_DE(Form_Details):

    class Meta(Form_Details.Meta):

        model = Details_DE
        fields = '__all__'



class Form_Where_Display(Abstract_Model_Form):

    class Meta:

        model = Where_Display
        fields = '__all__'



class Form_Image(Abstract_Form):

    def clean(self):
        url = self.cleaned_data['url']
        image = self.cleaned_data['image_base64']

        if url and image:
            os.remove(BASE_DIR + image)
            raise forms.ValidationError(Text(self.request, 64))

        if not url and not image:
            raise forms.ValidationError(Text(self.request, 65))

        return self.cleaned_data

    def clean_image_base64(self):
        image_base64 = self.cleaned_data['image_base64']

        if image_base64:
            image_base64 = Dynamic_Base.\
                Save_Image_From_Base64(image_base64)

            if not image_base64:
                raise forms.ValidationError(Text(self.request, 66))

        return image_base64

    def clean_url(self):
        image_url = self.cleaned_data['url']

        if image_url:
            image_url = Dynamic_Base.\
                Save_Image_From_URL(image_url)

            if not image_url:
                raise forms.ValidationError(Text(self.request, 67))

        return image_url

    def Create_Fields(self):
        self.fields['image'] = forms.ImageField(required=False)
        self.fields['image_base64'] = forms.CharField(required=False)
        self.fields['url'] = forms.URLField(required=False)

    def Set_Widgets(self):

        image_base64_attr = {
            'hidden': 'true'
        }

        url_attrs = {
            'placeholder': 'Paste image address url'
        }

        self.fields['image_base64'].widget = forms.TextInput(attrs=image_base64_attr)
        self.fields['url'].widget = forms.TextInput(attrs=url_attrs)



class Form_Filter(Abstract_Model_Form):

    def Get_Filter(self):
        new_element = self.data['name']
        selected = self.data['exists']

        if new_element:
            element = self.save(commit=False)
            element.save()
            return element

        if selected:
            model = self.__class__.Meta.model
            element = model.objects.get(pk=selected)
            return element

    def clean(self):
        new_element = self.data['name']
        selected = self.data['exists']

        if not new_element and not selected:
            raise forms.ValidationError(Text(self.request, 21))

        if new_element and selected:
            raise forms.ValidationError(Text(self.request, 22))

    def Set_Widgets(self):

        name_attrs = {
            'placeholder': Text(self.request, 68),
            'class': 'test',
            'autofocus': 'true',
        }

        self.fields['name'] = forms.CharField(required=False)
        self.fields['name'].widget = forms.TextInput(attrs=name_attrs)

    class Meta:
        exclude = '__all__'



class Form_Brand(Form_Filter):

    def Create_Fields(self):
        self.fields['exists'] = forms.ModelChoiceField(
            required=False, queryset=Brand.objects.all())

    class Meta:

        model = Brand
        fields = '__all__'



class Form_Purpose(Form_Filter):

    def Create_Fields(self):
        self.fields['exists'] = forms.ModelChoiceField(
            required=False, queryset=Purpose.objects.all())

    class Meta:

        model = Purpose
        fields = '__all__'