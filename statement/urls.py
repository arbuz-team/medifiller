from django.conf.urls import url
from . import views



urlpatterns = [
    url(r'^$', views.Statement.Launch),
    url(r'^404/$', views.Statement_404.Launch),

    url(r'^register_ok/$', views.Statement_Register.Launch_OK),
    url(r'^register_nok/$', views.Statement_Register.Launch_NOK),
    url(r'^login_ok/$', views.Statement_Login.Launch_OK),
    url(r'^login_nok/$', views.Statement_Login.Launch_NOK),
]
