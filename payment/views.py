from arbuz.views import *
from cart.models import *
from django.views.decorators.csrf import csrf_exempt
from paypal.standard.forms import PayPalPaymentsForm
from paypal.standard.models import ST_PP_COMPLETED
from paypal.standard.ipn.signals import valid_ipn_received


class Payment(Dynamic_Event_Menager):

    def Manage_Content_Ground(self):

        user = User.objects.get(unique=self.request.session['user_unique'])
        self.content['cart'] = Cart.objects.filter(user=user)

        self.content['suma'] = 0
        for in_cart in self.content['cart']:
            self.content['suma'] += in_cart.product.price_eur


        # What you want the button to do.
        paypal_dict = {
            'business': '93.endo-facilitator@gmail.com',
            'amount': self.content['suma'],
            'item_name': 'sungate',
            #'invoice': 'unique-invoice-id',  # id faktury
            'notify_url': self.Get_Urls('main.start', current_language=True) + reverse('paypal-ipn'),
            'return': self.Get_Urls('payment.apply_payment', current_language=True),
            'cancel_return': self.Get_Urls('payment.cancel_payment', current_language=True),
            'custom': user.unique,
        }

        # Create the instance.
        self.content['form'] = PayPalPaymentsForm(initial=paypal_dict)
        return self.Render_HTML('payment/payment.html', 'paypal')

    @staticmethod
    def Valid_PayPal(sender, **kwargs):
        ipn = sender

        if ipn.payment_status == ST_PP_COMPLETED:
            # WARNING !
            # Check that the receiver email is the same we previously
            # set on the business field request. (The user could tamper
            # with those fields on payment form before send it to PayPal)
            if ipn.receiver_email != '93.endo-facilitator@gmail.com':
                return

            # ALSO: for the same reason, you need to check the amount
            # received etc. are all what you expect.

            # Undertake some action depending upon `ipn_obj`.
            if ipn.custom:
                user = User.objects.get(unique=ipn.custom)
                cart = Cart.objects.filter(user=user)

                for in_cart in cart:
                    in_cart.approved = True
                    in_cart.save()

    @staticmethod
    @csrf_exempt
    def Apply_Payment(request):
        return JsonResponse({'BBB': 'HURRA!'})

    @staticmethod
    @csrf_exempt
    def Cancel_Payment(request):
        return JsonResponse({'BBB': 'HURRA!'})

    @staticmethod
    def Launch(request):
        return Payment(request, authorization=True).HTML


valid_ipn_received.connect(Payment.Valid_PayPal)