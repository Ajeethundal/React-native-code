import { StyleSheet, Text, View,TextInput,TouchableOpacity,BackHandler,Alert,ActivityIndicator } from 'react-native';
import React from 'react'
import Axios from 'axios';
import DatePicker from 'react-native-date-picker'
import LinearGradient from 'react-native-linear-gradient';
import { Dropdown } from 'react-native-element-dropdown';
import {useRoute} from '@react-navigation/native';
import { useState,useEffect } from 'react';
import Appbar from '../component/Appbar';

const Edituser = ({navigation}) => {
  const coll = [
    { label: 'True', value: 'true' },
    { label: 'False', value: 'false' },
  ];
    const route = useRoute();
    const id = route.params.id;
    const fname = route.params.fname;
    const lname = route.params.lname;
    const dob = route.params.dob;
    const email = route.params.email;
    const phone = route.params.phone;
    const insta = route.params.insta;
    const place = route.params.place;
    const admin = route.params.admin;
    const start = route.params.start;
    const end = route.params.end;
    const password=route.params.password;
    const newadmin=route.params.newadmin;
    //date
    const getDate = () => {
        let tempDate = sdate.toString().split(' ');
        
        return sdate !== ''
          ? `${tempDate[0]} ${tempDate[1]} ${tempDate[2]} ${tempDate[3]}`
          : '';
      };
    const [nodob, setnodob] = useState(dob)
    const [enob, setenob] = useState(end)
    const [ddate, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [isLoading, setisLoading] = useState(false)
    const [sdate,setSdate]=useState(dob)
    const [nfname, setFname] = useState(fname)
    const [openn, setOpenn] = useState(false)
    const [nlname, setlname] = useState(lname)
    const [ndob, setdob] = useState(getDate())
    const [done, setDone] = useState('')
    const [nemail, setemail] = useState(email)
    const [nphone, setphone] = useState(phone)
    const [ninsta, setinsta] = useState(insta)
    const [nplace, setplace] = useState(place)
    const [nadmin, setadmin] = useState(admin)
    const [nstart, setstart] = useState(start)
    const [nend, setend] = useState(end)
    console.log(nfname)

  
   
    const geteDate = () => {
      let tempDate = nend.toString().split(' ');
      return nend !== ''
        ? `${tempDate[0]} ${tempDate[1]} ${tempDate[2]} ${tempDate[3]}`
        : '';
    };
    const [value, setValue] = useState(null);
const [isFocus, setIsFocus] = useState(false);
//api
const varify=()=>{
  if(nfname.length<1 ||nlname.length<1){
  alert("please enter a valid name")
  }
  else if(nphone.length!==10 ){
    alert("please enter a valid phone number")
   }
   else if(ninsta.length<3){
     alert("please enter a valid insta id")
   }
   else if(sdate.length<1){
    alert("Please enter Dob date")
  }
  else if(end.length<1){
    alert("please enter end date")
  }
   else{  
     const loginuser = async () => {
        setisLoading(true);
          try {
        const {data} = await Axios.post('https://itechs.co.in/yogaflow/update.php/',
         {
           fname:nfname,
           lname:nlname,
           phone:nphone,
           insta:ninsta,
           dob:nodob,
           edate:enob,
           admin:value,
           id:id,
         },
         
         );
         var dare = data.status;
         setDone(data);
         console.log(dare)
         console.log(fname);
         if(dare=="done"){
           navigation.navigate("Result",{place:place,admin:newadmin})
          }
       
       console.log(fname);
     } catch (err) {
       console.log('nope not working');
       Alert.alert(
        'Something went worng?',
        'Network Connection Error?',
        [
           {
              text:'cancel',
              // onPress:() =>navigation.navigate("Fetchdata",{email:email,password:password}),
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
     setisLoading(false);
   }; 
   loginuser();

  }
  }
  console.log(id)
  console.log(nlname)
  console.log(nfname)
  const back=()=>{
      
    navigation.navigate("Fetchdata",{email:email,password:password,place:place,admin:newadmin});
return true;
}



useEffect(() => {
BackHandler.addEventListener("hardwareBackPress",back)
});
  return (
    <View style={styles.maincontainer}>
       { isLoading? (<View style={styles.loader}><ActivityIndicator size="large" color="blue"/></View>):(
        <LinearGradient colors={['#256EFF', '#4175fc', '#dcdcdc']} style={styles.container}>
    <Appbar/>
    <View style={styles.inputdiv}>
       <Text style={{color:'#ffffff',marginTop:10,fontSize:24,alignSelf:'center',fontFamily:'sans-serif-light'}}> Edit User?</Text>
       <View style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
       <Text style={{color:'#ffffff',marginTop:32,marginRight:30,fontSize:13,marginleft:0}}>Fname:-</Text>
      <TextInput
        style={styles.input}
         placeholder="First Name"
         placeholderTextColor="#ffffff"
        keyboardType="text"
        onChangeText={setFname}
        value={nfname}
       />
       </View>
       <View style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
       <Text style={{color:'#ffffff',marginTop:32,marginRight:30,fontSize:13,marginleft:0}}>Lname:-</Text>
       <TextInput
        style={styles.input}
        // placeholder="Last Name"
        // placeholderTextColor="#ffffff" 
        keyboardType="text"
        onChangeText={setlname}
        value={nlname}
       />
       </View>
       <View style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
       <Text style={{color:'#ffffff',marginTop:33,marginRight:30,fontSize:13,marginleft:0}}>Phone:-</Text> 
       <TextInput
        style={styles.input}
        // placeholder="Phone"
        // placeholderTextColor="#ffffff"
        keyboardType="text"
        onChangeText={setphone}
        value={nphone}
       />
       </View>
       <View style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
       <Text style={{color:'#ffffff',marginTop:35,marginRight:30,fontSize:13,marginleft:0}}>Insta:-</Text> 
       <TextInput
        style={styles.input}
        // placeholder="@Instagram"
        // placeholderTextColor="#ffffff"
        keyboardType="text"
        onChangeText={setinsta}
        value={ninsta}
       />
       </View>
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
            setnodob(date)

        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
            <View style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
       <Text style={{color:'#ffffff',marginTop:32,marginRight:35,fontSize:13,marginleft:0}}>Dob:-</Text> 
       <TextInput
        style={styles.input}
        placeholder="Dob"
        placeholderTextColor="#ffffff"
        value={getDate()}
        // onChange={setdob}
        onPressIn={()=> setOpen(true)}
       />
        </View>
       {/* <TextInput
        style={styles.input}
        placeholder="Location"
        placeholderTextColor="#ffffff"
        keyboardType="text"
        onChangeText={setplace}
        value={nplace}
       /> */}
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
            setenob(date)
           
        }}
        onCancel={() => {
          setOpenn(false)
        }}
      />
      
      <View style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
       <Text style={{color:'#ffffff',marginTop:33,marginRight:15,fontSize:13,marginleft:0}}>End date:-</Text> 
        <TextInput
        style={styles.input}
        placeholder="End date"
        placeholderTextColor="#ffffff"
        value={geteDate()}
        onPressIn={()=> setOpenn(true)}
       />
       </View>
       <View style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
       <Text style={{color:'#ffffff',marginTop:38,marginRight:30,fontSize:13,marginleft:0}}>Admin:-</Text> 
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
        placeholder={!isFocus ? 'Select ' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}
      />
       </View>
        
       {/* <Text style={{color:'#0096c7',marginTop:50,alignSelf:'center',fontSize:12,}} onPress={()=>navigation.navigate("Result")}>Uesr?</Text> */}
       
       </View>
       <View style={{justifyContent:'flex-end',height:'41%'}} >
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

export default Edituser

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
    textinop:{
      color:'#ffffff',
      marginTop:40,
      marginRight:20,
      fontSize:13,
      marginleft:0
    },
    input: {
        alignSelf:'center',
        width:'70%',
        height: 35,
        marginTop:40,
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
        color:'#0096c7'
      },
      selectedTextStyle: {
        fontSize: 13,
        color:'#000'
      },
      iconStyle: {
        width: 20,
        height: 20,
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