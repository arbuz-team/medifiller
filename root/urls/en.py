from django.conf.urls import url
from root import views

urlpatterns = [
    url(r'^login/$', views.Login.Launch, name='root.login'),
    url(r'^logout/$', views.Logout.Launch, name='root.logout'),
    url(r'^create/$', views.Create.Launch, name='root.create'),
]

