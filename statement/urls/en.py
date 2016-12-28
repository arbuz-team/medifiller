from django.conf.urls import url
from statement import views


urlpatterns = [
    url(r'^404/$', views.Statement_404.Launch),
    url(r'^403/$', views.Statement_403.Launch),
    url(r'^500/$', views.Statement_500.Launch),
]
