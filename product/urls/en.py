from django.conf.urls import url
from product import views

urlpatterns = [
    url(r'^(?P<pk>\d+)/.+$', views.Product_Details.Product, name='product.details'),
]
