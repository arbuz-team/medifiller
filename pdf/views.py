from payment.models import *
from translator.views import *
from weasyprint import HTML


class Generator_PDF(Dynamic_Base):

    @staticmethod
    def Invoice(request, pk):
        payment = Payment.objects.get(pk=pk)
        address = Invoice_Address.objects.get(payment=payment)
        products = Selected_Product.objects.filter(payment=payment)

        generator = Generator_PDF(request) # target="_blank"
        generator.content['invoice'] = {
            'unique':           payment.pk,
            'date':             payment.date,
            # seller
            'client':           address,
            'products':         products,
            # total_vats
            # netto_price
            'brutto_price':     payment.total_price,

        }

        return generator.Generate()

    def Generate(self):

        html = self.Render_HTML('pdf/invoice.html')
        pdf = HTML(string=html.content.decode()).write_png()

        response = HttpResponse(pdf, content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="{0}"'\
            .format(Text(self.request, 130))

        return response

    def __init__(self, request):
        Dynamic_Base.__init__(self, request)
