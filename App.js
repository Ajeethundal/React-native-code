import 'react-native-gesture-handler';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
import MyStack from './screen/navigation';

// import MyStack from './navigation'

const App = () => {
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
    // <View>
    //   <Towregister/>
    // </View>
  )
}

export default App

const styles = StyleSheet.create({})