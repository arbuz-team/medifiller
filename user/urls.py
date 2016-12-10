from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^login/$', views.Login.Launch),
    url(r'^register/$', views.Register.Launch),
    url(r'^logout/$', views.Logout.Launch),
    url(r'^account/$', views.Account.Launch),
    url(r'^approved/(?P<key>[a-z0-9]{40})/$',
        views.Approved_Register.Update_User_Status),
]
