import React from 'react';
import {View, StyleSheet, Text, TextInput, Image, SafeAreaView, TouchableOpacity} from 'react-native';
import {FontAwesome5} from '@expo/vector-icons';
const { Dimensions } = require('react-native');
const { width, height } = Dimensions.get('screen');
export default function ButtonPoloska({onPress}) {
    return(
   <View style={styles.container}>
       <SafeAreaView >
           <TouchableOpacity 
           style={{alignItems:"flex-start"}} onPress={onPress} >
                <View style={{height:height*0.04,
            justifyContent:'flex-start',
            alignItems:'flex-start'}}>
                    <Image 
                    style={{
                        aspectRatio: 2, 
                        resizeMode: 'contain',}}
                    source={require('../src/123.png')}/>
                </View>
           </TouchableOpacity>

       </SafeAreaView>
   </View> 
)
}
    const  styles = StyleSheet.create({
        container:{
            // height:100,
            
            alignItems:'flex-start' 
        },
    })