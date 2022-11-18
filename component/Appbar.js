import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Appbar = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.tils}>CODE<Text style={styles.land}>-GYM</Text></Text>
    </View>
  )
}

export default Appbar;

const styles = StyleSheet.create({
    tils:{
        fontSize:30,     
        fontWeight:'600',
        color:'black',
    },
    container:{
        width:'100%',
        paddingVertical:10,
        alignItems:'center',
        backgroundColor:'#256EFF',
        height:60,
    },
    land:{
        color:'white',
    }
})