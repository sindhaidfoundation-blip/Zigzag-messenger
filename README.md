# Zigzag Messenger

A cross-platform messaging app foundation for Android and iOS, built with Expo, React Native, TypeScript and Firebase.

## Included
- Zigzag-branded interface and reusable theme tokens
- Welcome, phone sign-in, chat list, contacts, profile and conversation screens
- Firebase Phone Authentication OTP flow for Pakistan (+92 mobile numbers)
- Native Firebase Authentication and Cloud Firestore integration
- Firestore helpers for conversations and text messages

## Firebase project setup
This app uses the native Firebase SDK for phone authentication and Firestore on Android/iOS.

1. Enable **Authentication → Sign-in method → Phone** in Firebase Console.
2. In **Authentication → Settings → SMS region policy**, allow Pakistan.
3. Keep the Android and iOS Firebase app registrations in the same Firebase project.
4. Ensure `google-services.json` and `GoogleService-Info.plist` are present at the repository root and match package/bundle ID `com.zigzag.messenger`.
5. For Android phone verification, configure the app signing SHA-1 and SHA-256 fingerprints in Firebase Project settings. Add the fingerprints for the build you install.
6. The Firebase Spark plan has a limited daily SMS quota. Use Firebase Authentication test phone numbers during development where appropriate.

## Install and run
1. Install Node.js LTS.
2. Clone this repository and run `npm install`.
3. React Native Firebase uses native code, so Expo Go is not supported. Create a development build using EAS Build or a local native build.
4. For a local Android development build, run `npx expo run:android` after installing Android Studio and its SDK. For iOS, use a Mac with Xcode and run `npx expo run:ios`.
5. Start Metro with `npx expo start --dev-client` and open the installed development build.

## OTP flow
- Enter a Pakistani mobile number in the 10-digit format (for example, 3001234567); the app sends it as +92.
- Enter the 6-digit SMS code to complete sign-in.
- After successful verification, the app creates/updates the user's private Firestore profile document and opens the chat tabs.
- Firebase may automatically verify some Android devices; other devices use the manual SMS code flow.

## Firestore
- `firestore.rules` contains rules for private user documents, conversation members and append-only text messages.
- `src/lib/chat.ts` provides helpers for creating/opening conversations, subscribing to live conversation/message updates and sending text messages.
- Publish rules from Firebase Console → Firestore Database → Rules, or deploy with the Firebase CLI.

## Current limitations
The OTP flow and native Firebase integration have been added to the code but have **not yet been built or tested on physical Android/iOS devices**. SMS delivery depends on Firebase project settings, allowed SMS regions, app verification, signing fingerprints and quota.

The chat screens still display local mock data; Firestore chat helpers are available but are not yet wired into the visible chat list and conversation screens. Messages are ordinary text in Firestore and are **not end-to-end encrypted**. Push notifications, media uploads, calling and production security review are not yet implemented.

Never commit Firebase service-account keys or other private credentials. The Android/iOS Firebase client configuration files are app configuration, not service-account private keys.
