### CheckAttendance with the Ionic3 Framework

This is our Ionic project for the CheckAttendance app.

We used the API Level 25 for this project, and deployed it using Genymotion on
the Pixel XL API 25 device.

To get a development build and deploy the development version on your browser,
go to the `ionic` directory and run:

    $ ./setup_and_run.sh

This will download all dev dependencies and will request your password to
install ionic and cordova. The script will deploy the app and open a tab on
your browser. This dev version will not communicate with the server without
disabling your browser security measures. We recommend you test our app using
Genymotion instead.

To build the Emulator deploy version of our app, make sure that Genymotion is
up and your emulator device is already running. Then, go to the `ionic`
directory and run:

    $ ./build_and_deploy.sh

The app will start running on you emulator and will have full functionality.
