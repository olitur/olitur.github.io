#!/usr/bin/env bash

# build the docs
make clean
make html
#make latexpdf

# commit and push
git add -A
git commit -m "building docs"
#git push origin master

# switch branches and pull the data we want
git checkout gh-pages
rm -rf .
git checkout master /build/html
mv ./build/html/* ./
git add -A
git commit -m "publishing html pages"
git push origin gh-pages

# switch back
git checkout master
