from arbuz.views import *
from cart.models import *
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
            'item_name': 'name of the item',
            #'invoice': 'unique-invoice-id',  # id faktury
            'notify_url': self.Get_Urls('main.start', current_language=True) + reverse('paypal-ipn'),
            'return': self.Get_Urls('BBB', current_language=True), # 'https://www.example.com/your-return-location/',
            'cancel_return': self.Get_Urls('BBB', current_language=True), # 'https://www.example.com/your-cancel-location/',
            'custom': user.unique,
        }

        # Create the instance.
        self.content['form'] = PayPalPaymentsForm(initial=paypal_dict)
        return self.Render_HTML('payment/payment.html', 'paypal')

    @staticmethod
    def AAA(sender, **kwargs):
        ipn_obj = sender
        if ipn_obj.payment_status == ST_PP_COMPLETED:
            # WARNING !
            # Check that the receiver email is the same we previously
            # set on the business field request. (The user could tamper
            # with those fields on payment form before send it to PayPal)
            if ipn_obj.receiver_email != "receiver_email@example.com":
                # Not a valid payment
                return

            # ALSO: for the same reason, you need to check the amount
            # received etc. are all what you expect.

            # Undertake some action depending upon `ipn_obj`.
            if ipn_obj.custom == "Upgrade all users!":
                pass#Users.objects.update(paid=True)

    @staticmethod
    def BBB(request):
        return JsonResponse({'BBB': 'HURRA!'})

    @staticmethod
    def Launch(request):
        return Payment(request, authorization=True).HTML


valid_ipn_received.connect(Payment.AAA)