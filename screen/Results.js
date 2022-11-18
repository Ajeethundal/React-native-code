import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  FlatList,
  BackHandler,
  Alert,
} from 'react-native';
import React, {useEffect} from 'react';
import Axios from 'axios';
import {useState} from 'react';
import {useRoute,useIsFocused} from '@react-navigation/native';
import Appbar from '../component/Appbar';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {TouchableOpacity} from 'react-native-gesture-handler';
import { set } from 'react-native-reanimated';

const Results = ({navigation}) => {
  const focus= useIsFocused(); 
  const route = useRoute();
  // const isadmin = route.params.isadmin;
  const email = route.params.email;
  // const place = route.params.place;
  const password = route.params.password;
  // console.log(isadmin,"hello admin");
  // if(isadmin=="true"){
  //   navigation.navigate("Result",{place:place,isadmin:isadmin})
  // }else{
  //   console.log("you are a super admin")
  // }
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [isLoading, setisLoading] = useState(true);
  const [dob, setDob] = useState('');
  const [amail, setAmail] = useState('');
  const [apassword, setApassword] = useState('');
  const [phone, setPhone] = useState('');
  const [sadmin, setSadmin] = useState('');
  const [data, setdata] = useState('');

  // const [adata,setAdata]=useState("");

  const renderCategoriesItem = ({ item }) => (<TopCategoriesItem item={item} />);

  
  // useEffect(() => {
  //   loginuser();
  // }, []);
  const back=()=>{
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
    return true;
  }
  

  useEffect(() => {
    if(focus==true){
    BackHandler.addEventListener("hardwareBackPress",back)
  }
  });
  const loginuser = async () => {
 

    var okData1 = new FormData();
    okData1.append('email', email);
    okData1.append('password', password);
  

     await Axios
      .post('https://itechs.co.in/yogaflow/result.php/', okData1)
      .then(result => {
        console.log(
          '🚀  file: webview-checkout.js  line 350  axios.post  result',
          result['data'],
        );
        setdata(result['data'])
        console.log(data);
        setFname(result['data'])
        setisLoading(false)
      })
      .catch(err => {
        // Alert.alert("Network Connection Error",
        // [
        //   {
        //     text:"Try Again",
        //     onPress:loginuser
        //   }
        // ]);
        console.log(
          '🚀  file: webview-checkout.js  line 346  axios.post  err',
          err,
          Alert.alert(
            'Something went worng?',
            'Network Connection Error?',
            [
               {
                  text:'cancel',
                  // onPress:() =>navigation.navigate("Login"), 
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
        );
      });
  };




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
  return (
    <SafeAreaView style={styles.container}>
        { isLoading? (<View style={styles.loader}><ActivityIndicator size="large" color="blue"/></View>):(
      <View style={{width:'100%',height:'100%',flex:1}}>
      <Appbar/>
     
      <View style={styles.btncol}>
            <TouchableOpacity
          style={styles.buttonl}
          onPress={clear}>
             <Image source={require('../Images/logout.png')} style={{height:38,width:38}} />
        </TouchableOpacity>
        </View>
      
        <View style={styles.btncon}>
            <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate("Addgym",{email:email,password:password})}>
            <Image source={require('../Images/addss.png')} style={{height:25,width:23}} />
            </TouchableOpacity>
            </View>
      <View style={{height:'100%',width:'100%',justifyContent:'space-between',flex:1}}>
      
      <View style={{justifyContent:'space-between',alignItems:'center',marginTop:5, flex:1}}>
      
      <FlatList
        data={data}
        renderItem={({item}) => {return(
          <TouchableOpacity style={styles.bob} onPress={()=>navigation.navigate("Result",{place:item.place,email:email,password:password})}>
        <View style={styles.menuItem}>
          <Image source={require('../Images/location.png')} style={{height:25,width:25,marginTop:4}} />
          <Text style={{color: 'white',fontSize:20,marginLeft:10}}> {item.place}</Text>
          </View>
        </TouchableOpacity>
        
        )}}
      />
    </View>
      
      
      
  
      </View>
      </View>
      )}
    </SafeAreaView>
  );
};

export default Results;

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#FFFFFF',
    flex: 1,
  },
  bob: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#8338ec',
    marginTop: 15,
    width: 350,
    height: 100,
    borderRadius: 20,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#777777',
  },
  loader: {
    minHeight: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
    justifyContent:'center',
    alignSelf:'center',
    fontFamily:'sans-serif-thin',
    backgroundColor:'#8338ec',
    width:43,
    height:43,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:100
  },
  btncon:{
    height:"10%",
  
    justifyContent:'flex-end',
    alignItems:'center',
    marginLeft:333,
    marginTop:-122,
  
    },
    btncol:{
      height:"10%",
       marginRight:300,
      justifyContent:'flex-start',
      alignItems:'center',
      marginTop:-41
    
    },
    buttonl:{
      marginBottom:10,
      marginRight:50,
      marginLeft:15
    }
});
