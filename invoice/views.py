from arbuz.base import *
import pdfkit


class PDF_Generator(Dynamic_Base):

    def get_report(self):

        html_name = BASE_DIR + '/_html/' + \
            self.request.session['translator_language'] \
                    + '/invoice/invoice.html'

        pdf = pdfkit.from_file(html_name, False)
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = 'inline;filename=some_file.pdf'
        response.write(pdf)

        return response

    def __init__(self, request):
        Dynamic_Base.__init__(self, request)
