from arbuz.base import *
from payment.models import *
from weasyprint import HTML


class Generator_PDF(Dynamic_Base):

    def Invoice(self, payment_pk):
        payment = Payment.objects.get(pk=payment_pk)
        address = Invoice_Address.objects.get(payment=payment)
        products = Selected_Product.objects.filter(payment=payment)

        self.content['pdf'] = {
            'unique':           payment.pk,
            'date':             payment.date,
            # seller
            'client':           address,
            'products':         products,
            # total_vats
            # netto_price
            'brutto_price':     payment.total_price,

        }

        return self.Generate()

    def Generate(self):
        html = self.Render_HTML('pdf/invoice.html')
        pdf = HTML(string=html.content.decode()).write_png()
        return HttpResponse(pdf, content_type='application/pdf')

    def __init__(self, request):
        Dynamic_Base.__init__(self, request)