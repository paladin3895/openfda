#!/bin/bash
TMPFILE=`mktemp`
PWD="$2"
wget "$1" -O $TMPFILE
unzip -d $PWD $TMPFILE
rm $TMPFILE
