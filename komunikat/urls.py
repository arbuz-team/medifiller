from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.Komunikat.Uruchom),
    url(r'^404/$', views.Komunikat_404.Uruchom),

    url(r'^rejestracja_ok/$', views.Komunikat_Rejestracja.Uruchom_OK),
    url(r'^rejestracja_nok/$', views.Komunikat_Rejestracja.Uruchom_NOK),
    url(r'^logowanie_ok/$', views.Komunikat_Logowanie.Uruchom_OK),
    url(r'^logowanie_nok/$', views.Komunikat_Logowanie.Uruchom_NOK),
]
