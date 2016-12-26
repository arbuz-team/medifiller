from arbuz.views import *
from .forms import *


class Produkt_Details(Manage_Dynamic_Event):

    def Manage_Content(self):
        return self.Render_HTML('product/details.html')

    @staticmethod
    def Launch_GET(request, pk):
        details = Produkt_Details(request, autostart=False)
        details.pk = pk
        return details.Manage()

    @staticmethod
    def Launch(request):
        return Produkt_Details(request).HTML
