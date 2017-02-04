from arbuz.views import *
from cart.models import *
from payment.models import *
from django.views.decorators.csrf import csrf_exempt
from paypal.standard.forms import PayPalPaymentsForm
from paypal.standard.models import ST_PP_COMPLETED
from paypal.standard.ipn.signals import valid_ipn_received, invalid_ipn_received
from arbuz.settings import PAYPAL_RECEIVER_EMAIL


class PayPal(Dynamic_Base):

    @staticmethod
    def Valid_PayPal(sender, **kwargs):
        ipn = sender

        if ipn.payment_status == ST_PP_COMPLETED:

            # check receiver
            if ipn.receiver_email != PAYPAL_RECEIVER_EMAIL:
                return

            user = User.objects.get(unique=ipn.custom)
            cart = Cart.objects.filter(user=user)

            # check amount paid
            if int(ipn.payment_gross) != Payment.Get_Total_Price(user):
                return

            for in_cart in cart:
                in_cart.approved = True
                in_cart.save()

    def Create_PayPal_From(self):

        paypal_dict = \
        {
            'business':         PAYPAL_RECEIVER_EMAIL,
            'item_name':        'sungate',
            'amount':           self.content['total_price'],
            'custom':           self.content['user'].unique,
            # 'invoice':        'unique-invoice-id',  # id faktury

            'notify_url':       self.Get_Urls('paypal-ipn', current_language=True),
            'return':           self.Get_Urls('payment.apply', current_language=True),
            'cancel_return':    self.Get_Urls('payment.cancel', current_language=True),
        }

        return PayPalPaymentsForm(initial=paypal_dict)

valid_ipn_received.connect(PayPal.Valid_PayPal)
invalid_ipn_received.connect(PayPal.Valid_PayPal)



# Create your views here.
from django.views.generic import CreateView
from django.views.generic.detail import DetailView
from getpaid.forms import PaymentMethodForm
from payment.forms import OrderForm
from payment.models import Order


class HomeView(CreateView):
    model = Order
    template_name = 'home.html'
    form_class = OrderForm

    def get_context_data(self, **kwargs):
        context = super(HomeView, self).get_context_data(**kwargs)
        context['orders'] = Order.objects.all()
        return context


class OrderView(DetailView):
    model = Order

    def get_context_data(self, **kwargs):
        context = super(OrderView, self).get_context_data(**kwargs)
        context['payment_form'] = PaymentMethodForm(
            self.object.currency,
            initial={'order': self.object}
        )
        return context


class DotPay(Dynamic_Base):

    @staticmethod
    def Valid_DotPay(sender, **kwargs):
        pass

    def Create_DotPay_From(self):
        pass



class Payment(Dynamic_Event_Menager, PayPal, DotPay):

    @staticmethod
    def Get_Total_Price(user, currency='eur'):
        cart = Cart.objects.filter(user=user)
        total = 0

        for in_cart in cart:

            if currency == 'eur':
                total += in_cart.product.price_eur

            if currency == 'pln':
                total += in_cart.product.price_pln

        return total

    def Manage_Content_Ground(self):

        self.content['user'] = User.objects.get(unique=self.request.session['user_unique'])
        self.content['cart'] = Cart.objects.filter(user=self.content['user'])
        self.content['total_price'] = Payment.Get_Total_Price(self.content['user'])

        self.content['paypal'] = self.Create_PayPal_From()
        self.content['getpaid'] = OrderForm()
        return self.Render_HTML('payment/payment.html')

    @staticmethod
    def Launch(request):
        return Payment(request, authorization=True).HTML



class Apply_Payment(Dynamic_Event_Menager):

    def Manage_Content_Ground(self):
        return self.Render_HTML('payment/apply.html')

    @staticmethod
    @csrf_exempt
    def Launch(request):
        return Apply_Payment(request).HTML



class Cancel_Payment(Dynamic_Event_Menager):

    def Manage_Content_Ground(self):
        return self.Render_HTML('payment/cancel.html')

    @staticmethod
    @csrf_exempt
    def Launch(request):
        return Cancel_Payment(request).HTML