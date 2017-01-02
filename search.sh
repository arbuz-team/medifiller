#! /bin/bash
find . -type f ! -path '*node_modules*' ! -path '*git*' ! -name '*.pyc' ! -path '*/js/bundle*' -name "*$1" -exec grep -Hin --color "$2" {} \;
