from arbuz.views import *
from .forms import *


class Product_Details(Dynamic_Event_Menager):

    def Manage_Content(self):
        self.content['product'] = \
            Product.objects.get(pk=self.other_value['pk'])

        return self.Render_HTML('product/details.html')

    @staticmethod
    def Product(request, pk):
        return Product_Details(request, other_value={'pk': pk}).HTML

    @staticmethod
    def Launch(request):
        return Product_Details(request).HTML
