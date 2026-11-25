import { useState } from "react";
import { router } from "expo-router";
import { View, Text, TextInput, StyleSheet, Pressable, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import auth, { type FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { colors } from "../src/theme";

export default function LoginScreen() {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [confirmation, setConfirmation] = useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const fullPhoneNumber = () => {
    const digits = phone.replace(/\D/g, "").replace(/^0/, "");
    if (!/^3\d{9}$/.test(digits)) {
      throw new Error("Pakistan ka mobile number 3 se start hona chahiye aur 10 digits ka hona chahiye.");
    }
    return `+92${digits}`;
  };

  const sendCode = async () => {
    setError("");
    try {
      const number = fullPhoneNumber();
      setBusy(true);
      const result = await auth().signInWithPhoneNumber(number);
      setConfirmation(result);
    } catch (e) {
      const err = e as { code?: string; message?: string };
      setError(err.message || "OTP send nahi ho saka. Number check karke dobara try karein.");
    } finally {
      setBusy(false);
    }
  };

  const verifyCode = async () => {
    if (!confirmation || code.trim().length !== 6) {
      setError("SMS mein aaya hua 6-digit code enter karein.");
      return;
    }
    setError("");
    setBusy(true);
    try {
      const result = await confirmation.confirm(code.trim());
      const user = result.user;
      const profile: Record<string, unknown> = {
        updatedAt: firestore.FieldValue.serverTimestamp()
      };
      if (user.phoneNumber) profile.phoneNumber = user.phoneNumber;
      const userRef = firestore().collection("users").doc(user.uid);
      const existing = await userRef.get();
      if (!existing.exists) profile.createdAt = firestore.FieldValue.serverTimestamp();
      await userRef.set(profile, { merge: true });
      router.replace("/(tabs)");
    } catch (e) {
      const err = e as { code?: string; message?: string };
      const friendly = err.code === "auth/invalid-verification-code"
        ? "Code ghalat hai. SMS wala code dobara check karein."
        : err.code === "auth/session-expired"
          ? "OTP expire ho gaya. Naya code mangwayein."
          : err.message || "Code verify nahi ho saka. Dobara try karein.";
      setError(friendly);
    } finally {
      setBusy(false);
    }
  };

  return <KeyboardAvoidingView style={s.page} behavior={Platform.OS === "ios" ? "padding" : undefined}>
    <Pressable style={s.backButton} onPress={() => confirmation ? setConfirmation(null) : router.back()}>
      <Text style={s.back}>←  Back</Text>
    </Pressable>
    <View style={s.mark}><Text style={s.markText}>z</Text></View>
    <Text style={s.title}>{confirmation ? "Enter your code" : "What's your number?"}</Text>
    <Text style={s.sub}>{confirmation ? "SMS par bheja gaya 6-digit verification code enter karein." : "We'll send you a verification code to make sure it's really you."}</Text>

    {!confirmation ? <>
      <Text style={s.label}>PHONE NUMBER</Text>
      <View style={s.phone}>
        <Text style={s.prefix}>+92</Text>
        <TextInput
          value={phone}
          onChangeText={value => { setPhone(value); setError(""); }}
          keyboardType="phone-pad"
          placeholder="300 1234567"
          placeholderTextColor="#A6A3B4"
          style={s.input}
          maxLength={12}
          editable={!busy}
          accessibilityLabel="Pakistan mobile phone number"
        />
      </View>
      <Pressable style={[s.button, busy && s.buttonDisabled]} disabled={busy} onPress={sendCode}>
        {busy ? <ActivityIndicator color="#fff" /> : <Text style={s.buttonText}>Send verification code  →</Text>}
      </Pressable>
    </> : <>
      <Text style={s.label}>6-DIGIT OTP</Text>
      <TextInput
        value={code}
        onChangeText={value => { setCode(value.replace(/\D/g, "").slice(0, 6)); setError(""); }}
        keyboardType="number-pad"
        placeholder="••••••"
        placeholderTextColor="#A6A3B4"
        style={s.otpInput}
        maxLength={6}
        editable={!busy}
        accessibilityLabel="Six digit verification code"
      />
      <Pressable style={[s.button, busy && s.buttonDisabled]} disabled={busy} onPress={verifyCode}>
        {busy ? <ActivityIndicator color="#fff" /> : <Text style={s.buttonText}>Verify & continue  →</Text>}
      </Pressable>
      <Pressable style={s.resend} disabled={busy} onPress={sendCode}>
        <Text style={s.resendText}>Didn't receive a code? Resend</Text>
      </Pressable>
    </>}

    {!!error && <Text style={s.error}>{error}</Text>}
    <Text style={s.terms}>By continuing, you agree to our Terms & Privacy Policy. SMS charges may apply.</Text>
  </KeyboardAvoidingView>;
}

const s = StyleSheet.create({
  page:{flex:1,backgroundColor:colors.background,padding:26,paddingTop:60},
  backButton:{minHeight:44,justifyContent:"center",alignSelf:"flex-start"},
  back:{color:colors.purple,fontSize:15,fontWeight:"700"},
  mark:{marginTop:45,width:58,height:58,borderRadius:20,backgroundColor:colors.purple,alignItems:"center",justifyContent:"center"},
  markText:{fontSize:42,color:"#fff",fontWeight:"900",marginTop:-5},
  title:{fontSize:29,fontWeight:"900",color:colors.ink,marginTop:28},
  sub:{fontSize:15,lineHeight:23,color:colors.muted,marginTop:10,marginBottom:36},
  label:{fontSize:11,letterSpacing:1.5,fontWeight:"800",color:colors.muted,marginBottom:10},
  phone:{height:58,backgroundColor:"#fff",borderWidth:1,borderColor:colors.border,borderRadius:15,flexDirection:"row",alignItems:"center",paddingHorizontal:16},
  prefix:{fontSize:16,fontWeight:"800",color:colors.ink,marginRight:12},
  input:{flex:1,fontSize:16,color:colors.ink},
  otpInput:{height:62,backgroundColor:"#fff",borderWidth:1,borderColor:colors.border,borderRadius:15,paddingHorizontal:18,fontSize:26,letterSpacing:12,textAlign:"center",color:colors.ink},
  button:{marginTop:24,backgroundColor:colors.purple,borderRadius:16,padding:18,minHeight:56,alignItems:"center",justifyContent:"center"},
  buttonDisabled:{opacity:.65},
  buttonText:{color:"#fff",fontSize:16,fontWeight:"800"},
  resend:{marginTop:18,minHeight:44,alignItems:"center",justifyContent:"center"},
  resendText:{color:colors.purple,fontSize:14,fontWeight:"700"},
  error:{marginTop:16,color:"#B42318",fontSize:13,lineHeight:19},
  terms:{position:"absolute",bottom:34,left:26,right:26,textAlign:"center",fontSize:11,lineHeight:17,color:colors.muted}
});
