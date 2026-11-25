import { router } from "expo-router";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { colors } from "../src/theme";

export default function WelcomeScreen() {
  return <View style={s.page}>
    <View style={s.art}>
      <View style={[s.orb, s.orbOne]} /><View style={[s.orb, s.orbTwo]} />
      <View style={s.logo}><Text style={s.logoText}>z</Text></View>
      <Text style={s.spark}>✦</Text><Text style={s.dot}>●</Text>
    </View>
    <Text style={s.brand}>zigzag</Text>
    <Text style={s.title}>Chat your way.</Text>
    <Text style={s.subtitle}>Good conversations, great connections.{ "\n" }All in one happy place.</Text>
    <Pressable style={s.button} onPress={() => router.push("/login")}><Text style={s.buttonText}>Get started  →</Text></Pressable>
    <Text style={s.foot}>SIMPLE. SECURE. YOURS.</Text>
  </View>;
}
const s = StyleSheet.create({
  page:{ flex:1, backgroundColor:colors.background, alignItems:"center", justifyContent:"center", padding:28 },
  art:{ width:250,height:250,alignItems:"center",justifyContent:"center",marginBottom:20 },
  orb:{ position:"absolute",borderRadius:100 }, orbOne:{ width:210,height:210,backgroundColor:"#EAE4FF",top:20,left:10 },
  orbTwo:{ width:145,height:145,backgroundColor:"#FFDCEB",right:5,bottom:5,opacity:.9 },
  logo:{ width:112,height:112,borderRadius:36,backgroundColor:colors.purple,alignItems:"center",justifyContent:"center",transform:[{rotate:"-8deg"}],elevation:10 },
  logoText:{color:"#fff",fontSize:82,fontWeight:"900",lineHeight:94,marginTop:-8},
  spark:{position:"absolute",top:20,right:30,color:colors.orange,fontSize:38},dot:{position:"absolute",bottom:25,left:24,color:colors.pink,fontSize:22},
  brand:{fontSize:23,fontWeight:"900",letterSpacing:1,color:colors.purple},title:{fontSize:34,fontWeight:"900",color:colors.ink,marginTop:14},
  subtitle:{fontSize:16,lineHeight:25,color:colors.muted,textAlign:"center",marginTop:12},
  button:{backgroundColor:colors.purple,paddingVertical:17,paddingHorizontal:36,borderRadius:18,marginTop:34,width:"100%",alignItems:"center"},
  buttonText:{color:"#fff",fontSize:16,fontWeight:"800"},foot:{fontSize:10,letterSpacing:2,color:colors.muted,marginTop:30,fontWeight:"700"}
});
