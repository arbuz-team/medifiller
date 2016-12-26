from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.Control_Panel.Launch),
    url(r'^reset_databases/$', views.Control_Panel.Reset_Databases),
    url(r'^load_languages/$', views.Control_Panel.Load_Languages),
    url(r'^load_default_users/$', views.Control_Panel.Load_Defautl_Users),
]
