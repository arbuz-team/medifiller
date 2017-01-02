from django.conf.urls import url
from setting import views

urlpatterns = [
    url(r'^$', views.Control_Panel.Launch, name='setting.start'),
    url(r'^reset_databases/$', views.Control_Panel.Reset_Databases, name='setting.reset_databases'),
    url(r'^load_languages/$', views.Control_Panel.Load_Languages, name='setting.load_languages'),
    url(r'^load_default_users/$', views.Control_Panel.Load_Default_Users, name='setting.load_default_users'),
    url(r'^load_default_products/$', views.Control_Panel.Load_Default_Products, name='setting.load_default_products'),
    url(r'^change_default_domain/$', views.Control_Panel.Change_Default_Domain, name='setting.change_default_domain'),
]
