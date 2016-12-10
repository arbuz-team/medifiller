from django.conf.urls import url
from . import views


urlpatterns = [
    url(r'^404/$', views.Statement_404.Launch),
    url(r'^500/$', views.Statement_404.Launch),
]
