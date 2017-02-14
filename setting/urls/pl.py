from django.conf.urls import url
from setting import views

urlpatterns = [
    url(r'^$', views.Control_Panel.Launch, name='setting.start'),
    url(r'^reset_bazy_danych/$', views.Control_Panel.Launch, name='setting.reset_databases'),
    url(r'^wczytaj_domyslne_dane/$', views.Control_Panel.Load_Default_Data, name='setting.load_default_data'),
]
