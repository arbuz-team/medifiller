from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.Wyswietl_Start.Uruchom),
    url(r'^o_nas/$', views.Wyswietl_O_Nas.Uruchom),
    url(r'^wizytowka/$', views.Wyswietl_Wizytowka.Uruchom),
    url(r'^kontakt/$', views.Wyswietl_Kontakt.Uruchom),
    url(r'^edycja/$', views.Wyswietl_Edycja.Uruchom),
]
