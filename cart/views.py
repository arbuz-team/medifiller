from arbuz.views import *
from payment.base import *


class Cart_Manager(Dynamic_Event_Menager):

    def Manage_Content_Ground(self):
        pass

    def Manage_Content_Cart(self):

        self.content['payment'] = Payment_Models_Menager.\
            Get_Payment(self.request)

        self.content['cart'] = Payment_Models_Menager.\
            Get_Selected_Products(self.request)

        return self.Render_HTML('cart/cart.html')

    def Manage_Content(self):

        if self.request.POST['__content__'] == 'cart':
            return self.Manage_Content_Cart()

        return Dynamic_Event_Menager.Manage_Content(self)

    def Manage_Button_Append(self):
        product = Product.objects.get(pk=self.request.POST['value'])
        Payment_Models_Menager.Append_Selected_Product(self.request, product)
        return JsonResponse({'__button__': 'true'})

    def Manage_Button_Delete(self):
        product = Product.objects.get(pk=self.request.POST['value'])
        Payment_Models_Menager.Delete_Selected_Product(self.request, product)
        return JsonResponse({'__button__': 'true'})

    def Manage_Button_Clear(self):
        Payment_Models_Menager.Clear_Selected_Product(self.request)
        return JsonResponse({'__button__': 'true'})

    def Manage_Button(self):
        return_value = None

        if self.request.POST['__button__'] == 'append':
            return_value = self.Manage_Button_Append()

        if self.request.POST['__button__'] == 'delete':
            return_value = self.Manage_Button_Delete()

        if self.request.POST['__button__'] == 'clear':
            return_value = self.Manage_Button_Clear()

        Payment_Models_Menager.Update_Total_Price(self.request)
        return return_value

    def Manage_Edit(self):

        pk = self.request.POST['__edit__']
        number = self.request.POST['value']

        product = Product.objects.get(pk=pk)
        Payment_Models_Menager.Edit_Number_Of_Products(
            self.request, product, number)

        return JsonResponse({'__button__': 'true'})

    def Manage(self):

        if '__edit__' in self.request.POST:
            return self.Manage_Edit()

        return Dynamic_Event_Menager.Manage(self)

    @staticmethod
    def Launch(request):
        return Cart_Manager(request, authorization=True).HTML
