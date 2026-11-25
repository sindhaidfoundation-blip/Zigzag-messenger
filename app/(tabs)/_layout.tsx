import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../src/theme";

export default function TabLayout() {
  return <Tabs screenOptions={{ headerShown:false, tabBarActiveTintColor:colors.purple, tabBarInactiveTintColor:"#A5A2B3", tabBarStyle:{height:82,paddingTop:10,paddingBottom:20,borderTopColor:colors.border,backgroundColor:"#fff"}, tabBarLabelStyle:{fontSize:11,fontWeight:"700"} }}>
    <Tabs.Screen name="index" options={{title:"Chats",tabBarIcon:({color,size})=><Ionicons name="chatbubbles" color={color} size={size}/>}} />
    <Tabs.Screen name="contacts" options={{title:"Contacts",tabBarIcon:({color,size})=><Ionicons name="people" color={color} size={size}/>}} />
    <Tabs.Screen name="profile" options={{title:"You",tabBarIcon:({color,size})=><Ionicons name="person-circle" color={color} size={size}/>}} />
  </Tabs>;
}
