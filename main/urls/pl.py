from django.conf.urls import url
from main import views

urlpatterns = [
    url(r'^$', views.Start.Launch, name='main.start'),
    url(r'^o_nas/$', views.About.Launch, name='main.about'),
    url(r'^produkty/$', views.Products.Launch, name='main.products'),
    url(r'^kontakt/$', views.Contact.Launch, name='main.contact'),

    url(r'^o_nas/edytuj/(?P<pk>\d+)/$', views.About.Edit, name='main.edit_about'),
    url(r'^kontakt/edytuj/(?P<pk>\d+)/$', views.Contact.Edit, name='main.edit_contact'),
]
