#! /usr/bin/fish
rm db.sqlite3
rm -r uzytkownik/migrations/*

python manage.py makemigrations uzytkownik

python manage.py migrate auth

python manage.py migrate uzytkownik

chmod 777 db.sqlite3
