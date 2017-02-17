from django.conf.urls import url
from user.account import views

urlpatterns = [
    url(r'^$', views.Start_App.Launch, name='user.start'),
    url(r'^details/$', views.Account.Launch, name='user.account.details'),
    url(r'^addresses/$', views.Account.Launch, name='user.account.addresses'),
    url(r'^my_shopping/$', views.Account.Launch, name='user.account.my_shopping'),
]
