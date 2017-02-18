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
    def Check_Payment(request):

        if not request.session['user_unique']:
            return

        unique = request.session['user_unique']
        user = User.objects.get(unique=unique)

        if not Payment.objects.filter(user=user, approved=False):

            Payment(
                user=user,
                total_price=0,
                service='None',
                currency=request.session['translator_currency'],
                language=request.session['translator_language']
            ).save()

    @staticmethod
    def Get_Selected_Products(request):
        unique = request.session['user_unique']
        user = User.objects.get(unique=unique)
        payment = Payment.objects.get(user=user, approved=False)
        return Selected_Product.objects.filter(payment=payment)

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
        selected_product = Selected_Product.objects.filter(payment=payment)

        for selected in selected_product:
            selected.delete()
