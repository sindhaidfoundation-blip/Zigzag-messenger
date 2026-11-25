import { useState } from "react";
import { router } from "expo-router";
import { View, Text, TextInput, StyleSheet, Pressable, Alert } from "react-native";
import { colors } from "../src/theme";
import { isFirebaseConfigured } from "../src/lib/firebase";

export default function LoginScreen() {
  const [phone, setPhone] = useState("");
  return <View style={s.page}>
    <Pressable onPress={() => router.back()}><Text style={s.back}>←  Back</Text></Pressable>
    <View style={s.mark}><Text style={s.markText}>z</Text></View>
    <Text style={s.title}>What's your number?</Text>
    <Text style={s.sub}>We'll send you a verification code to make sure it's really you.</Text>
    <Text style={s.label}>PHONE NUMBER</Text>
    <View style={s.phone}><Text style={s.prefix}>+92</Text><TextInput value={phone} onChangeText={setPhone} keyboardType="phone-pad" placeholder="300 1234567" placeholderTextColor="#A6A3B4" style={s.input} /></View>
    <Pressable style={s.button} onPress={() => Alert.alert("Phone verification", isFirebaseConfigured ? "Firebase is configured. OTP verification flow is the next integration step." : "Add your Firebase settings to .env and enable Phone Authentication to activate OTP.")}><Text style={s.buttonText}>Continue  →</Text></Pressable>
    <Text style={s.terms}>By continuing, you agree to our Terms & Privacy Policy.</Text>
  </View>;
}
const s=StyleSheet.create({
 page:{flex:1,backgroundColor:colors.background,padding:26,paddingTop:60},back:{color:colors.purple,fontSize:15,fontWeight:"700"},
 mark:{marginTop:55,width:58,height:58,borderRadius:20,backgroundColor:colors.purple,alignItems:"center",justifyContent:"center"},markText:{fontSize:42,color:"#fff",fontWeight:"900",marginTop:-5},
 title:{fontSize:29,fontWeight:"900",color:colors.ink,marginTop:28},sub:{fontSize:15,lineHeight:23,color:colors.muted,marginTop:10,marginBottom:36},
 label:{fontSize:11,letterSpacing:1.5,fontWeight:"800",color:colors.muted,marginBottom:10},phone:{height:58,backgroundColor:"#fff",borderWidth:1,borderColor:colors.border,borderRadius:15,flexDirection:"row",alignItems:"center",paddingHorizontal:16},
 prefix:{fontSize:16,fontWeight:"800",color:colors.ink,marginRight:12},input:{flex:1,fontSize:16,color:colors.ink},button:{marginTop:24,backgroundColor:colors.purple,borderRadius:16,padding:18,alignItems:"center"},buttonText:{color:"#fff",fontSize:16,fontWeight:"800"},
 terms:{position:"absolute",bottom:34,left:26,right:26,textAlign:"center",fontSize:11,color:colors.muted}
});
