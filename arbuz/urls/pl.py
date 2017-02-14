from django.conf.urls import url, include

urlpatterns = [
    url(r'^uzytkownik/', include('user.urls.en'), name='user'),
    url(r'^administrator/', include('root.urls.en'), name='root'),
    url(r'^komunikat/', include('statement.urls.en'), name='statement'),
    url(r'^produkt/', include('product.urls.en'), name='product'),
    url(r'^ustawienia/', include('setting.urls.en'), name='setting'),
    url(r'^wyszukiwarka/', include('searcher.urls.en'), name='searcher'),
    url(r'^koszyk/', include('cart.urls.en'), name='cart'),
    url(r'^nawigacja/', include('navigation.urls.en'), name='navigation'),
    url(r'^platnosci/', include('payment.urls.en'), name='payment'),
    url(r'^paypal/', include('paypal.standard.ipn.urls'), name='paypal-ipn'),
    url(r'', include('main.urls.en'), name='main'),
]

