from django.conf.urls import url
from main import views

urlpatterns = [
    url(r'^$', views.Contains_Start.Launch),
    url(r'^about_us/$', views.Contains_About_Us.Launch),
    url(r'^products/$', views.Contains_Products.Launch),
    url(r'^contact_us/$', views.Contains_Contact_Us.Launch),
    url(r'^edit/$', views.Contains_Edit.Launch),
]
