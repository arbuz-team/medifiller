from django.conf.urls import url
from payment import views


urlpatterns = [
    url(r'^$', views.Payment.Launch, name='payment'),
    url(r'^BBB$', views.Payment.BBB, name='BBB'),
]
