# Thoiry Photos Client
Application cliente Thoiry Photos réalisé avec **AngularJS 2** with **TypeScript**

### Install
How to install :
* Ionic and Cordova framework must be installed:

`$ npm install -g ionic cordova`

* Then run:

`$ npm install`

* Finally, start app using:

`$ ionic serve`

* Or start app using emulator:

`$ ionic cordova emulate -l -c android`

### Build

* First build app and next, we can find our unsigned APK file in `platforms/android/build/outputs/apk`. 

`$ ionic cordova build --release android`

* Sign JAR

`jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore "my-release-key.keystore" android-release-unsigned.apk alias_name`

* ZipAlign JAR using Android SDK 

`zipalign -v 4 android-release-unsigned.apk HelloWorld.apk`




