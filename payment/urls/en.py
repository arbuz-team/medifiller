from django.conf.urls import url
from payment import views


urlpatterns = [
    url(r'^$', views.Payment.Launch, name='payment'),
    url(r'^apply/$', views.Apply_Payment.Launch, name='payment.apply'),
    url(r'^cancel/$', views.Cancel_Payment.Launch, name='payment.cancel'),
]
