from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.Komunikat.Uruchom),
    url(r'^404/$', views.Komunikat_404.Uruchom),
]
