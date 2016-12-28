from django.conf.urls import url, include

urlpatterns = [
    url(r'^użytkownik/', include('user.urls.pl')),
    url(r'^administrator/', include('root.urls.pl')),
    url(r'^komunikat/', include('statement.urls.pl')),
    url(r'^produkt/', include('product.urls.pl')),
    url(r'^ustawienia/', include('setting.urls.pl')),
    url(r'', include('main.urls.pl')),
]
