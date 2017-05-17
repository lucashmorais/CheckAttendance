#! /bin/bash

echo "Starting Emulator Build."
echo "Make sure your device is running!"

echo "Cleaning environment..."
rm -rf platforms plugins

echo "Uninstalling Ionic Recipe Book..."
adb uninstall com.ionicframework.recipebook

echo "Building for Android for Genymotion..."
ionic cordova build android --emulator

echo "Launching with Genymotion..."
ionic cordova run android
