#! /bin/bash

rm $(dirname $0)/db.sqlite3
rm -r $(dirname $0)/main/migrations/*
rm -r $(dirname $0)/product/migrations/*
rm -r $(dirname $0)/root/migrations/*
rm -r $(dirname $0)/sender/migrations/*
rm -r $(dirname $0)/session/migrations/*
rm -r $(dirname $0)/statement/migrations/*
rm -r $(dirname $0)/translator/migrations/*
rm -r $(dirname $0)/user/migrations/*

python $(dirname $0)/manage.py makemigrations main
python $(dirname $0)/manage.py makemigrations product
python $(dirname $0)/manage.py makemigrations root
python $(dirname $0)/manage.py makemigrations sender
python $(dirname $0)/manage.py makemigrations session
python $(dirname $0)/manage.py makemigrations statement
python $(dirname $0)/manage.py makemigrations translator
python $(dirname $0)/manage.py makemigrations user

python $(dirname $0)/manage.py migrate
chmod 664 $(dirname $0)/db.sqlite3

GET http://127.0.0.1:8000/setting/load_languages/ > /dev/null
GET http://127.0.0.1:8000/setting/load_default_users/ > /dev/null
