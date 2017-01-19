from django.conf.urls import url
from dialog import views

urlpatterns = [
    url(r'^$', views.Dialog.Launch, name='dialog.start'),
]

