# Firebase Documentation
The Grizzly Hacks Web Application is based on a serverless backend as a result many things are handled by Firebase. Things like user authentication, data storage, and hosting are all configured to be run through Firebase. As a result it is imperative to know how things work.
## Accounts
To access configuration of the many Firebase components access is needed to the account that houses the Grizzly Hacks project. This has been left with Dr.Gunay to allow for transition of teams. Contact him at cgunay@ggc.edu
## General Project Settings
In the project settings is where things related to the API keys and general project related info will be housed. Users of the firebase project (not the web app) can be found here and their permissions can also be modified in this section. The code meant to go in the /environments folder can also be found here in order to access the API.
## Authentication
This will house the users signed up to the web app. In this component you can configure sign-in method but at the moment only Email/Password is supported. The account verification information can also be found here. Only emails and User UID can be found in this section and nothing private to the user's account.
## Firestore Database
The database for any data housed in the app such as blogs, events, and users will be housed here. It is possible to build queries as well as view all the information within collections. The Firestore Rules will also be shown here after they are deployed when hosting. Managing the analytics is important as only so much is allowed to be read and written to the Firestore database before payment is necessary but this resets every month. Optimization may be needed as things scale.
## Hosting
More information about hosting can be found in the Hosting Documentation.
## More Questions?
For any extra information refer to the Firebase Documentation [here](https://firebase.google.com/docs/build).