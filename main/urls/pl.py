from django.conf.urls import url
from main import views

urlpatterns = [
    url(r'^$', views.Contains_Start.Launch),
    url(r'^o_nas/$', views.Contains_About_Us.Launch),
    url(r'^produkty/$', views.Contains_Products.Launch),
    url(r'^kontakt/$', views.Contains_Contact_Us.Launch),
    url(r'^edycja/$', views.Contains_Edit.Launch),
]
