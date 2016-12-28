from django.conf.urls import url
from product import views

urlpatterns = [
    url(r'^(?P<pk>\d+)/details/$', views.Produkt_Details.Launch_GET),
]
