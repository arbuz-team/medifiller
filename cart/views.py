from arbuz.views import *
from cart.models import *


class Cart_Manager(Dynamic_Event_Menager):

    def Manage_Content_Ground(self):
        pass

    def Manage_Content_Cart(self):
        user = User.objects.get(unique=self.request.session['user_unique'])
        self.content['cart'] = Cart.objects.filter(user=user)
        return self.Render_HTML('cart/cart.html')

    def Manage_Content(self):

        if self.request.POST['__content__'] == 'cart':
            return self.Manage_Content_Cart()

        return super(Cart_Manager, self).Manage_Content()

    def Manage_Button_Append(self):
        user = User.objects.get(unique=self.request.session['user_unique'])
        product = Product.objects.get(pk=self.request.POST['value'])

        Cart(user=user, product=product, approved=False).save()

        return JsonResponse({'__button__': 'true'})

    def Manage_Button_Delete(self):
        user = User.objects.get(unique=self.request.session['user_unique'])
        product = Product.objects.get(pk=self.request.POST['value'])

        cart = Cart.objects.get(user=user, product=product)
        cart.delete()

        return JsonResponse({'__button__': 'true'})

    def Manage_Button_Clear(self):
        user = User.objects.get(unique=self.request.session['user_unique'])

        cart = Cart.objects.filter(user=user)
        for product in cart:
            product.delete()

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
