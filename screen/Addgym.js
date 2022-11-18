import { StyleSheet, Text, View,TextInput,TouchableOpacity,BackHandler,ActivityIndicator,Alert } from 'react-native';
import React from 'react'
import { useState,useEffect } from 'react';
import {useRoute,useIsFocused} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Axios from 'axios';
import Appbar from '../component/Appbar';

const Addgym = ({navigation}) => {
  const focus = useIsFocused();
  const route = useRoute();
  const email = route.params.email;
  const password = route.params.password;
  const [done, setDone] = useState('')
  const [isLoading, setisLoading] = useState(false);
  const back=()=>{
      
    navigation.navigate("Results",{email:email,password:password});
return true;
}



useEffect(() => {
  if(focus==true){
  BackHandler.addEventListener("hardwareBackPress",back)
  }
});
    const [place, setPlace] = useState('')
    // const email=0;
    // const password=0;
    const loginuser = async () => {
      try {
          setisLoading(true);
            const {data} = await Axios.post(
              'https://itechs.co.in/yogaflow/addgym.php/',
              {
                
                place:place,
              },
              console.log("control is here")
            );
            // setisLoading(false);
            // // setisLoading(false)
            console.log(data)

            // if(data.status=="done"){
            //   break
            // }
            console.log(data.status);
            var dare = data.status;
            setDone(data);
            console.log(dare)

            if(dare=="done"){
              setisLoading(false);
            navigation.navigate("Results",{email:email,password:password});
            }
          } catch (err){
            console.log('nope not working');
            if(dare!=="done"){
              setisLoading(false);
            Alert.alert(
              'Something went worng?',
              'Network Connection Error?',
              [
                 {
                    text:'cancel',
                    // onPress:() =>  navigation.navigate("Results",{email:email,password:password}),
                  },
                 {
                  text:'Try Again', 
                  onPress: ()=> loginuser(),
                  
                  style:'cancel',
                 },
             ],
             {
               cancelable:false,
              },
              )
            }
            }
         
       };
       const verify=()=>{
        
         if(place.length<3||place.length>20){
          Alert.alert(
            "CODE GYM",
            "please enter a valid name",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          );
          } else{
         
            if(focus==true){
              loginuser();
            }
        }
      
     }
  return (
    <View style={styles.maincontainer}>
      { isLoading? (<View style={styles.loader}><ActivityIndicator size="large" color="blue"/></View>):(
        <LinearGradient colors={['#256EFF', '#4175fc', '#dcdcdc']} style={styles.container}>
     <Appbar/>
    <View style={styles.inputdiv}>

       <Text style={styles.name}>Enter Gym Name?</Text>
      <TextInput
        style={styles.input}
        placeholder="Gym name"
        placeholderTextColor="#ffffff"
        keyboardType="text"
        value={place}
        onChangeText={(text)=>setPlace(text)}
       />
       <Text style={{color:'#ffffff',marginTop:50,alignSelf:'center',fontSize:12,}} onPress={()=> navigation.navigate("Results",{email:email,password:password})}>Back?</Text>
       </View>
       <View style={{justifyContent:'flex-end',height:'40%'}} >
       <TouchableOpacity style={styles.btn} onPress={verify}>
          <Text style={{color:'#ffffff',fontSize:22,}}>ADD GYM</Text>
        </TouchableOpacity>
        </View>
        </LinearGradient>
      
      )}
      {/* navigation.navigate("Tworeg",{fname:fname, lname:lname}) */}
    </View>
  )
}

export default Addgym

const styles = StyleSheet.create({
    maincontainer:{
        flex:1,
        height:'100%',
        width:'100%',
       
    },
    name:{
      color:'#ffffff',
      marginTop:10,
      fontSize:24,
      alignSelf:'center',
      fontFamily:'sans-serif-light'
    },
    container:{
      backgroundGradient: "vertical",
      backgroundGradientTop: "#333333",
      backgroundGradientBottom: "#666666",
        height:'100%',
        width:'100%',
    },
    inputdiv:{
        height:'50%',
        justifyContent:'center',
    },
    input: {
        alignSelf:'center',
        width:'70%',
        height: 45,
        marginTop:50,
        borderColor:"#ffffff",
        borderBottomWidth:0.5,
        fontSize:15,
        fontWeight:'300',
        color:'#000000'
      },
      btn:{
        alignSelf:'center',
        fontFamily:'sans-serif-thin',
        backgroundColor:'#4175fc',
        width:'70%',
        height:50,
        marginBottom:15,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:50
      },
      loader: {
        flex:1, 
        width:'100%',
        height:'100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
})