#! /bin/bash

echo "Starting development build..."

echo "Cleaning environment..."
rm -rf node_modules www

echo "Installing ionic and cordova..."
sudo npm install -g ionic cordova

echo "Installing dev dependencies..."
npm install --save-dev

echo "Starting application in the browser..."
ionic serve
