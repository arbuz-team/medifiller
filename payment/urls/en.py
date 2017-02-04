from django.conf.urls import include, url
from payment.views import OrderView, HomeView
from django.contrib import admin


admin.autodiscover()

app_name = 'payment'
urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),

    url(r'^$', HomeView.as_view(), name='home'),
    url(r'^payment/(?P<pk>\d+)/$', OrderView.as_view(), name='order_detail'),
    url(r'', include('getpaid.urls', app_name='getpaid', namespace='getpaid')),

]

# from django.conf.urls import url
# from payment import views
#
#
# urlpatterns = [
#     url(r'^$', views.Payment.Launch, name='payment'),
#     url(r'^apply/$', views.Apply_Payment.Launch, name='payment.apply'),
#     url(r'^cancel/$', views.Cancel_Payment.Launch, name='payment.cancel'),
# ]
