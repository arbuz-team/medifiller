from django.conf.urls import url, include

urlpatterns = [
    url(r'^uzytkownik/', include('user.urls.en'), name='user'),
    url(r'^administrator/', include('root.urls.en'), name='root'),
    url(r'^komunikat/', include('statement.urls.en'), name='statement'),
    url(r'^produkt/', include('product.urls.en'), name='product'),
    url(r'^ustawienia/', include('setting.urls.en'), name='setting'),
    url(r'', include('main.urls.en'), name='main'),
]
