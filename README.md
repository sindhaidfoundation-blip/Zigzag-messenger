# Zigzag Messenger

A cross-platform messaging app foundation for Android and iOS, built with Expo, React Native, TypeScript and Firebase.

## Included in this first foundation
- Zigzag-branded interface and reusable theme tokens
- Welcome, phone sign-in, chat list, contacts, profile and conversation screens
- Navigation with Expo Router
- Firebase client configuration scaffold (no credentials committed)
- Mock conversations so the UI can be explored before backend setup

## Run locally
1. Install Node.js LTS and the Expo Go app, or configure Android Studio / Xcode.
2. Clone this repository and run `npm install`.
3. Copy `.env.example` to `.env` and fill in your Firebase web app configuration.
4. In Firebase Console, create a project and enable **Authentication → Phone**.
5. Run `npx expo start`, then scan the QR code with Expo Go.

## Firebase setup
Create a Firebase project at https://console.firebase.google.com/, register a web app to obtain the client config, and enable Phone Authentication. For production, configure platform-specific app identifiers, authorized domains, SMS region policy, App Check, Firestore security rules and Storage rules. Never commit service-account keys or private credentials.

The current phone screen is a UI scaffold; the actual OTP send/verify flow must be wired to Firebase Auth and tested on physical devices before release. Chat data currently uses local mock data; Firestore real-time sync, push notifications, media uploads, calling and end-to-end encryption are not yet implemented.

## Project structure
```
app/                 Expo Router screens
src/theme/           Brand colors, spacing and typography
src/data/            Temporary demo data
src/lib/             Firebase client setup
```

## Important
This repository is the starting foundation, not a production-ready secure messenger. Do not use real user data until authentication, database rules, abuse controls, privacy policy and security review are complete.


## Firestore rules and chat foundation

- `firestore.rules` contains deny-by-default rules for private user documents, conversation members and append-only text messages.
- `src/lib/chat.ts` provides Firestore helpers for creating/opening conversations, subscribing to live conversation/message updates and sending text messages.
- `firebase.json` points the Firebase CLI at the checked-in rules file.

### Configure and publish

1. Add a Firebase **Web app** in Project settings (this provides the Firebase JS config), then put its values in a local `.env` copied from `.env.example`.
2. Install the Firebase CLI, sign in with the Google account that owns this Firebase project, and run `firebase use zigzag-messenger-624a3`.
3. From the repository root run `firebase deploy --only firestore:rules` to publish the checked-in rules. Until this deploy is completed, the existing Console rules remain active.
4. Phone OTP still needs a platform-appropriate verification flow and a development build; the current login screen is not yet a working OTP flow.

**Security note:** These starter rules intentionally deny access to user profile documents except to their owner. Do not put private data in broadly readable documents. Text messages are not end-to-end encrypted yet; the current chat helper stores ordinary text and must not be described as E2EE.
