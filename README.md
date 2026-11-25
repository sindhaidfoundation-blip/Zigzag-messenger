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
