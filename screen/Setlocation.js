import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    ScrollView,
    FlatList,
  } from 'react-native';
  import React, {useEffect} from 'react';
  import Axios from 'axios';
  import {useState} from 'react';
  import {useRoute} from '@react-navigation/native';
  import Appbar from '../component/Appbar';
  import {TouchableOpacity} from 'react-native-gesture-handler';
  import { set } from 'react-native-reanimated';
  
  const Setlocation = ({navigation}) => {
    const route = useRoute();
    // const email = route.params.email;
    // const password = route.params.password;
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
    
  
    const loginuser = async () => {
      // try {
      //   const {data} = await Axios.post(
      //     'https://itechs.co.in/yogaflow/result.php/',
      //     {
      //       email: email,
      //       password: password,
      //     },
      //   );
      //   setFname(data[0].place);
      //   setPhone(data[1].place);
      //   setSadmin(data[2].place);
      //   setdata(data)
      //   console.log('Fname:-', fname);
      // } catch (err) {
      //   console.log('nope not working');
      // }
  
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
          setFname(result['data'])
          setisLoading(false)
        })
        .catch(err => {
          console.log(
            '🚀  file: webview-checkout.js  line 346  axios.post  err',
            err,
          );
        });
    };
  
    
    useEffect(()=>{
      loginuser();
    }, []);
    // loginuser();
    var payments = [];
  
    // for (let i = 0; i < 3; i++) {
    //   payments.push(
    //     <View
    //       key={i}
    //       style={{
    //         justifyContent: 'flex-start',
    //         alignItems: 'center',
    //         width: '100%',
    //         marginTop: 100,
    //         height: 50,
    //       }}>
    //       <View
    //         style={{
    //           justifyContent: 'center',
    //           alignItems: 'center',
    //           backgroundColor: '#ffffff',
    //           marginTop: 10,
    //           width: '100%',
    //           height: 100,
    //         }}>
    //         <Text style={{color: '#000'}}>NAME:-{fname} </Text>
    //         {/* <Text style={{color:"#000"}}>Email:-{amail} </Text>
    //       <Text style={{color:"#000"}}>PHONE:-{phone} </Text>
    //       <Text style={{color:"#000"}}>DOB:-{dob} </Text>
    //       <Text style={{color:"#000"}}>PASS:-{apassword} </Text> */}
    //       </View>
    //     </View>,
    //   );
    // }
  
  
    return (
      <SafeAreaView style={styles.container}>
        <Appbar/>
        <View style={{height:'100%',width:'100%',justifyContent:'space-between'}}>
          { isLoading? (<View style={styles.loader}><ActivityIndicator size="large" color="blue"/></View>):(
        
        <View style={{justifyContent:'center',alignItems:'center'}}>
          <View style={styles.btncon}>
              <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate("Addgym")}>
              <Image source={require('../Images/addss.png')} style={{height:25,width:23}} />
              </TouchableOpacity>
              </View>
        
        <FlatList
          data={data}
          renderItem={({item}) => {return(
            <TouchableOpacity style={styles.bob} onPress={()=>navigation.navigate("Result",{place:item.place})}>
          <View style={styles.menuItem}>
            <Image source={require('../Images/location.png')} style={{height:25,width:25,marginTop:4}} />
            <Text style={{color: 'white',fontSize:20,marginLeft:10}}> {item.place}</Text>
            </View>
          </TouchableOpacity>
          
          )}}
        />
        
      </View>
        
        
        )}
        
        </View>
        
      </SafeAreaView>
    );
  };
  
  export default Setlocation;
  
  const styles = StyleSheet.create({
    container: {
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
      alignItems:'flex-end',
      marginTop:10,
      marginLeft:346,
      marginTop:-56,
    
      },
  });
  