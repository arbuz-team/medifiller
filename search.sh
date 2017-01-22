#! /bin/bash
find . -type f ! -path '*node_modules*' ! -path '*git*' ! -name '*.pyc' ! -path '*/_static/js/*' -name "*$1" -exec grep -Hin --color "$2" {} \;
