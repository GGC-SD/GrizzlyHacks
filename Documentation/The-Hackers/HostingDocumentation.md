# Hosting Documentation
The Grizzly Hacks Web Application is hosted through **Firebase**. If you haven't already refer to the Firebase Documentation for information on how to access the nescessary accounts.
## Step 1
Ensure the Firebase CLI is installed for you development machine. Tips on how to do this can be found [here](https://firebase.google.com/docs/cli).
## Step 2
As the directory already has firebase files within it initializing it is not necessary. Next it is recommended to test a running instance on your local machine. To do this you must go into the /GGCHacks directory and run `firebase emulators:start` this will allow you to make sure things are running correctly on your local machine. However any data modified in this state could still affect the hosted version. This should be hosted at http://127.0.0.1:5000 but it could differ depending on your machine so pay attention to your terminal for the exact link. At http://127.0.0.1:4000/ you can find the emulator settings allowing you to manage the firestore any other components added.
![Firebase Emulator Screen](https://i.imgur.com/zkm5YOH.png)
## Step 3
When ready to deploy the site for hosting run `firebase deploy` in the /GGCHacks directory. Keep in mind if modifications are made to the `firebase.rules` file then you must ensure there is no compilation errors before hosting. The CLI will tell you when running the deploy command if this is the case and what may be preventing a deployable app.
## More Questions?
For any extra information refer to the Firebase Hosting Documentation [here](https://firebase.google.com/docs/hosting).