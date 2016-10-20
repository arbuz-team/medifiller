from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^logowanie/$', views.Logowanie.Uruchom),
    url(r'^rejestracja/$', views.Rejestracja.Uruchom),
    url(r'^wyloguj/$', views.Wyloguj.Uruchom),
]
