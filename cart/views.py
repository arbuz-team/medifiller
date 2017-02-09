from arbuz.views import *


class Cart_Manager(Dynamic_Event_Menager):

    def Manage_Content_Ground(self):
        pass

    def Manage_Content_Cart(self):
        self.content['cart'] = self.request.session['cart_product']
        return self.Render_HTML('cart/cart.html')

    def Manage_Content(self):

        if self.request.POST['__content__'] == 'cart':
            return self.Manage_Content_Cart()

        return super(Cart_Manager, self).Manage_Content()

    def Manage_Button_Append(self):
        product = Product.objects.get(pk=self.request.POST['value'])
        cart = self.request.session['cart_product'][:]
        cart.append(product)

        self.request.session['cart_product'] = cart
        return JsonResponse({'__button__': 'true'})

    def Manage_Button_Delete(self):
        product = Product.objects.get(pk=self.request.POST['value'])
        cart = self.request.session['cart_product'][:]
        cart.remove(product)

        self.request.session['cart_product'] = cart
        return JsonResponse({'__button__': 'true'})

    def Manage_Button_Clear(self):

        cart = self.request.session['cart_product'][:]
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
