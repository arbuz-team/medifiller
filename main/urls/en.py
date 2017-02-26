from django.conf.urls import url
from main import views

urlpatterns = [
    url(r'^$', views.Start.Launch, name='main.start'),
    url(r'^about/$', views.About.Launch, name='main.about'),
    url(r'^products/$', views.Products.Launch, name='main.products'),
    url(r'^contact/$', views.Contact.Launch, name='main.contact'),

    url(r'^about/edit/(?P<pk>\d+)/$', views.About.Edit, name='main.edit_about'),
    url(r'^contact/edit/(?P<pk>\d+)/$', views.Contact.Edit, name='main.edit_contact'),
]
