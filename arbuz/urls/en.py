from django.conf.urls import url, include

urlpatterns = [
    url(r'^user/', include('user.urls.en')),
    url(r'^root/', include('root.urls.en')),
    url(r'^statement/', include('statement.urls.en')),
    url(r'^product/', include('product.urls.en')),
    url(r'^setting/', include('setting.urls.en')),
    url(r'', include('main.urls.en')),
]
