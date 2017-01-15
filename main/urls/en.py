from django.conf.urls import url
from main import views

urlpatterns = [
    url(r'^$', views.Contains_Start.Launch, name='main.start'),
    url(r'^about/$', views.Contains_About.Launch, name='main.about'),
    url(r'^products/$', views.Contains_Products.Launch, name='main.products'),
    url(r'^contact/$', views.Contains_Contact.Launch, name='main.contact'),
    url(r'^edit/$', views.Contains_Edit.Launch, name='main.edit'),
]
