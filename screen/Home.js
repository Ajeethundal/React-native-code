import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { useState , useEffect } from 'react';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
// import Appbar from '../component/Appbar'

const Home = ({navigation}) => {
  const focus =useIsFocused();
  useEffect(() => {
    if(focus==true){
    setTimeout(async () => {
      const sadmin =  await  AsyncStorage.getItem('keeplogin');
      const admin =  await  AsyncStorage.getItem('login');
      const code =  await  AsyncStorage.getItem('admin');
      const email =  0;
      const password = 0;
      // const isadmin =  await  AsyncStorage.getItem('isadmin');
      // const place =  await  AsyncStorage.getItem('place');
    
      // console.log(sadmin)
      // console.log(email)
      // console.log(password)
      // console.log(place)
     console.log(code,"this is code")
     console.log(admin,"this is admin")

      if(sadmin===null && admin===null){
        navigation.navigate("Login");
      }else if(code==='true'){
        navigation.navigate("Result",{place:admin,admin:code})
      }
      else{
        navigation.navigate("Results",{email:email,password:password});
      }
    }, 300);
  }
  },[focus]);

  return (
    <View style={styles.maincontainer}>
      {/* <Appbar/> */}
      <View style={styles.container}>
        <Image
          source={require('../Images/gym.png')}
          style={{height: height, width: width}}
        />
      </View>
      <View style={styles.btn}>
        {/* <TouchableOpacity
          style={styles.buttonl}
          onPress={() => navigation.navigate('Login')}>
          <Text style={{fontSize: 19, fontWeight: '500', color: '#ffffff'}}>
            Login
          </Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity onPress={()=>{navigation.navigate('Results')}}><Text>varun</Text></TouchableOpacity> */}
        {/* <TouchableOpacity style={styles.buttonl} onPress={()=>navigation.navigate("")}>
          <Text style={{fontSize:19,fontWeight:'500',color:'#ffffff'}}>Register</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default Home;

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  maincontainer: {
    height: '100%',
    backgroundColor: '#ffd60a',
  },
  container: {
    display: 'flex',
    height: '85%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 12,
  },
  buttonl: {
    marginTop: 30,
    width: '70%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4361ee',
    borderRadius: 20,
  },
  buttonr: {
    marginLeft: 30,
    width: 120,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4361ee',
    borderRadius: 10,
  },
});
