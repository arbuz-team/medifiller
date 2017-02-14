from django.conf.urls import url
from root import views

urlpatterns = [
    url(r'^$', views.Start_App.Launch, name='root.start'),
    url(r'^sign_in/$', views.Sign_In.Launch, name='root.sign_in'),
    url(r'^sign_out/$', views.Sign_Out.Launch, name='root.sign_out'),
    url(r'^create/$', views.Create.Launch, name='root.create'),
    url(r'^map_references/$', views.Map_References.Launch, name='root.map_references'),
]

