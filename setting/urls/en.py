from django.conf.urls import url
from setting import views

urlpatterns = [
    url(r'^$', views.Control_Panel.Launch, name='setting.start'),
    url(r'^load_default_data/$', views.Control_Panel.Load_Default_Data, name='setting.load_default_data'),
]
