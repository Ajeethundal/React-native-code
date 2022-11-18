import { StyleSheet, Text, View,TextInput,TouchableOpacity,Image,BackHandler,ActivityIndicator,Alert  } from 'react-native';
import React from 'react'
import Axios from 'axios';
import { Dropdown } from 'react-native-element-dropdown';
import DatePicker from 'react-native-date-picker'
import LinearGradient from 'react-native-linear-gradient';
import {useRoute,useIsFocused} from '@react-navigation/native';
import { useState,useEffect } from 'react';
import Appbar from '../component/Appbar';

const Uregister = ({navigation}) => {
  const focus=useIsFocused();
  const coll = [
    { label: 'True', value: 'true' },
    { label: 'False', value: 'false' },
  ];
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [ddate, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [isLoading, setisLoading] = useState(false);
    const [openn, setOpenn] = useState(false)
    const [start, setstart] = useState('')
    const [done, setDone] = useState('')
    const [end, setend] = useState('')
    const [cpassword, setCpassword] = useState('')
    const route = useRoute();
    const fname= route.params.fname
    const lname= route.params.lname
    const phone= route.params.phone
    const insta= route.params.insta
    const dob= route.params.dob
    const place= route.params.place
    const admin= route.params.admin

  const varify=()=>{
if(email<3 || email.indexOf("@") == -1 || email.indexOf(".")==-1){
  Alert.alert(
    "CODE GYM",
    "please enter a valid email",
    [
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ]
  );
}
else if(password==""||password.length<6){
  Alert.alert(
    "CODE GYM",
    "please enter a valid password",
    [
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ]
  );
 }
 else if(password!==cpassword){
  Alert.alert(
    "CODE GYM",
    "password does not match",
    [
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ]
  );

 }
 else if(start.length<1){
  Alert.alert(
    "CODE GYM",
    "please enter a valid start date",
    [
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ]
  );

}
else if(end.length<1 || end<start){
  Alert.alert(
    "CODE GYM",
    "please enter a valid end date",
    [
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ]
  );
}
 else{   const loginuser = async () => {
  setisLoading(true);
        try {
      const {data} = await Axios.post('https://itechs.co.in/yogaflow/register.php/',
       {
         email: email,
         password: password,
         fname:fname,
         lname:lname,
         phone:phone,
         insta:insta,
         dob:dob,
         place:place,
         start:start,
         end:end,
         admin:value,
       },

       );
       var dare = data.status;
       setDone(data);
       console.log(dare)
       console.log(fname);
       if(dare=="done"){
         navigation.navigate("Result",{place:place,admin:admin})
        }
      } catch (err) {
        console.log('nope not working');
        
      if(dare!=="done"){   
     Alert.alert(
       'Something went worng?',
       'Network Connection Error?',
       [
         {
           text:'cancel',
           // onPress:() => navigation.navigate("Aregister",{place:place}),
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
      
      setisLoading(false)
      // useEffect(() => { 
    //   if(focus==true){
    //    network();
    //   }
    // },[focus]);
   }

 }; 

    loginuser();

}
}

//
 const [sdate, setsdate] = useState('')
 const [edate, setedate] = useState('')

const getDate = () => {
  let tempDate = sdate.toString().split(' ');
  return sdate !== ''
    ? `${tempDate[0]} ${tempDate[1]} ${tempDate[2]} ${tempDate[3]}`
    : '';
};
const geteDate = () => {
  let tempDate = edate.toString().split(' ');
  return edate !== ''
    ? `${tempDate[0]} ${tempDate[1]} ${tempDate[2]} ${tempDate[3]}`
    : '';
};
const [value, setValue] = useState(null);
const [isFocus, setIsFocus] = useState(false);
console.log(value)
const back=()=>{
      
  navigation.navigate("Aregister",{place:place,admin:admin});
return true;
}



useEffect(() => {
  if(focus==true){
    BackHandler.addEventListener("hardwareBackPress",back)
  }
},[focus]);
  return (
    <View style={styles.maincontainer}>
      { isLoading? (<View style={styles.loader}><ActivityIndicator size="large" color="blue"/></View>):(

<LinearGradient colors={['#256EFF', '#4175fc', '#dcdcdc']} style={styles.container}>
    <Appbar/>
    <View style={styles.inputdiv}>
       <Text style={{color:'#ffffff',marginTop:10,fontSize:24,alignSelf:'center',fontFamily:'sans-serif-light'}}>Enter Email Password?</Text>
      <TextInput
        style={styles.input}
        placeholder="Email@"
        placeholderTextColor="#ffffff"
        keyboardType="text"
        onChangeText={(text)=>setEmail(text)}
       />
       <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#ffffff"
        keyboardType="text"
        onChangeText={(text)=>setPassword(text)}
        secureTextEntry={true}
       />
       <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#ffffff"
        keyboardType="text"
        onChangeText={(text)=>setCpassword(text)}
        secureTextEntry={true}
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
            setstart(date)
            setsdate(date)
           
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
         <TextInput
        style={styles.input}
        placeholder="Start date"
        placeholderTextColor="#ffffff"
        value={getDate()}
        onPressIn={()=> setOpen(true)}
       />
       <DatePicker
        modal
        mode="date"
        open={openn}
        date={ddate}
        // format="DD-MM-YYYY"
        onConfirm={(date) => {
            // if(date>ddate || date>new Date()){
            //     alert("please enter a valid date")
            // }
            setOpenn(false)
            setend(date)
            setedate(date)
        }}
        onCancel={() => {
          setOpenn(false)
        }}
      />
         <TextInput
        style={styles.input}
        placeholder="End date"
        placeholderTextColor="#ffffff"
        value={geteDate()}
        onPressIn={()=> setOpenn(true)}
       />
        <Dropdown
        style={[styles.input, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={coll}
        itemTextStyle={{color:'#000'}}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select Admin' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}
      />
       
       {/* <Text style={{color:'#0096c7',marginTop:50,alignSelf:'center',fontSize:12,}} onPress={()=>navigation.navigate("Aregister",{place:place})}>Back?</Text> */}
       </View>
       <View style={{justifyContent:'flex-end',height:'12%'}}>
       <TouchableOpacity style={styles.btn} onPress={varify}>
          <Text style={{color:'#ffffff',fontSize:22,}}>Submit</Text>
          
        </TouchableOpacity>
        </View>
        </LinearGradient>
      )}
      
      {/* navigation.navigate("Tworeg",{fname:fname, lname:lname}) */}
    
    </View>
  )
}

export default Uregister

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
        height:'80%',
     
        alignItems:'center'
    },
    input: {
        alignSelf:'center',
        width:'70%',
        height: 45,
        marginTop:30,
        borderColor:'#ffffff',
        borderBottomWidth:0.5,
        fontSize:14,
        fontWeight:'300',
        color:'#ffffff'
      },
      btn:{
        alignSelf:'center',
        fontFamily:'sans-serif-thin',
        backgroundColor:'#4175fc',
        width:'70%',
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:50
      },
      dropdown: {
        height: 60,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
      },
      icon: {
        marginRight: 5,
      },
      label: {
        position: 'absolute',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
      },
      placeholderStyle: {
        fontSize: 13,
        color:'#ffffff'
      },
      selectedTextStyle: {
        fontSize: 13,
        color:'#ffffff'
      },
      iconStyle: {
        width: 20,
        height: 20,
        color:'#ffffff'
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
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