#! /bin/bash

rm -rf node_modules

sudo npm install -g ionic cordova
npm install --save-dev

ionic serve
