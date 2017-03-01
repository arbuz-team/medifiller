from payment.models import *
from user.models import *
from arbuz.base import *


class Payment_Models_Menager:

    @staticmethod
    def Count_Total_Price(request):
        selected_products = Payment_Models_Menager.\
            Get_Selected_Products(request)

        total = 0
        for selected in selected_products:
            product_price = Dynamic_Base.Get_Price(
                request, selected.product, current_currency=True)

            total += product_price * selected.number

        return format(total / 100, '.2f')

    @staticmethod
    def Update_Total_Price(request):
        unique = request.session['user_unique']
        user = User.objects.get(unique=unique)

        payment = Payment.objects.get(user=user, approved=False)
        payment.total_price = Payment_Models_Menager.Count_Total_Price(request)
        payment.save()

    @staticmethod
    def Check_Payment_Address(user):

        payment = Payment.objects.filter(user=user, approved=False)
        payments_address = Payment_Address.objects.filter(payment=payment)

        if payments_address.count() > 1:
            payments_address.delete()

        if not payments_address:
            Payment_Address(
                full_name='',
                address_line_1='',
                address_line_2='',
                city='',
                region='',
                postcode='',
                country='',
                payment=payment[0]
            ).save()

    @staticmethod
    def Check_Invoice_Address(user):

        payment = Payment.objects.filter(user=user, approved=False)
        invoice_address = Invoice_Address.objects.filter(payment=payment)

        if invoice_address.count() > 1:
            invoice_address.delete()

        if not invoice_address:
            Invoice_Address(
                full_name='',
                address_line_1='',
                address_line_2='',
                city='',
                region='',
                postcode='',
                country='',
                payment=payment[0]
            ).save()

    @staticmethod
    def Check_Payment(request):

        if not request.session['user_unique']:
            return

        unique = request.session['user_unique']
        user = User.objects.get(unique=unique)

        payments = Payment.objects.filter(user=user, approved=False)
        if payments.count() > 1:
            payments.delete()

        if not payments:

            payment = Payment(
                user=user,
                date=date.today(),
                total_price=0,
                service='None',
                currency=request.session['translator_currency']
            )
            payment.save()

        Payment_Models_Menager.Check_Payment_Address(user)
        Payment_Models_Menager.Check_Invoice_Address(user)

    @staticmethod
    def Get_Selected_Products(request):
        unique = request.session['user_unique']
        user = User.objects.get(unique=unique)
        payment = Payment.objects.get(user=user, approved=False)
        return Selected_Product.objects.filter(payment=payment)

    @staticmethod
    def Get_Payment(request):
        Payment_Models_Menager.Check_Payment(request)
        unique = request.session['user_unique']
        user = User.objects.get(unique=unique)
        return Payment.objects.get(user=user, approved=False)

    @staticmethod
    def Append_Selected_Product(request, product, number=1):
        unique = request.session['user_unique']
        user = User.objects.get(unique=unique)
        payment = Payment.objects.get(user=user, approved=False)
        selected_product = Selected_Product.objects.filter(
            payment=payment, product=product)

        # increment number of product
        if selected_product:
            selected_product = selected_product[0]
            selected_product.number += number
            selected_product.save()

        else: # append new product

            Selected_Product(
                payment=payment,
                product=product,
                number=number
            ).save()

    @staticmethod
    def Delete_Selected_Product(request, product):
        unique = request.session['user_unique']
        user = User.objects.get(unique=unique)
        payment = Payment.objects.get(user=user, approved=False)
        selected_product = Selected_Product.objects.get(
            payment=payment, product=product)

        selected_product.delete()

    @staticmethod
    def Clear_Selected_Product(request):
        unique = request.session['user_unique']
        user = User.objects.get(unique=unique)
        payment = Payment.objects.get(user=user, approved=False)
        Selected_Product.objects.filter(payment=payment).delete()
