from django.conf.urls import url
from user import views

urlpatterns = [
    url(r'^login/$', views.Login.Launch, name='user.login'),
    url(r'^register/$', views.Register.Launch, name='user.register'),
    url(r'^logout/$', views.Logout.Launch, name='user.logout'),
    url(r'^account/$', views.Account.Launch, name='user.account'),
    url(r'^approved/(?P<key>[a-z0-9]{40})/$',
        views.Approved_Register.Update_User_Status, name='user.account'),

    url(r'^forgot/$', views.Forgot_Password.Launch, name='user.forgot'),
    url(r'^change_password/(?P<key>[a-z0-9]{40})/$',
        views.Change_Password.Secure, name='user.change_password'),
]
