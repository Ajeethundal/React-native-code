import { StyleSheet, Text, View,SafeAreaView,TouchableOpacity,Image,ActivityIndicator,BackHandler,Alert } from 'react-native'
import React, { useState,useEffect } from 'react'
import Axios from 'axios';
// import Edit from '../component/edit';
import {useRoute,useIsFocused} from '@react-navigation/native';
import Appbar from '../component/Appbar';
const Fetchdata = ({navigation}) => {
  const focus=useIsFocused();
    const route = useRoute();
    const email = route.params.email;
    const password = route.params.password;
    const newplace = route.params.place;
    const newadmin = route.params.admin;
    console.log(newplace,"this is new place from fatch data");
    const [isLoading,setisLoading]=useState(true);
    const [fname, setFname] = useState('');
    const [id, setid] = useState('')
    const [place, setplace] = useState('');
    const [insta, setinsta] = useState('');
    const [start, setStart] = useState('');
    const [end, setend] = useState('');
    const [lname, setLname] = useState('');
    const [dob, setDob] = useState('');
    const [amail, setAmail] = useState('');
    const [admin,setAdmin]=useState('');
    const [apassword, setApassword] = useState('');
    const [phone, setPhone] = useState('');
    const loginuser = async () => {
         try {
       const {data} = await Axios.post('https://itechs.co.in/yogaflow/fetch.php/',
        {
          email: email,
          password: password,
        },
      );
      setisLoading(false);
      console.log(data);
      setFname(data[0].fname);
      setLname(data[0].lname);
      setDob(data[0].dob);
      setplace(data[0].place)
      setAmail(data[0].email);
      setPhone(data[0].phone);
      setAdmin(data[0].isadmin);
      setinsta(data[0].instagram);
      setStart(data[0].startdate);
      setend(data[0].enddate);
      setid(data[0].id);
      console.log(id);
     
    } catch (err) {
      console.log('nope not working');
      Alert.alert(
        'Something went worng?',
        'Network Connection Error?',
        [
           {
              text:'back',
              onPress:() => navigation.navigate("Result",{place:newplace,admin:newadmin}),
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
  };

  
  useEffect(()=>{
    if(focus==true){
      loginuser();
    }
  }, [focus]);
  


  const back=()=>{
      
    navigation.navigate("Result",{place:newplace,admin:newadmin});
  return true;
  }
  
  
  
  useEffect(() => {
    if(focus==true){
  BackHandler.addEventListener("hardwareBackPress",back)
}
  },[focus]);

  return (
    <SafeAreaView style={styles.container}>
      <Appbar/>
    { isLoading? (<View style={styles.loader}><ActivityIndicator size="large" color="blue"/></View>):(
      <View>
    <View style={styles.userInfoSectionone}>
      <View style={{flexDirection: 'row', marginTop: 15}}>
      <Image source={require('../Images/avtar.jpg')} style={{height:50,width:50,marginTop:10,borderRadius:80,marginLeft:-15}}          />
        
        <View style={{marginLeft: 20}}>
          <Text style={[styles.title, {
            marginTop:15, 
            marginBottom: 5,
          }]}>{fname} {lname}</Text>
          
        </View>
      </View>
    </View>

    <View style={styles.userInfoSection}>
      <View style={styles.row}>
      <Image source={require('../Images/calendar.png')} style={{height:20,width:20,}} />
        <Text style={{color:"#777777", marginLeft: 20}}>{dob}</Text>
        
      </View>
      <View style={styles.row}>
      <Image source={require('../Images/telephone.png')} style={{height:20,width:20,}} />
        <Text style={{color:"#777777", marginLeft: 20}}>{phone}</Text>
      </View>
      <View style={styles.row}>
      <Image source={require('../Images/gmail.png')} style={{height:20,width:20,}} />
        <Text style={{color:"#777777", marginLeft: 20}}>{amail}</Text>
      </View>
      <View style={styles.row}>
      <Image source={require('../Images/star.png')} style={{height:20,width:20,}} />
        <Text style={{color:"#777777", marginLeft: 20}}>Instagram: {insta}</Text>
        </View>
        <View style={styles.row}>
      <Image source={require('../Images/location.png')} style={{height:20,width:20,}} />
        <Text style={{color:"#777777", marginLeft: 20}}>{place}</Text>
        </View>
      <View style={styles.row}>
      <Image source={require('../Images/settings.png')} style={{height:20,width:20,}} />
        <Text style={{color:"#777777", marginLeft: 20}}>Admin: {admin}</Text>
        </View>
      <View style={styles.row}>
      <Image source={require('../Images/calendar.png')} style={{height:20,width:20,}} />
        <Text style={{color:"#777777", marginLeft: 20}}>Start:  {start}</Text>
        </View>
      <View style={styles.row}>
      <Image source={require('../Images/calendar.png')} style={{height:20,width:20,}} />
        <Text style={{color:"#777777", marginLeft: 20}}>End:  {end}</Text>
        </View>
    </View>
    <View style={{height:'29%',justifyContent:'flex-end',}}>
    <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate("Edituser",{fname:fname,lname:lname,dob:dob,phone:phone,email:email,insta:insta,place:place,admin:admin,start:start,end:end,id:id,password:password,newadmin:newadmin})} >
          <Text style={{color:'#ffffff',fontSize:22,}}>Edit User</Text>
        </TouchableOpacity>
        </View>
    </View>
    )}
  </SafeAreaView>
  )
}

export default Fetchdata

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      userInfoSectionone:{
        paddingHorizontal: 30,
        marginBottom: 25,
        height:'10%',
      },
      userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
        height:'50%',
        
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        color:"#777777"
      },
      loader:{
        minHeight:"100%",
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
       
         },
      caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
      },
      row: {
        flexDirection: 'row',
        marginBottom: 10,
      },
      infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
      },
      infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
      },
      menuWrapper: {
        marginTop: 10,
      },
      menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
      },
      menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
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
      }
})