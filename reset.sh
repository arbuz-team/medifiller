#! /usr/bin/fish

rm db.sqlite3
rm -r user/migrations/*
rm -r root/migrations/*
rm -r product/migrations/*

python manage.py makemigrations user
python manage.py makemigrations root
python manage.py makemigrations product

python manage.py migrate

python manage.py migrate user
python manage.py migrate root
python manage.py migrate product

chmod 777 db.sqlite3
