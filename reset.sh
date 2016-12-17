#! /usr/bin/fish

rm db.sqlite3
rm -r main/migrations/*
rm -r product/migrations/*
rm -r root/migrations/*
rm -r sender/migrations/*
rm -r session/migrations/*
rm -r statement/migrations/*
rm -r translator/migrations/*
rm -r user/migrations/*

python manage.py makemigrations main
python manage.py makemigrations product
python manage.py makemigrations root
python manage.py makemigrations sender
python manage.py makemigrations session
python manage.py makemigrations statement
python manage.py makemigrations translator
python manage.py makemigrations user

python manage.py migrate

chmod 664 db.sqlite3
