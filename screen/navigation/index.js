
import { createStackNavigator } from '@react-navigation/stack';
import {react, useEffect} from 'react'

import Home from '../Home'
import Result from '../Result';
import Results from '../Results';
import Login from '../Login.js';
import Aregister from '../Aregister.js';
import Uregister from '../Uregister';
import Addgym from '../Addgym';
import Fetchdata from '../Fetchdata';
import Edituser from '../Edituser';
import Uppdate from '../Uppdate';
const Stack = createStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />
      <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
      <Stack.Screen name="Results" component={Results} options={{headerShown:false}}/>
      <Stack.Screen name="Result" component={Result} options={{headerShown:false}}/>
      <Stack.Screen name="Aregister" component={Aregister} options={{headerShown:false}}/>
      <Stack.Screen name="Uregister" component={Uregister} options={{headerShown:false}}/>
      <Stack.Screen name="Addgym" component={Addgym} options={{headerShown:false}}/>
      <Stack.Screen name="Fetchdata" component={Fetchdata} options={{headerShown:false}}/>
      <Stack.Screen name="Edituser" component={Edituser} options={{headerShown:false}}/>
      <Stack.Screen name="Uppdate" component={Uppdate} options={{headerShown:false}}/>
   
     
    </Stack.Navigator>
  );
}
export default MyStack;