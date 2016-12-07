from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^login/$', views.Login.Launch),
    url(r'^register/$', views.Register.Launch),
    url(r'^logout/$', views.Logout.Launch),
]
