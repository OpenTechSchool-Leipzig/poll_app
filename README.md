# An evaluation app for Django Girls workshops and any other event

[Django Girls](https://djangogirls.org/) is a worldwide volunteer driven initiative that is aiming to introduce women who have never coded before to the world of technology and increase diversity by offering free coding workshops. After every workshop the organizers use to ask the attendees to fill out an evaluation sheet with questions about the workshop, how they liked it, what to improve next time and so on.

So far, the workshop organizers in Leipzig and Dresden have printed out all questions on paper. This is not a very techie approach though :-) It would be pretty cool to have an app that could be opened by the attendees on their mobile phone after scanning a QR-Code. This app could be useful for workshop organizers of other communities too.

The following requirements would be good to have (a rough overview):

- The organizers should be able to add questions.
- The organizers should be able to choose certain types of answer options.
- The organizers can login into an admin area.
- In the admin area the organizers can create the question/answer sets.
- In the admin area the organizers can export a PDF with the results of the evaluation.
- The attendees can scan a QR-Code that will forward them to the evaluation app.
- The app should be multilingual.

Of course this is just a proposal, you could add your own ideas too! Same applies to the technology, you could learn here. If you already have an idea how to realize this, fine! Go on! We are happy to help here too.

### Technologies used so far

The Frontend is build in [VueJS](https://vuejs.org/) with VueX and Vue Router. And we're using [Firebase](https://firebase.google.com/) as backend for authentication and storage (firestore). We also included [Bulma](https://bulma.io/) as CSS Framework, but till now only a few components make use of it. A [Demo](https://poll-app.netlify.com) is deployed on Netlify.

[![Netlify Status](https://api.netlify.com/api/v1/badges/33f1cef7-49ad-4633-bcb7-0a91b416de63/deploy-status)](https://app.netlify.com/sites/poll-app/deploys)

## How to Contribute?

### Prerequisites:

you need to have node and npm installed on your machine. If you want to work on firebase rules, cloudfunctions or the admin SDK you'll also need the firebase CLI.

### Set up the Project

To set up the project you could either ask for access to our firebase project (via OTS Slack Channel) or simply connect the App to your own firebase project.
The following guide will explain step-by-step how to connect the app to your firebase project and create a first admin user.

1. clone the repository and run `npm install`

2. For setting up a (free) firebase project, simply visit <https://console.firebase.google.com> and create a new project (which requieres a google account). On the Overview Page of your project click on "add app" and give it a name. Then you'll see a code snippet with the firebase credentials that looks like following:

```
var firebaseConfig = {
    apiKey: "*****",
    authDomain: "your-project-name.firebaseapp.com",
    databaseURL: "https://your-project-name.firebaseio.com",
    projectId: "your-project-name",
    storageBucket: "",
    messagingSenderId: "******",
    appId: "****"
  };
```

As you can see the storageBucket is missing. To set this up, you first need to create a firestore database. Click on Database and follow the instructions to set it up. Now you can visit your app settings and copy the now complete credentials.

To savely store these credentials, create a file that is named `.env.local` in the root folder of the project and add the following lines:

```
VUE_APP_FIREBASE_API_KEY = 'your apiKey'
VUE_APP_FIREBASE_AUTH_DOMAIN = 'your authDomain'
VUE_APP_FIREBASE_DB_URL = 'your databaseURL'
VUE_APP_FIREBASE_PROJECT_ID = 'your projectId'
VUE_APP_FIREBASE_STORAGE_BUCKET = 'your storageBucket'
VUE_APP_FIREBASE_MS_ID = 'your messagingSenderId'
VUE_APP_FIREBASE_APP_ID = 'your appId'
```

Of course you'll have to replace the placeholder strings with your actual firebase credentials.

Now the app should be able to connect to your firebase project and you can run `npm run serve` to start the vue development server.
When you visit your local server you should already see a login page. But there is still one problem left:
There is no authorized user in your firebase project. So let's go on and create one!

3. Promote your First Admin-User

At first you have to enable the e-mail sign-in method for yor firebase project. On your project overview go to authentication sign in method and select e-mail and enable it.

Now you can go to the webapps login screen and click on the link to request Access. Here you can create your first useraccount.

When everything went right, you should find two changes on your firebase project page. 1. When you go to the Database tab you should see that there has been a new users collection created, in which you should find your user with it's name and email. 2. You also should be able to find the user in the authentication tab. When no user was created there might be an error with your firebase credentials so go back and check if everything is correct.

To make your new user an admin you also have to set up the firebaseAdmin SDK. This is only requiered for the first admin, since you can grant other users admin rights via the frontend once the first admin is registered (We're using cloudfunctions there).

In your terminal, navigate to the fbadmin folder `cd fbadmin` and run `npm install`. To use the admin SDK you'll have to add the Service Accounts Private Key.
Again go to your Firebase Project Page and navigate to settings > service account and click on "Generate new private key". Copy or move the file to the fbadmin folder and rename it to `ServiceAccountKey.json`.
The Filename is included in the .gitignore file, but you should make sure to never expose it to public repositories, because it will allow full controll to your firebase project!

When this setup is finished, type `npm run userlist` and copy the id of the user you want to promote. No you can run `npm run promote <userID>`, where you replace `<userID>` with the copied ID.

Congratulations the setup is finished!:tada: Now you can sign in to the dashboard and are prepared to contribute to the project! :sparkles:

Bonus: use the firebase cli to update rules and the cloudfunctions.

### Issues and Project

Before you contribute, please read through existing issues and also have a look at the [project's kanban board](https://github.com/OpenTechSchool-Leipzig/poll_app/projects/1). If you want to work on an issue, please comment on it and we will assignments. If you find a bug or have some ideas for features or imporvements feel free to let us know.

Thanks a lot for your contribution! :sparkling_heart:
