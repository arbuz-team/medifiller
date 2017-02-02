from arbuz.views import *
from paypal.standard.forms import PayPalPaymentsForm
from paypal.standard.ipn.signals import valid_ipn_received


class Payment(Dynamic_Event_Menager):

    def Manage_Content_Ground(self):

        # What you want the button to do.
        paypal_dict = {
            'business': '93.endo@gmail.com',
            'amount': '0.00',
            'item_name': 'name of the item',
            #'invoice': 'unique-invoice-id',  # id faktury
            'notify_url': self.Get_Urls('main.start', current_language=True) + reverse('paypal-ipn'),
            'return': self.Get_Urls('BBB', current_language=True), # 'https://www.example.com/your-return-location/',
            'cancel_return': self.Get_Urls('BBB', current_language=True), # 'https://www.example.com/your-cancel-location/',
        }

        # Create the instance.
        self.content['form'] = PayPalPaymentsForm(initial=paypal_dict)
        return self.Render_HTML('payment/payment.html', 'paypal')

    @staticmethod
    def AAA(sender, **kwargs):
        return JsonResponse({'AAA': 'HURRA!'})

    @staticmethod
    def BBB(request):
        return JsonResponse({'BBB': 'HURRA!'})

    @staticmethod
    def Launch(request):
        return Payment(request).HTML


valid_ipn_received.connect(Payment.AAA)