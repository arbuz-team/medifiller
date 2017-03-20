#! /bin/bash

rm $(dirname $0)/db.sqlite3
rm -r $(dirname $0)/cart/migrations/*
rm -r $(dirname $0)/main/migrations/*
rm -r $(dirname $0)/payment/migrations/*
rm -r $(dirname $0)/product/migrations/*
rm -r $(dirname $0)/root/migrations/*
rm -r $(dirname $0)/sender/migrations/*
rm -r $(dirname $0)/session/migrations/*
rm -r $(dirname $0)/statement/migrations/*
rm -r $(dirname $0)/translator/migrations/*
rm -r $(dirname $0)/user/migrations/*

python3 $(dirname $0)/manage.py makemigrations cart
python3 $(dirname $0)/manage.py makemigrations main
python3 $(dirname $0)/manage.py makemigrations payment
python3 $(dirname $0)/manage.py makemigrations product
python3 $(dirname $0)/manage.py makemigrations root
python3 $(dirname $0)/manage.py makemigrations sender
python3 $(dirname $0)/manage.py makemigrations session
python3 $(dirname $0)/manage.py makemigrations statement
python3 $(dirname $0)/manage.py makemigrations translator
python3 $(dirname $0)/manage.py makemigrations user

python3 $(dirname $0)/manage.py migrate
chmod 664 $(dirname $0)/db.sqlite3
bash $(dirname $0)/load.sh