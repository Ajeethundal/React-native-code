import { StyleSheet, Text, View, FlatList,TouchableOpacity,ActivityIndicator,Image,ScrollView,BackHandler,Alert } from 'react-native'
import React from 'react'
import {useRoute,useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState,useEffect } from 'react';
import Axios from 'axios';
import Appbar from '../component/Appbar';
const Result = ({navigation}) => {
   const route = useRoute();
   const place = route.params.place;
   const admin = route.params.admin;
 
   console.log(admin,"this is admin");
   const email = route.params.email;
   const password = route.params.password;
   console.log(place,"hello");
   const [isLoading, setisLoading] = useState(true);
   const [coco, setcoco] = useState(false);
   console.log(admin,"this is admin")
    const [fix, setFix] = useState('');
    const [empty, setempty] = useState(false);
   const loginuser = async () => {
    setisLoading(true);
     try {
      const {data} = await Axios.post(
        'https://itechs.co.in/yogaflow/userf.php/',
        {
          place:place,
        },
      );
   
      console.log(data)
      setFix(data)
      if(data<10){
        setempty(true)
      }else{
        console.log("hello ajeet")
      }
    } catch (err) {
      console.log('nope not working');
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
      setisLoading(false)
    };

    
    const back=()=>{
      if(admin!=='true'){
      navigation.navigate("Results",{email:email,password:password});
    }else{
      Alert.alert(
        'Exit App?',
        'Existing The Application?',
        [
           {
             text:'cancel',
             onPress: ()=>{
               console.log("bybybybybyby");
              },
            style:'cancel',
          },
          {
            text:'OK',
            onPress:() => BackHandler.exitApp(),
          },
        ],
        {
          cancelable:false,
       },
       
       );
      }
       return true;
    }
    
     useEffect(() => {
      if(focus==true){
      BackHandler.addEventListener("hardwareBackPress",back)
    }
    });


    const focus= useIsFocused(); 

    useEffect(() => {  
      if(focus == true){
        loginuser();
      }
  }, [focus]);
  const clear=()=>{
    const _clearAll = async () => {
      try {
      await AsyncStorage.clear();
      console.log('Done');
      } catch (error) {
      console.log(error);
      }
      };
    
      
      _clearAll();
      navigation.navigate("Login");
    }
    const setadmin=()=>{
      if(admin!==undefined){
        console.log("admin is true")
        setcoco(true);
       }else{
        console.log("admin is undeifine")
       }
    }
    useEffect(() => {
      if(focus==true){
      setadmin();
      }
    },[focus])
    
 
  return (
    
    <View style={{flex:1,backgroundColor:'#dcdcdc'}} >
      
      <Appbar/>
      { isLoading? (<View style={styles.loader}><ActivityIndicator size="large" color="blue"/></View>):(
      
      <View style={{height:"100%",width:"100%",flex:1,backgroundColor:'#ffffff'}}>
      <View style={{justifyContent:'center',alignItems:'center',flex:1,marginTop:5}}>
      { coco? ( <View style={styles.btncol}>
            <TouchableOpacity
          style={styles.buttonl}
          onPress={clear}>
             <Image source={require('../Images/logout.png')} style={{height:38,width:38}} />
        </TouchableOpacity>
        </View>):(
     <View style={styles.btncol}></View>
      )}
        <View style={styles.btncon}>
            <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate("Aregister",{place:place,admin:admin})}>
            <Image source={require('../Images/addss.png')} style={{height:25,width:25}} />
            </TouchableOpacity>
            </View>
            <View style={styles.bobf}>
            <Text style={{color:'#ffffff',backgroundColor:'#8338ec',fontSize:20,alignSelf:'center'}}>{place}</Text>
            </View>
            { empty? (<View style={styles.loader}><Text style={{color:'#000',fontSize:20}}>No data found</Text></View>):(
              
      <FlatList
        data={fix}
        renderItem={({item}) => {return(
          <TouchableOpacity style={styles.bob} onPress={()=>navigation.navigate("Fetchdata",{email:item.email,password:item.password,place:place,admin:admin})}>
          <View style={styles.menuItem}>
          <Image source={require('../Images/avtar.jpg')} style={{height:25,width:25,marginTop:4,borderRadius:10}} />
          <Text style={{color: 'white',fontSize:20,marginLeft:10}}>{item.fname} {item.lname}</Text>
          </View>
          <View style={styles.menuItem}>
          <Image source={require('../Images/telephone.png')} style={{height:25,width:25,marginTop:4}} />
          <Text style={{color: 'white',fontSize:20,marginLeft:10}}> {item.phone}</Text>
          </View>
          <View style={styles.menuItem}>
          <Image source={require('../Images/location.png')} style={{height:25,width:25,marginTop:4}} />
          <Text style={{color: 'white',fontSize:20,marginLeft:10}}> {item.place}</Text>
          </View>
        
       
        
        </TouchableOpacity>
      //   <TouchableOpacity onPress={() => {}}>
      //   <View style={styles.menuItem}>
      //   <Image source={require('../Images/logout.png')} style={{height:20,width:20,}} />
      //     <Text style={styles.menuItemText}>Log Out</Text>
      //   </View>
      // </TouchableOpacity>
        )}}
      />
      )}

      </View>


      </View>
      )}
    </View>
  
  
  )
}

export default Result

const styles = StyleSheet.create({
   bob: {
      justifyContent: 'center',
      alignItems: 'flex-start',
      backgroundColor: '#8338ec',
      marginTop: 15,
      width: 350,
      height: 150,
      borderRadius: 20,
    },
    bobf:{
      justifyContent: 'center',
      alignItems: 'flex-start',
      backgroundColor: '#8338ec',
      marginTop: 15,
      width: 350,
      height: 50,
      borderRadius: 20,
    },
    loader: {
      flex:1, 
      width:'100%',
      height:'100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      flex: 1,
      backgroundColor: '#256EFF',
    },
    userInfoSection: {
      paddingHorizontal: 30,
      marginBottom: 25,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color:"#777777"
    },
    // loader:{
    //   minHeight:"100%",
    //   display:'flex',
    //   justifyContent:'center',
    //   alignItems:'center'
     
    //    },
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
      paddingVertical: 5,
      paddingHorizontal: 20,
    },
    menuItemText: {
      color: '#777777',
      marginLeft: 20,
      fontWeight: '600',
      fontSize: 16,
      lineHeight: 10,
    },
    btn:{
    
      alignSelf:'center',
      fontFamily:'sans-serif-thin',
      backgroundColor:'#8338ec',
      width:45,
      height:45,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:100
    },
    btncon:{
      width:'10%',
      justifyContent:'flex-end',
      alignItems:'flex-end',
      marginTop:-80,
      marginLeft:340
      },
      btncol:{
        height:"10%",
         marginRight:300,
        justifyContent:'flex-start',
        alignItems:'center',
        marginTop:-45
      
      },
      buttonl:{
        marginBottom:10,
        marginRight:50,
        marginLeft:15
      }
})
 