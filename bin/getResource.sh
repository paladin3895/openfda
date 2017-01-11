#!/bin/bash
TMPFILE=`mktemp`
PWD="$2"
wget "$1" -O $TMPFILE
unzip $TMPFILE -p > "$PWD/$3"
rm $TMPFILE
