# MECHCALC Firestore Setup

MECHCALC now stores saved calculations at:

`users/{uid}/calculations/{calculationId}`

Recommended Firestore rules:

```text
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/calculations/{calculationId} {
      allow read, create, update, delete:
        if request.auth != null
        && request.auth.uid == userId;
    }
  }
}
```

Features in this build:
- Firebase Email/Password authentication
- Save Calculation on every calculator/tool page
- Per-user Firestore calculation history
- Delete saved calculations
- Open the calculator associated with a saved result
- Signed-out users are sent to the account login section

Live site: https://puttuv-hub.github.io/mechcalc/
