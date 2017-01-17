from django.conf.urls import url
from searcher import views

urlpatterns = [
    url(r'^filters$', views.Set_Filters.Launch, name='searcher.filters'),
    url(r'^phrase$', views.Set_Filters.Launch, name='searcher.phrase'),
]
