#! /usr/bin/fish

rm db.sqlite3
rm -r uzytkownik/migrations/*
rm -r produkt/migrations/*

python manage.py makemigrations uzytkownik
python manage.py makemigrations produkt

python manage.py migrate auth

python manage.py migrate uzytkownik
python manage.py migrate produkt

chmod 777 db.sqlite3
