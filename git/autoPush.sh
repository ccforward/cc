#! /bin/bash

brnach=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')

echo "===> pull origin"
git pull origin $branch

echo "===> co"
git add -A
getopts "m:" arg
msg=$OPTARG
git ci -am "$msg"

echo "===> push origin"
git push origin $branch

