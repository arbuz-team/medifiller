from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^details/(?P<pk>\d+)/$', views.Produkt_Details.Launch_GET),
]
