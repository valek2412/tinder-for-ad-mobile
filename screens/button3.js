import React from 'react';
import {View, StyleSheet, Text, TextInput, Image, SafeAreaView, TouchableOpacity} from 'react-native';
import {FontAwesome5} from '@expo/vector-icons';
const { Dimensions } = require('react-native');
const { width, height } = Dimensions.get('screen');
export default function FlatButton3({onPress}) {
    return(
   <View style={styles.container}>
       <SafeAreaView style={{flex:1}}>
           <TouchableOpacity 
           style={{alignItems:"center", margin: 16}} onPress={onPress} >
                <View style={{height:height*0.041,
            justifyContent:'center',
            alignItems:'center'}}>
                    <Image 
                    style={{flex: 1,
                        aspectRatio: 1.5, 
                        resizeMode: 'contain',}}
                    source={require('../src/button.png')}/>
                </View>
           </TouchableOpacity>
       </SafeAreaView>
   </View> 
)
}
    const  styles = StyleSheet.create({
        container:{
            
            height:100,
            paddingTop: 20, 
        },
    })