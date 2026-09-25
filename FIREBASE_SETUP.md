# MECHCALC Firebase Authentication Setup

The MECHCALC front end is now prepared for real Email/Password authentication with Firebase.

## 1. Create a Firebase project

Open Firebase Console and create a project. A suitable project name is `MECHCALC`.

## 2. Register a Web app

In Firebase Project Overview, add a Web app (`</>`), name it `MECHCALC Web`, and register it.

Firebase will show a configuration object similar to:

```js
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
```

Copy only those values into `firebase-config.js`.

## 3. Enable Email/Password sign-in

Firebase Console -> Authentication -> Sign-in method -> Email/Password -> Enable -> Save.

## 4. Authorize the GitHub Pages domain

Firebase Console -> Authentication -> Settings -> Authorized domains.

Add:

`puttuv-hub.github.io`

## 5. Upload the authentication files to GitHub

Replace/upload these files in the `mechcalc` repository root:

- `index.html`
- `style.css`
- `auth.js`
- `firebase-config.js`

Then commit the changes.

## 6. Test

Open:

`https://puttuv-hub.github.io/mechcalc/#account`

Test in this order:

1. Enter an email and password (minimum 6 characters).
2. Click **Sign Up**.
3. Logout.
4. Login using the same email/password.
5. Click **Forgot password?** and confirm the reset email arrives.

## Security note

Do not upload any Firebase Admin service-account JSON or private key to GitHub. This project only uses the normal Firebase Web SDK configuration intended for browser applications.
