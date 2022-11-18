//login screen
import { StyleSheet, Text, TouchableOpacity, View, Alert,ActivityIndicator,Image,BackHandler } from 'react-native';
import React from 'react';
import Axios from 'axios';
import { useState, } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [isadmin,setisadmin]=useState("")
   const [isLoading,setisLoading]=useState(false)
     const [fname, setfname] = useState('');
         const [status, setstatus] = useState('');
   const [place,setPlace]=useState('')
   // const [, set] = useState(second)
  
const varify=()=>{
   if(email.length<3 || email.indexOf("@") == -1 || email.indexOf(".")==-1){
      Alert.alert(
         "CODE GYM",
         "please enter a valid email",
         [
           { text: "OK", onPress: () => console.log("OK Pressed") }
         ]
       );
   
   }else if(password.length<5){
      Alert.alert(
         "CODE GYM",
         "please enter a valid password",
         [
           { text: "OK", onPress: () => console.log("OK Pressed") }
         ]
       );
   }else{
   const loginuser = async () => {
      setisLoading(true)
      try {
         const {data} = await Axios.post("https://itechs.co.in/yogaflow/login.php/", {
            email: email,
            password: password,
            
         });
         setisLoading(false);
         console.log(data);
         // console.log(data.place,"no ho")
         // setPlace(data.place)
         // setisadmin(data.isadmin)
         // console.log(data.status,"this is status");
         // console.log(place,"place is here")
       
           setfname(data[0].fname)
           setstatus(data.status);
           console.log(status)
           console.log(fname)
         if(fname.length>3){
            const arr=[data]
            
            AsyncStorage.setItem('keeplogin',JSON.stringify(arr));
            // AsyncStorage.setItem('email',JSON.stringify(data.email));
            // AsyncStorage.setItem('isadmin',JSON.stringify(data.isadmin));
            // AsyncStorage.setItem('pass',JSON.stringify(data.password));
            // AsyncStorage.setItem('place',JSON.stringify(data.place));
          if(data[0].sadmin!=0){
          navigation.navigate("Results",{email:email,password:password});
          }
          else if(data[0].isadmin=="true"){
            navigation.navigate("Result",{place:place})
          }
          else{
            alert("You are not an admin")
            // navigation.navigate("Home");
          }
         } else {
          alert('please enter valid username or password')
         }

        //  var okData1 = new FormData();
        //  okData1.append('email', email)
        //  okData1.append('password', password)

        //  await Axios.post('http://192.168.29.203/api/login.php', okData1).then((result) => {
        //     console.log("🚀  file: webview-checkout.js  line 350  axios.post  result", result)
        //  }).catch((err) => {
        //     console.log("🚀  file: webview-checkout.js  line 346  axios.post  err", err)
        //  })



      } catch (err) {
         console.log(err);
       
   //       Alert.alert(
   //          'Something went worng?',
   //          'Network Connection Error?',
   //          [
   //             {
   //                text:'cancel',
   //                 onPress:() => setisLoading(false),
   //              },
   //             {
   //              text:'Try Again', 
   //              onPress: ()=> loginuser(),
                
   //              style:'cancel',
   //             },
   //         ],
   //         {
   //           cancelable:false,
   //         },
 
   //   );
      }
   
   };
   loginuser();
}
}

   return (
      
      <View style={styles.maincontainer}>
         { isLoading? (<View style={styles.loader}><ActivityIndicator size="large" color="blue"/></View>):(
        <View style={styles.con}>
         <View style={styles.container}>
            <View style={styles.img}>
         <Image source={require('../Images/log.gif')} style={{height:200,width:200,alignSelf:'center'}} />
         </View>
            <View style={styles.inputdiv}>
               <TextInput style={styles.input} placeholder="USER EMAIL" placeholderTextColor="#0096c7" keyboardType="text" onChangeText={(text) => setEmail(text)} value={email}/>
               <TextInput style={styles.input} placeholder="PASSWORD" placeholderTextColor="#0096c7" keyboardType="text" onChangeText={(text) => setPassword(text)} secureTextEntry={true} value={password} />
               <TouchableOpacity onPress={()=>navigation.navigate("Register")}>
               {/* <Text style={{ color: '#0096c7', marginTop: 50, alignSelf: 'center', fontSize: 12, } }>Register now?</Text> */}
               </TouchableOpacity>
            </View >
            <View style={styles.btncon}>
            <TouchableOpacity style={styles.btn} onPress={varify}>
               <Text style={{ color: '#ffffff', fontSize: 22, }}>Log in</Text>
            </TouchableOpacity>
            </View>
         </View>

         </View>
      )}

      </View>
   ) 
}

export default Login

const styles = StyleSheet.create({
  maincontainer:{
    height:'100%',
    width:'100%',
    backgroundColor:'#f5f5f5',
    justifyContent:'center',
    alignItems:'center',
  },
  con:{
   height:"100%",
   width:"100%"
  },
  container:{
    width:'100%',
    height:'100%',
   
    justifyContent:"space-between",
    alignContent:'center',
  },
  inputdiv:{
   marginTop:20,
    justifyContent:"flex-start",
    height:"60%",
  },
  input: {
    alignSelf:'center',
    width:'70%',
    height: 40,
    marginTop:60,
    borderBottomWidth:0.5,
    fontSize:13,
    fontWeight:'100',
    color:'#000000'
  },
  btncon:{
  height:"20%",
  justifyContent:'flex-end',

  },
  img:{
height:'20%'
  },
  loader:{
   minHeight:"100%",
   minWidth:'100%',
   display:'flex',
   justifyContent:'center',
   alignItems:'center',
  
    },
  btn:{
    marginBottom:30,
    alignSelf:'center',
    fontFamily:'sans-serif-thin',
    backgroundColor:'#4175fc',
    width:'70%',
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:50
  }
})