from django.conf.urls import url
from user import views

urlpatterns = [
    url(r'^$', views.Start_App.Launch, name='user.start'),
    url(r'^sign_in/$', views.Sign_In.Launch, name='user.sign_in'),
    url(r'^sign_up/$', views.Sign_Up.Launch, name='user.sign_up'),
    url(r'^sign_out/$', views.Sign_Out.Launch, name='user.logout'),
    url(r'^account/$', views.Account.Launch, name='user.account'),
    url(r'^approved/(?P<key>[a-z0-9]{40})/$',
        views.Approved_Register.Update_User_Status, name='user.approved'),

    url(r'^forgot/$', views.Forgot_Password.Launch, name='user.forgot'),
    url(r'^change_password/(?P<key>[a-z0-9]{40})/$',
        views.Change_Password.Secure, name='user.change_password'),
]
