from django.conf.urls import url
from main import views

urlpatterns = [
    url(r'^$', views.Start.Launch, name='main.start'),
    url(r'^about/$', views.About.Launch, name='main.about'),
    url(r'^products/$', views.Products.Launch, name='main.products'),
    url(r'^contact/$', views.Contact.Launch, name='main.contact'),
]
