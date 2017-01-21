from arbuz.views import *


class Cart(Dynamic_Event_Menager):

    def Manage_Content_Ground(self):
        return self.Render_HTML('cart/cart.html')

    def Manage_Cart_Append(self):

        pk = self.request.POST['product_id']
        cart = self.request.session['cart_products']

        cart.append(Product.objects.get(pk=pk))
        self.request.session['cart_products'] = cart

    def Manage_Cart_Delete(self):

        pk = self.request.POST['product_id']
        cart = self.request.session['cart_products']

        cart.remove(Product.objects.get(pk=pk))
        self.request.session['cart_products'] = cart

    def Manage_Cart_Clear(self):
        self.request.session['cart_products'] = []

    def Manage_Cart(self):

        if self.request.POST['__cart__'] == 'append':
            return self.Manage_Cart_Append()

        if self.request.POST['__cart__'] == 'delete':
            return self.Manage_Cart_Delete()

        if self.request.POST['__cart__'] == 'clear':
            return self.Manage_Cart_Clear()

    def Manage(self):

        # parts of pages
        if '__content__' in self.request.POST:
            return self.Manage_Content()

        # cart
        if '__cart__' in self.request.POST:
            return self.Manage_Cart()

        return self.Error_No_Event()

    @staticmethod
    def Launch(request):
        return Cart(request).HTML
