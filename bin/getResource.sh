#!/bin/bash
TMPFILE=`mktemp`
PWD="$2"
wget "$1" -O $TMPFILE
unzip -p $TMPFILE > "$PWD/$3"
rm $TMPFILE
