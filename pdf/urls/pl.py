from django.conf.urls import url
from pdf import views

urlpatterns = [
    url(r'^faktura/(?P<pk>\d+)/$', views.Generator_PDF.Invoice, name='pdf.invoice'),
]

