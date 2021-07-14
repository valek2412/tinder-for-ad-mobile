import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TextInput, Image, KeyboardAvoidingView, Alert, BackHandler} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FlatButton from '../Button';
import FlatButton2 from '../button2';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from "axios";
const { Dimensions } = require('react-native');
const { width, height } = Dimensions.get('screen');
import * as SecureStore from 'expo-secure-store';
import {API_URL} from '../config'

export function LoginScreen2({navigation, route}) {
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
            { text: "Выйти", onPress: () => navigation.navigate('Log1') }
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
            const response = await axios.post(`${API_URL}/auth/login2`, {phoneNumber: route.params.phoneNumber, hash, otp: Number(otp)})
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
            const user = await axios.post(`${API_URL}/users`, { phoneNumber: route.params.phoneNumber })
            if (Number(response.status) === 201) {
                await SecureStore.setItemAsync('userId', user.data.id.toString());
                navigation.push('App');
            }
        }catch (err){
            console.log(err);
        }
    }

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
                        <TextInput dataDetectorTypes={'phoneNumber'} onChangeText={(otp) => setOtp(otp)} placeholder={'123456'} value={otp} maxLength={6} style={styles.input}  keyboardType='decimal-pad'/>
                    </View>
                    </KeyboardAvoidingView>
                    <View style={styles.buttonPlace}>
                        <FlatButton   text="Продолжить" onPress={checkOtp}/>
                    </View>
                    <View style={styles.mbuttonPlace}>
                        <FlatButton2 style={styles.text2} text="Отправить ещё раз" onPress={sendOtp}/>
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








