from django.conf.urls import url
from main import views

urlpatterns = [
    url(r'^$', views.Contains_Start.Launch, name=''),
    url(r'^about_us/$', views.Contains_About_Us.Launch, name='about_us'),
    url(r'^products/$', views.Contains_Products.Launch, name='products'),
    url(r'^contact_us/$', views.Contains_Contact_Us.Launch, name='contact_us'),
    url(r'^edit/$', views.Contains_Edit.Launch, name='edit'),
]
