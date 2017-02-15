from django.conf.urls import url
from product import views

urlpatterns = [
    url(r'^$', views.Start_App.Launch, name='product.start'),
    url(r'^(?P<pk>\d+)/$', views.Product_Details.Details, name='product.details'),
    url(r'^(?P<pk>\d+)/.+/$', views.Product_Details.Details, name='product.details_with_name'),
    url(r'^nowy/', views.New_Product.Launch, name='product.new_product'),
    url(r'^edytuj/(?P<pk>\d+)/', views.Edit_Product.Edit, name='product.edit_product'),
    url(r'^usun/', views.Delete_Product.Launch, name='product.delete_product'),
    url(r'^usun/producenta/', views.Delete_Brand.Launch, name='product.delete_brand'),
    url(r'^usun/przeznaczenie/', views.Delete_Purpose.Launch, name='product.delete_purpose'),
]
