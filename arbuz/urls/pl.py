from django.conf.urls import url, include

urlpatterns = [
    url(r'^użytkownik/', include('user.urls')),
    url(r'^administrator/', include('root.urls')),
    url(r'^komunikat/', include('statement.urls')),
    url(r'^produkt/', include('product.urls')),
    url(r'^ustawienia/', include('setting.urls')),
    url(r'', include('main.urls')),
]
