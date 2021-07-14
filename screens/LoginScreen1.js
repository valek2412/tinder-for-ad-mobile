import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {View, StyleSheet, Text, TextInput, Image, KeyboardAvoidingView,ActivityIndicator,BackHandler } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FlatButton from '../Button';
import FlatButton2 from '../button2';
import {FontAwesome5} from '@expo/vector-icons';
import { Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from "axios";
import {API_URL} from '../config'

const { Dimensions } = require('react-native');

const { width, height } = Dimensions.get('screen');

export  function LoginScreen1({navigation}) {
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
    const [phoneNumber, setPhoneNumber] = useState('+7');

    const backAction = () => {
        return true;
      };
    
      useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);
    
        return () =>
          BackHandler.removeEventListener("hardwareBackPress", backAction);
      }, []);

      const sendOtp = async () => {
          const response = await axios.post(`${API_URL}/auth/login1`, {phoneNumber})
            .catch((error) => {
                if (error.response.status === 400) {
                    Alert.alert(
                      "Ошибка",
                      "Пользователь с таким номером не найден",
                      [
                          { text: "OK", onPress: () => {} }
                      ]);
                }
                if (error.response.status === 500){
                    Alert.alert(
                      "Ошибка",
                      "Ошибка сервера",
                      [
                          { text: "OK", onPress: () => {} }
                      ]);
                }
            })
          await SecureStore.setItemAsync('otpHash', response.data.hash );
          if (Number(response.status) === 201 ){
              navigation.push('Log2', { phoneNumber })
          }
      }


    return (
        <LinearGradient start={{ x: -0.15, y: -0.15 }} end={{ x: 1, y: 1 }} style={styles.container} colors={['#9900cc', '#6666ff',]}>
            <View>
                <View style={styles.imagePlace}>
                    <Image style={styles.image}
                    source={require('../src/logo.png')} />
                </View>
                <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
                    <View>
                        <View style={styles.textPlace}>
                            <Text style={styles.text}>Авторизация</Text>
                        </View>
                    </View>
                    <View>
                                    <View style={styles.inputPlace}>
                                    <FontAwesome5 style={{ position: 'absolute', right: width*0.7}}
                                        name="user"
                                        size={28}
                                        color="#fff" />
                                    <TextInput
                                        style={styles.input}
                                        value={phoneNumber}
                                        autoCompleteType="tel"
                                        keyboardType="phone-pad"
                                        textContentType="telephoneNumber"
                                        placeholder="+7 999 999 9999"
                                        onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
                                        />
                                    </View>
                    </View>
                </KeyboardAvoidingView>
                <View>
                    <View style={styles.buttonPlace}>
                        <FlatButton
                            text="Продолжить"
                            onPress={sendOtp}/>
                    </View>
                </View>
                        <View style={styles.mtextPlace}>
                            <Text style={styles.text2}>На данный номер будет отправлен смс с кодом</Text>
                        </View>
                <View style={styles.mbuttonPlace}>
                    <FlatButton2 text="У меня еще нет аккаунта" onPress={() => {
                        navigation.push('Reg1')
                    } } />
                </View>
            </View>
        </LinearGradient>
    );
}


    const styles = StyleSheet.create({ 
        container: {
            alignItems: 'center',
            alignContent: 'center',
            height: height
        },
        text: {
            fontSize: 30,
            color: 'white',
        },
        text2: {
            
            fontSize: 13,
            color: 'white',
        },
        
        mbuttonPlace:{
            height:height*0.083,
            justifyContent:'center',
            alignItems:'center'    
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
        logo:{
            alignItems:'center',
            flex:4,
            justifyContent: 'center',
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
        contexPlace:{
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
    
    
    
    
    
    
    
    
    
