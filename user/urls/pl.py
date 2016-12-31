from django.conf.urls import url
from user import views

urlpatterns = [
    url(r'^zaloguj/$', views.Login.Launch, name='user.login'),
    url(r'^zarejestruj/$', views.Register.Launch, name='user.register'),
    url(r'^wyloguj/$', views.Logout.Launch, name='user.logout'),
    url(r'^konto/$', views.Account.Launch, name='user.account'),
    url(r'^aktywuj/(?P<key>[a-z0-9]{40})/$',
        views.Approved_Register.Update_User_Status, name='user.approved'),
]
