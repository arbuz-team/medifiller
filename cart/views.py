from arbuz.views import *
from payment.base import *


class Cart_Manager(Dynamic_Event_Menager):

    def Manage_Content_Ground(self):
        pass

    def Manage_Content_Cart(self):
        self.content['cart'] = Payment_Models_Menager.\
            Get_Selected_Products(self.request)

        return self.Render_HTML('cart/cart.html')

    def Manage_Content(self):

        if self.request.POST['__content__'] == 'cart':
            return self.Manage_Content_Cart()

        return super(Cart_Manager, self).Manage_Content()

    def Manage_Button_Append(self):
        product = Product.objects.get(pk=self.request.POST['value'])
        Payment_Models_Menager.Append_Selected_Product(self.request, product)
        return JsonResponse({'__button__': 'true'})

    def Manage_Button_Delete(self):
        product = Product.objects.get(pk=self.request.POST['value'])
        Payment_Models_Menager.Delete_Selected_Product(self.request, product)
        return JsonResponse({'__button__': 'true'})

    def Manage_Button_Clear(self):
        return JsonResponse({'__button__': 'true'})

    def Manage_Button(self):

        if self.request.POST['__button__'] == 'append':
            return self.Manage_Button_Append()

        if self.request.POST['__button__'] == 'delete':
            return self.Manage_Button_Delete()

        if self.request.POST['__button__'] == 'clear':
            return self.Manage_Button_Clear()

        return super(Cart_Manager, self).Manage_Button()

    @staticmethod
    def Launch(request):
        return Cart_Manager(request, authorization=True).HTML
