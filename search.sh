#! /bin/bash
find . -type f ! -path '*node_modules*' ! -path '*git*' ! -name '*.pyc' -exec grep -Hn --color $1 {} \;
