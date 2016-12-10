from django.conf.urls import url
from . import views



urlpatterns = [
    url(r'^$', views.Statement.Launch),
    url(r'^404/$', views.Statement_404.Launch),

    url(r'^register/$', views.Statement_Register.Launch),
    url(r'^login/$', views.Statement_Login.Launch),
]
