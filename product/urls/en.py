from django.conf.urls import url
from product import views

urlpatterns = [
    url(r'^$', views.Start_App.Launch, name='product.start'),
    url(r'^(?P<pk>\d+)/.+$', views.Product_Details.Details, name='product.details'),
    url(r'^new/', views.New_Product.Launch, name='product.new_product'),
    url(r'^edit/(?P<pk>\d+)/', views.Edit_Product.Edit, name='product.edit_product'),
    url(r'^delete/', views.Delete_Product.Launch, name='product.delete_product'),
    url(r'^delete/brand/', views.Delete_Brand.Launch, name='product.delete_brand'),
    url(r'^delete/purpose/', views.Delete_Purpose.Launch, name='product.delete_purpose'),
]
