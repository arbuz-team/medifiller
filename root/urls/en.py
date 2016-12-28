from django.conf.urls import url
from root import views

urlpatterns = [
    url(r'^login/$', views.Login.Launch),
    url(r'^logout/$', views.Logout.Launch),
    url(r'^create/$', views.Create.Launch),
]

