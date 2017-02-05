from django.conf.urls import url
from payment import views


urlpatterns = [
    url(r'^$', views.Payment_Manager.Launch, name='payment'),
    url(r'^apply/$', views.Apply_Payment.Launch, name='payment.apply'),
    url(r'^cancel/$', views.Cancel_Payment.Launch, name='payment.cancel'),
    url(r'^(?P<payment_id>\d+)/$', views.payment_details, name='payment'),
]
