import { router } from "expo-router";
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { chats } from "../../src/data/mock";
import { colors } from "../../src/theme";

export default function ChatsScreen() {
  return <View style={s.page}>
    <View style={s.header}><View><Text style={s.kicker}>YOUR LITTLE CORNER</Text><Text style={s.title}>Messages<Text style={{color:colors.purple}}>.</Text></Text></View><Pressable style={s.add}><Ionicons name="create-outline" size={23} color={colors.purple}/></Pressable></View>
    <View style={s.search}><Ionicons name="search" size={19} color={colors.muted}/><Text style={s.searchText}>Search conversations</Text></View>
    <Text style={s.section}>RECENT CHATS</Text>
    <FlatList data={chats} keyExtractor={x=>x.id} contentContainerStyle={{paddingBottom:24}} renderItem={({item})=><Pressable style={s.chat} onPress={()=>router.push({pathname:"/chat/[id]",params:{id:item.id,name:item.name}})}>
      <View style={[s.avatar,{backgroundColor:item.color}]}><Text style={s.initials}>{item.initials}</Text>{item.online&&<View style={s.online}/>}</View>
      <View style={s.info}><Text style={s.name}>{item.name}</Text><Text style={s.message} numberOfLines={1}>{item.message}</Text></View>
      <View style={s.meta}><Text style={s.time}>{item.time}</Text>{item.unread?<View style={s.badge}><Text style={s.badgeText}>{item.unread}</Text></View>:null}</View>
    </Pressable>}/>
    <Pressable style={s.fab} onPress={()=>router.push("/contacts")}><Ionicons name="add" size={29} color="#fff"/></Pressable>
  </View>;
}
const s=StyleSheet.create({
 page:{flex:1,backgroundColor:colors.background,paddingTop:62,paddingHorizontal:22},header:{flexDirection:"row",justifyContent:"space-between",alignItems:"center"},kicker:{fontSize:10,letterSpacing:1.6,color:colors.muted,fontWeight:"800"},title:{fontSize:34,fontWeight:"900",color:colors.ink,marginTop:4},add:{width:46,height:46,borderRadius:16,backgroundColor:colors.lavender,alignItems:"center",justifyContent:"center"},
 search:{height:50,backgroundColor:"#fff",borderRadius:15,marginTop:24,flexDirection:"row",alignItems:"center",paddingHorizontal:15,gap:10},searchText:{color:"#A6A3B4",fontSize:14},section:{fontSize:10,letterSpacing:1.5,fontWeight:"900",color:colors.muted,marginTop:28,marginBottom:10},
 chat:{flexDirection:"row",alignItems:"center",paddingVertical:14,borderBottomWidth:1,borderBottomColor:colors.border},avatar:{width:54,height:54,borderRadius:19,alignItems:"center",justifyContent:"center"},initials:{fontSize:15,fontWeight:"900",color:colors.ink},online:{position:"absolute",right:0,bottom:0,width:13,height:13,borderRadius:7,backgroundColor:colors.green,borderWidth:2,borderColor:colors.background},
 info:{flex:1,marginLeft:13},name:{fontSize:15,fontWeight:"800",color:colors.ink},message:{fontSize:12,color:colors.muted,marginTop:5},meta:{alignItems:"flex-end",gap:8},time:{fontSize:10,color:colors.muted},badge:{minWidth:20,height:20,paddingHorizontal:5,borderRadius:10,backgroundColor:colors.purple,alignItems:"center",justifyContent:"center"},badgeText:{fontSize:10,color:"#fff",fontWeight:"800"},
 fab:{position:"absolute",right:24,bottom:26,width:58,height:58,borderRadius:20,backgroundColor:colors.purple,alignItems:"center",justifyContent:"center",elevation:6}
});
