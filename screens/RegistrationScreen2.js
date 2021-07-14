import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TextInput, Image, KeyboardAvoidingView, Alert, BackHandler} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FlatButton from '../Button';
import FlatButton2 from '../button2';
import {FontAwesome5} from '@expo/vector-icons';
import * as SecureStore from "expo-secure-store";
import axios from "axios";
const { Dimensions } = require('react-native');
const { width, height } = Dimensions.get('screen');
import {API_URL} from '../config'


export  function RegistrationScreen2({navigation, route}) {
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
    const [otp, setOtp] = useState('');

    const sendOtp = async () => {
        const response = await axios.post(`${API_URL}/auth/registration1`, {phoneNumber: route.params.phoneNumber})
        await SecureStore.setItemAsync('otpHash', response.data.hash );
    }

    const backAction = () => {
        Alert.alert("Внимание!", "Вы действительно хотите выйти? Введенные вами данные не сохранятся.", [
            {
                text: "Отмена",
                onPress: () => null,
                style: "cancel"
            },
            { text: "Выйти", onPress: () => navigation.navigate('Reg1') }
        ]);
        return true;
    };

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);

        return () =>
          BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, []);


    const checkOtp = async () => {
        const hash = await SecureStore.getItemAsync('otpHash')
        try {
            const response = await axios.post(`${API_URL}/auth/registration2`, {phoneNumber: route.params.phoneNumber, hash, otp: Number(otp)})
              .catch((error) => {
                  if (error.response.status === 400) {
                      Alert.alert(
                        "Ошибка",
                        "Срок действия кода истек",
                        [
                            { text: "OK", onPress: () => {} }
                        ]);
                  }
                  if (error.response.status === 401){
                      Alert.alert(
                        "Ошибка",
                        "Неверный код",
                        [
                            { text: "OK", onPress: () => {} }
                        ]);
                  }
              })
            if (Number(response.status) === 201) {
                navigation.push('Reg3', { phoneNumber: route.params.phoneNumber });
            }
        } catch (err) {
            console.log(err);
        }
    }

        return (
            <LinearGradient start={{x:-0.15, y:-0.15}} end={{x: 1, y: 1}} style={styles.container }  colors={['#9900cc', '#6666ff']}>
                <View>
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
                        <TextInput dataDetectorTypes={'phoneNumber'} defaultValue={""} onChangeText={(otp) => setOtp(otp)} value={otp} placeholder={'123456'}  maxLength={6} style={styles.input}  keyboardType='decimal-pad'/>
                    </View>
                    </KeyboardAvoidingView>
                    <View style={styles.buttonPlace}>
                        <FlatButton   text="Продолжить" onPress={checkOtp}/>
                    </View>
                    <View style={styles.mbuttonPlace}>
                        <FlatButton2   text="Отправить ещё раз" onPress={sendOtp}/>
                    </View>
                </View>
            </LinearGradient>
        );
    }
    const styles = StyleSheet.create({ 
            container:{
                alignItems:'center',
                alignContent:'center',
                height: height
        },
        text: {

            alignItems:'center',
            fontSize: 30,
            color: 'white',
        },
        text2: {
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
            fontSize: 27,
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
            height:height*0.13,
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
        mtextPlace:{
            height:height*0.041,
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