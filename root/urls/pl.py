from django.conf.urls import url
from root import views

urlpatterns = [
    url(r'^$', views.Start_App.Launch, name='root.start'),
    url(r'^zaloguj/$', views.Sign_In.Launch, name='root.sign_in'),
    url(r'^wyloguj/$', views.Sign_Out.Launch, name='root.sign_out'),
    url(r'^utworz/$', views.Create.Launch, name='root.create'),
    url(r'^mapa_adresow/$', views.Map_References.Launch, name='root.map_references'),
    url(r'^platnosci_uzytkownikow/$', views.Users_Payments.Launch, name='root.users_payments'),
]

