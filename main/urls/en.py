from django.conf.urls import url
from main import views

urlpatterns = [
    url(r'^$', views.Contains_Start.Launch, name='main.start'),
    url(r'^about_us/$', views.Contains_About_Us.Launch, name='main.about_us'),
    url(r'^product/$', views.Contains_Products.Launch, name='main.products'),
    url(r'^contact_us/$', views.Contains_Contact_Us.Launch, name='main.contact_us'),
    url(r'^edit/$', views.Contains_Edit.Launch, name='main.edit'),
]
