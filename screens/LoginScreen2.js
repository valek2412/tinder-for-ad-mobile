import React from 'react';
import {View, StyleSheet, Text, TextInput, Image, KeyboardAvoidingView} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FlatButton from '../Button';
import FlatButton2 from '../button2';
import {FontAwesome5} from '@expo/vector-icons';
const { Dimensions } = require('react-native');
const { width, height } = Dimensions.get('screen');

export  function LoginScreen2({navigation}) {
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
    return (
        <LinearGradient start={{x:-0.15, y:-0.15}} end={{x: 1, y: 1}} style={styles.container }  colors={['#9900cc', '#6666ff']}>
                    <View >
                    <View style={styles.imagePlace}>
                        <Image  style={styles.image}
                        source={require('../src/logo.png')}/>
                    </View>
                    
                    <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
                    <View style={styles.textPlace}>
                    <Text style={styles.text}>Введите код:</Text>
                </View>
                    <View style={styles.inputPlace}>
                        <FontAwesome5 style={{ position: 'absolute', right: width*0.7}}
                        name="lock" 
                        size={28} 
                        color="#fff"/>   
                        <TextInput dataDetectorTypes={'phoneNumber'} placeholder={'123456'}  maxLength={6} style={styles.input}  keyboardType='decimal-pad'/>
                    </View>
                    </KeyboardAvoidingView>
                    <View style={styles.buttonPlace}>
                        <FlatButton   text="Продолжить" onPress={() =>navigation.push('App')}/>
                    </View>
                    <View style={styles.mbuttonPlace}>
                        <FlatButton2 style={styles.text2} text="Отправить ещё раз"/>
                    </View>
                    </View>
        </LinearGradient> 
      );
    }
    const styles = StyleSheet.create({ 
            container:{
            alignItems:'center',
            height: '100%',

        },
        text: {
            fontFamily:'',
            alignItems:'center',
            fontSize: 30,
            color: 'white',
        },
        text2: {
            fontFamily:'',
            alignItems:'center',
            fontSize: 13,
            color: 'white',
        },
        input:{
            borderWidth: 2,
            width: '100%',
            padding: 5,
            borderRadius: 30,
            borderColor: 'white' ,
            color: 'white', 
            fontSize: 25,
            textAlign: 'center',
        },
        imagePlace:{
            height:height*0.33,
            justifyContent:'center',
            alignItems:'center',
            paddingTop:height*0.2
        },
        textPlace:{
            height:height*0.25,
            justifyContent:'flex-end',
            alignItems:'center',
        },
        inputPlace:{
            height:height*0.166,
            justifyContent:'center',
            alignItems:'center',    
        },
        buttonPlace:{
            height:height*0.083,
            justifyContent:'center',
            alignItems:'center',    
        },
        mbuttonPlace:{
            height:height*0.083,
            justifyContent:'center',
            alignItems:'center'    
        },
        image: {
            flex: 1,
            aspectRatio: 1.5, 
            resizeMode: 'contain',
        
          } 
    });
    ;








