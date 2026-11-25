import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

// Native Firebase reads the Android and iOS app settings from the
// google-services.json and GoogleService-Info.plist files.
export { auth, firestore };
export const isFirebaseConfigured = true;
