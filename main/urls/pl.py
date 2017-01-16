from django.conf.urls import url
from main import views

urlpatterns = [
    url(r'^$', views.Contains_Start.Launch, name="main.start"),
    url(r'^o_nas/$', views.Contains_About.Launch, name="main.about"),
    url(r'^produkty/$', views.Contains_Products.Launch, name="main.products"),
    url(r'^kontakt/$', views.Contains_Contact.Launch, name="main.contact"),
    url(r'^edycja/$', views.Contains_Edit.Launch, name="main.edit"),
]
