#! /bin/bash

git add -A
git ci -am "auto push by push.sh"
branch=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')
git push origin $branch