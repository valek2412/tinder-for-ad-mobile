import React, {useState} from 'react';
import {View, StyleSheet, Text, TextInput, Image, SafeAreaView, TouchableOpacity,BackHandler,Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FlatButton3 from '../button3';
import FlatButton from '../Button';
import * as SecureStore from 'expo-secure-store';
import {useEffect} from 'react';
const { Dimensions } = require('react-native');
const { width, height } = Dimensions.get('screen');
const getToken = () => {
    return SecureStore.getItemAsync('secure_token');
};

export  function MainScreen1({route,navigation}) {
    const [id,setId]= useState('')
    const backAction = () => {
        Alert.alert("Внимание!", "Вы действительно хотите выйти? Вы будете перенаправлены на экран авторизации", [
          {
            text: "Отмена",
            onPress: () => null,
            style: "cancel"
          },
          { text: "Выйти", onPress: () => navigation.navigate('Log1') }
        ]);
        return true;
      };
    
      useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);
    
        return () =>
          BackHandler.removeEventListener("hardwareBackPress", backAction);
      }, []);
    return (
        // getToken().then(token => setId(token)),
        <LinearGradient start={{x:-0.15, y:-0.15}} end={{x: 1, y: 1}} style={styles.container }  colors={['#9900cc', '#6666ff']}>
                    <View style={{alignItems:'flex-start',paddingTop:0.01*height}}>
                    <FlatButton3  onPress={()=>{navigation.openDrawer()}}/>
                    </View>
                    <View style={{flexDirection:"column", alignItems:'center'}}> 
                    <Text style={styles.text}>Новые предложения{"\n"} будут доступны{"\n"} после 18:00</Text>
                    <View style = {{height:height*0.1}}></View>
                    <FlatButton text="Попробовать анимацию" onPress={()=>navigation.push("App2")}/>

            </View>
        </LinearGradient> 
      );
    }
    const styles = StyleSheet.create({ 
            container:{
            height: '100%',
            
        },
        text: {
            fontFamily:'',
            paddingTop:200,
            textAlign:'center',
            fontSize: 25,
            color: 'white',
        },
        FlatButton:{
          paddingTop:30
        },
    });
    ;