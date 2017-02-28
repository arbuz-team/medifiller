from arbuz.views import *
from payment.forms import *
from payment.base import *
from sender.views import *

from django.views.decorators.csrf import csrf_exempt
from django.contrib.sites.models import Site

from paypal.standard.forms import PayPalPaymentsForm
from paypal.standard.models import ST_PP_COMPLETED
from paypal.standard.ipn.signals import valid_ipn_received
from paypal.standard.ipn.signals import invalid_ipn_received
from requests import post


class Payment_System(Dynamic_Base):

    @staticmethod
    def Send_Confirm(request, payment):

        content = {
            'payment':              payment,
            'selected_products':    Selected_Product.
                objects.filter(payment=payment)
        }

        email = payment.user.email
        Sender(request).Send_Payment_Approved(content, email)



class PayPal(Payment_System):

    @staticmethod
    @csrf_exempt
    def Generate_Mail(request):

        Check_Session(request)
        if request.method == 'POST':
            payment = Payment.objects.get(pk=request.POST['pk'])
            PayPal.Send_Confirm(request, payment)
            return HttpResponse('OK')

        return HttpResponse('It is not for you.')

    @staticmethod
    def Valid_PayPal(sender, **kwargs):
        ipn = sender

        if ipn.payment_status == ST_PP_COMPLETED:
            payment = Payment.objects.get(pk=ipn.custom)

            # check receiver
            if ipn.receiver_email != PAYPAL_RECEIVER_EMAIL:
                return

            # check amount paid
            if str(ipn.mc_gross) != payment.total_price:
                return

            # check currency
            if ipn.mc_currency != payment.currency:
                return

            payment.approved = True
            payment.service = 'PayPal'
            payment.save()

            # redirect to self.Generate_Mail()
            current_site = Site.objects.get_current()
            url = '{0}://{1}/payment/paypal/'.format(PROTOCOL, current_site)
            post(url, data={'pk': 1})

    def Create_PayPal_From(self):

        paypal_dict = \
        {
            'business':         PAYPAL_RECEIVER_EMAIL,
            'item_name':        'sungate',
            'amount':           self.content['total_price'],
            'custom':           self.content['payment'],
            'currency_code':    self.request.session['translator_currency'],

            'notify_url':       self.Get_Urls('paypal-ipn', current_language=True),
            'return':           self.Get_Urls('payment.apply', current_language=True),
            'cancel_return':    self.Get_Urls('payment.cancel', current_language=True),
        }

        return PayPalPaymentsForm(initial=paypal_dict)

valid_ipn_received.connect(PayPal.Valid_PayPal)
invalid_ipn_received.connect(PayPal.Valid_PayPal)



class DotPay(Payment_System):

    @staticmethod
    @csrf_exempt
    def Valid_DotPay(request):

        Check_Session(request)
        if request.method == 'POST':
            if request.POST['operation_status'] == 'completed':
                payment = Payment.objects.get(pk=request.POST['control'])

                if request.POST['id'] != DOTPAY_RECEIVER_ID:
                    return HttpResponse('NOK')

                if request.POST['operation_currency'] != payment.currency:
                    return HttpResponse('NOK')

                if request.POST['operation_amount'] != payment.total_price:
                    return HttpResponse('NOK')

                payment.approved = True
                payment.service = 'DotPay'
                payment.save()

                DotPay.Send_Confirm(request, payment)
                return HttpResponse('OK')

        return HttpResponse('It is not for you.')

    def Create_DotPay_From(self):

        dotpay_dict = \
        {
            'amount':       self.content['total_price'],
            'currency':     self.request.session['translator_currency'],
            'description':  'Opis produktu',
            'control':      self.content['payment'],

            'ch_lock':      0,
            'channel':      0,
            'type':         3,
            'id':           DOTPAY_RECEIVER_ID,
            'lang':         self.request.session['translator_language'].lower(),

            'URL':          self.Get_Urls('payment.apply', current_language=True),
            'URLC':         self.Get_Urls('payment.dotpay', current_language=True),
        }

        return Form_Dotpay(initial=dotpay_dict)



class Payment_Manager(Dynamic_Event_Menager, PayPal, DotPay):

    def Update_Payment(self):

        payment = Payment.objects.get(
            user=self.content['user'], approved=False)

        self.content['payment'] = payment.pk
        payment.date = date.today()
        payment.total_price = self.content['total_price']
        payment.currency = self.request.session['translator_currency']
        payment.save()

    def Load_Payment_Details(self):

        unique = self.request.session['user_unique']
        self.content['user'] = User.objects.get(unique=unique)
        self.content['cart'] = Payment_Models_Menager.Get_Selected_Products(self.request)
        self.content['total_price'] = Payment_Models_Menager.Count_Total_Price(self.request)
        self.content['address'] = User_Address.objects.filter(user=self.content['user'])
        self.Update_Payment()

        self.content['paypal'] = self.Create_PayPal_From()
        self.content['dotpay'] = self.Create_DotPay_From()

    def Create_Address(self, pk, model):

        address = User_Address.objects.get(pk=pk)
        new_address = None

        unique = self.request.session['user_unique']
        user = User.objects.get(unique=unique)
        payment = Payment.objects.get(user=user, approved=False)

        if model == 'payment_address':
            new_address = Payment_Address(payment=payment)

        if model == 'invoice_address':
            new_address = Invoice_Address(payment=payment)

        new_address.full_name = address.full_name
        new_address.address_line_1 = address.address_line_1
        new_address.address_line_2 = address.address_line_2
        new_address.city = address.city
        new_address.region = address.region
        new_address.postcode = address.postcode
        new_address.country = address.country
        new_address.save()

    def Manage_Content_Ground(self):
        self.Load_Payment_Details()
        return self.Render_HTML('payment/payment.html')

    def Manage_Form_Address_Payment(self):

        address_payment_pk = self.request.POST['shipment']
        address_invoice_pk = self.request.POST['invoice']

        self.Create_Address(address_payment_pk, 'payment_address')
        self.Create_Address(address_invoice_pk, 'invoice_address')

        self.Load_Payment_Details()
        return self.Render_HTML('payment/payment.html')

    def Manage_Form(self):

        if self.request.POST['__form__'] == 'payment_address':
            return self.Manage_Form_Address_Payment()

        return Dynamic_Event_Menager.Manage_Form(self)

    @staticmethod
    def Launch(request):
        return Payment_Manager(request, authorization=True).HTML



class Apply_Payment(Dynamic_Event_Menager):

    def Manage_Content_Ground(self):
        return self.Render_HTML('payment/apply.html')

    def Error_No_Event(self):
        return self.Manage_Index()

    @staticmethod
    @csrf_exempt
    def Launch(request):
        return Apply_Payment(request).HTML



class Cancel_Payment(Dynamic_Event_Menager):

    def Manage_Content_Ground(self):
        return self.Render_HTML('payment/cancel.html')

    def Error_No_Event(self):
        return self.Manage_Index()

    @staticmethod
    @csrf_exempt
    def Launch(request):
        return Cancel_Payment(request).HTML



class Buy(Dynamic_Event_Menager):

    def Manage_Content_Ground(self):
        product = Product.objects.get(pk=self.other_value)
        Payment_Models_Menager.Append_Selected_Product(self.request, product)
        return self.Render_HTML('payment/buy.html')

    @staticmethod
    def Buy_Product(request, pk):
        return Buy(request, other_value=pk).HTML

    @staticmethod
    def Launch(request):
        return Buy(request).HTML
