#! /bin/bash
find . -type f ! -path '*node_modules*' ! -path '*git*' ! -name '*.pyc' -name "*$1" -exec grep -Hn --color "$2" {} \;
