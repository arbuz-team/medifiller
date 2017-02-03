from django.conf.urls import url
from payment import views


urlpatterns = [
    url(r'^$', views.Payment.Launch, name='payment'),
    url(r'^apply_payment/$', views.Payment.Apply_Payment, name='payment.apply_payment'),
    url(r'^cancel_payment/$', views.Payment.Cancel_Payment, name='payment.cancel_payment'),
]
