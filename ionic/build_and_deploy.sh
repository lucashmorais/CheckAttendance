#! /bin/bash

echo "Starting Android Build."
echo "Make sure your device is running!"

echo "Cleaning environment..."
rm -rf platforms plugins

echo "Uninstalling Ionic Recipe Book..."
adb uninstall com.ionicframework.recipebook

echo "Building for Android..."
ionic cordova build android

echo "Launching with Genymotion..."
ionic cordova run android
