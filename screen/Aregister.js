import { StyleSheet, Text, View,TextInput,TouchableOpacity,BackHandler,Alert } from 'react-native';
import React from 'react'
import DatePicker from 'react-native-date-picker'
import LinearGradient from 'react-native-linear-gradient';
import {useRoute,useIsFocused} from '@react-navigation/native';
import { useState ,useEffect} from 'react';
import Appbar from '../component/Appbar';

const Aregister = ({navigation}) => {
const focus=useIsFocused();
  const route = useRoute();
  const place = route.params.place;
  const admin = route.params.admin;
  const [ddate, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [sdate,setSdate]=useState('')
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [phone, setPhone] = useState('')
  const [insta, setInsta] = useState('')
  const [dob, setDob] = useState('')
  console.log(place)
  
  const verify=()=>{
    if(fname.length<1 || lname.length<1){
      Alert.alert(
        "CODE GYM",
        "please enter a valid name",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    }
    else if(phone.length!==10 ){
      Alert.alert(
        "CODE GYM",
        "please enter a valid phone number",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    }
    else if(insta<3){
      Alert.alert(
        "CODE GYM",
        "please enter a valid instagram id",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
          }
          else if(sdate.length<0 || dob>=ddate){
            Alert.alert(
              "CODE GYM",
              "please enter a valid dob",
              [
                { text: "OK", onPress: () => console.log("OK Pressed") }
              ]
            );
          }else{
            navigation.navigate("Uregister",{fname:fname,lname:lname,phone:phone,insta:insta,dob:dob,place:place,admin:admin});
          }
        
        }
    const getDate = () => {
        let tempDate = sdate.toString().split(' ');
        return sdate !== ''
          ? `${tempDate[0]} ${tempDate[1]} ${tempDate[2]} ${tempDate[3]}`
          : '';
      };


      const back=()=>{
      
        navigation.navigate("Result",{place:place,admin:admin});
      return true;
      }
      
      useEffect(() => {
        if(focus==true){
      BackHandler.addEventListener("hardwareBackPress",back)
    }
      },[focus]);
  return (
    <View style={styles.maincontainer}>
   <LinearGradient colors={['#256EFF', '#4175fc', '#dcdcdc']} style={styles.container}>
    <Appbar/>
    <View style={styles.inputdiv}>
       <Text style={{color:'#ffffff',marginTop:10,fontSize:24,alignSelf:'center',fontFamily:'sans-serif-light',fontWeight:'400'}}>Person Details?</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        placeholderTextColor="#ffffff"
        keyboardType="text"
        onChangeText={(text)=>setFname(text)}
       />
       <TextInput
        style={styles.input}
        placeholder="Last Name"
        placeholderTextColor="#ffffff"
        keyboardType="text"
        onChangeText={(text)=>setLname(text)}
       />
       <TextInput
        style={styles.input}
        placeholder="Phone"
        placeholderTextColor="#ffffff"
        keyboardType="numeric"
        onChangeText={(text)=>setPhone(text)}
       />
       <TextInput
        style={styles.input}
        placeholder="@Instagram"
        placeholderTextColor="#ffffff"
        keyboardType="text"
        onChangeText={(text)=>setInsta(text)}
       />
         <DatePicker
        modal
        mode="date"
        open={open}
        date={ddate}
        // format="DD-MM-YYYY"
        onConfirm={(date) => {
            // if(date>ddate || date>new Date()){
            //     alert("please enter a valid date")
            // }
            setOpen(false)
            setSdate(date)
            setDob(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
       <TextInput
        style={styles.input}
        placeholder="Dob"
        placeholderTextColor="#ffffff"
        value={getDate()}
        onPressIn={()=> setOpen(true)}
       />
       <Text style={{color:'#ffffff',marginTop:50,alignSelf:'center',fontSize:12,}} onPress={()=> navigation.navigate("Result",{place:place,admin:admin})}>Back?</Text>
       
       </View>
       <View style={{justifyContent:'flex-end',height:'43%'}} >
       <TouchableOpacity style={styles.btn} onPress={verify}>
          <Text style={{color:'#ffffff',fontSize:22,}}>Next</Text>
        </TouchableOpacity>
        </View>
        </LinearGradient>
      
      {/* navigation.navigate("Tworeg",{fname:fname, lname:lname}) */}
    
    </View>
  )
}

export default Aregister

const styles = StyleSheet.create({
    maincontainer:{
        flex:1,
        height:'100%',
        width:'100%',
    },
    container:{
        justifyContent:'space-between',

    },
    inputdiv:{
        height:'50%',
    },
    input: {
        alignSelf:'center',
        width:'70%',
        height: 35,
        marginTop:30,
        borderColor:'#ffffff',
        borderBottomWidth:0.5,
        fontSize:14,
        fontWeight:'200',
        color:'#ffffff'
      },
      btn:{
        alignSelf:'center',
        fontFamily:'sans-serif-thin',
        backgroundColor:'#4175fc',
        width:'70%',
        height:50,
        marginBottom:20,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:50
      }
})