
A) How to resolve the problem
Could not get status from Metro bundler.
connect ECONNREFUSED 127.0.0.1:19001
Connecting to Metro bundler failed.

When you’re unable to load a bundle, look at the packager logs or the error message displayed in the Expo client to see if it’s related to the packager. If so, you should try clearing the packager’s state to reduce the chance the bug is related to a stale cache or corrupt process.
These instructions are for macOS and Linux, but the general ideas apply to Windows as well.
1) Stop XDE/exp, which should also stop the packager. Check your list of running processes to ensure these processes are not running.
2) Delete node_modules in your project
3) If your project depends on other local projects (e.g. has a file: URI in its dependencies), clear those local project’s node_modules directories too for good measure even though it’s probably unnecessary.
4) Clear your Yarn or npm cache, depending on which you’re using, with yarn cache clean or npm cache clean
5) Run yarn or npm i to install your dependencies again
6) Run watchman watch-del-all to clear Watchman’s state
7) Kill the watchman daemon process
8) Delete the packager’s cache directory with rm -fr $TMPDIR/metro*
9) Start XDE or exp
With exp, run exp r -c for good measure
And just to be sure, force quit the Expo client on your phone or simulator and re-open it.


####################################
#########    keystore ##############
/Users/user/Documents/jobAssignNative
users-MacBook-Pro:jobAssignNative user$ expo fetch:android:keystore

Retreiving Android keystore for @guopingwu/Duty2Go
Writing keystore to /Users/user/Documents/jobAssignNative/Duty2Go.jks...
Done writing keystore to disk.
Save these important values as well:

  Keystore password: 02d330b788ec42dba82a7c5cfbf40d72
  Key alias:         QGd1b3Bpbmd3dS9EdXR5Mkdv
  Key password:      b398466a44bb4febb33dc231fa7a51f7


android: version 3
ios: version 2
