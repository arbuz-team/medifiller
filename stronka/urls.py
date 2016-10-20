from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.Wyswietl_Start.Uruchom),
    url(r'^about_us/$', views.Wyswietl_About_Us.Uruchom),
    url(r'^products/$', views.Wyswietl_Products.Uruchom),
    url(r'^contact_us/$', views.Wyswietl_Contact_Us.Uruchom),
    url(r'^edycja/$', views.Wyswietl_Edycja.Uruchom),
]
