from django.conf.urls import url, include
from django.conf.urls import handler404

urlpatterns = [
    url(r'^user/', include('user.urls')),
    url(r'^statement/', include('statement.urls')),
    url(r'^product/', include('product.urls')),
    url(r'', include('main.urls')),
]

#handler404 = 'statement.views.Wyswietl_404'
