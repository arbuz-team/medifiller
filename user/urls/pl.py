from django.conf.urls import url
from user import views

urlpatterns = [
    url(r'^$', views.Start_App.Launch, name='user.start'),
    url(r'^zaloguj/$', views.Sign_In.Launch, name='user.sign_in'),
    url(r'^zarejestruj/$', views.Sign_Up.Launch, name='user.sign_up'),
    url(r'^wyloguj/$', views.Sign_Out.Launch, name='user.sign_out'),
    url(r'^konto/$', views.Account.Launch, name='user.account'),
    url(r'^aktywuj/(?P<key>[a-z0-9]{40})/$',
        views.Approved_Register.Update_User_Status, name='user.approved'),
]
