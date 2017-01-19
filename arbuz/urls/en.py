from django.conf.urls import url, include

urlpatterns = [
    url(r'^user/', include('user.urls.en'), name='user'),
    url(r'^root/', include('root.urls.en'), name='root'),
    url(r'^statement/', include('statement.urls.en'), name='statement'),
    url(r'^product/', include('product.urls.en'), name='product'),
    url(r'^setting/', include('setting.urls.en'), name='setting'),
    url(r'^searcher/', include('searcher.urls.en'), name='searcher'),
    url(r'^dialog/', include('dialog.urls.en'), name='dialog'),
    url(r'', include('main.urls.en'), name='main'),
]
