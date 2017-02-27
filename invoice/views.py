from arbuz.base import *
from payment.models import *
import pdfkit


class PDF_Generator(Dynamic_Base):

    def Invoice(self, payment_pk):
        payment = Payment.objects.get(pk=payment_pk)
        address = Invoice_Address.objects.get(payment=payment)
        products = Selected_Product.objects.filter(payment=payment)

        self.content['invoice'] = {
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
        html = self.Render_HTML('invoice/invoice.html')
        pdf = pdfkit.from_string(html.content.decode(), False)
        return HttpResponse(pdf, content_type='application/pdf')

    def __init__(self, request):
        Dynamic_Base.__init__(self, request)
