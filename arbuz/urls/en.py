from django.conf.urls import url, include

urlpatterns = [
    url(r'^user/', include('user.urls')),
    url(r'^root/', include('root.urls')),
    url(r'^statement/', include('statement.urls')),
    url(r'^product/', include('product.urls')),
    url(r'^setting/', include('setting.urls')),
    url(r'', include('main.urls')),
]
