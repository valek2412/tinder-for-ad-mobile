import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {View, StyleSheet, Text, TextInput, Image, KeyboardAvoidingView,ActivityIndicator,BackHandler } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FlatButton from '../Button';
import FlatButton2 from '../button2';
import {FontAwesome5} from '@expo/vector-icons';
import { Alert } from 'react-native';
import * as FirebaseRecaptcha from 'expo-firebase-recaptcha';
import * as firebase from 'firebase';
import * as SecureStore from 'expo-secure-store';
const setToken = (token) => {
    return SecureStore.setItemAsync('secure_token', token);
};
function getUser(userID) { //после этой строки мне лишь хотелось умиреть, какого ебучиго жуя я не погу обратиться к объекту снапшон как результату функции
    //  var userID = 'tmDQ0LJXMrOTCnvXyc9LU0HONg42'
    var tester;
    var database = firebase.database().ref(`/users/${userID}`);
    console.log('Auto generated key: ', database.key);
    database.on('value', (snapshot)=>{
    if (snapshot.exists()) {
         console.log(snapshot);
        const userObj = snapshot.val();
        tester = userObj;
        // tester = snapshot.child("activ").val();
        }
    })
    return tester;
};
const FIREBASE_CONFIG = {
    apiKey: "AIzaSyB-dAvF2pV6l3DhvLX9-uzaXeqRnzE5dHg",
    authDomain: "tinderforadbd.firebaseapp.com",
    databaseURL: "https://tinderforadbd-default-rtdb.firebaseio.com",
    projectId: "tinderforadbd",
    storageBucket: "tinderforadbd.appspot.com",
    messagingSenderId: "1030422612794",
    appId: "1:1030422612794:web:7c034724ed0c0233591e03",
    measurementId: "G-G3PJXKM91T"
};
try {
    if (FIREBASE_CONFIG.apiKey) {
        firebase.initializeApp(FIREBASE_CONFIG);
    }
} catch (err) {
    // ignore app already initialized error on snack
}
const { Dimensions } = require('react-native');

const { width, height } = Dimensions.get('screen');
function userISreg(userID) {
    try{
    console.log(getUser(userID).name);
    {
        return true
    } } catch {return false}
}
function userISregtwo(userID) {
    console.log(userID)

    try{
    if ( (getUser(userID).lastName) != undefined )
    {
         console.log(getUser(userID).lastName)
        return true
    } 
    else
    {
        return false
    }
 } catch {return false}
}

export  function LoginScreen1({navigation}) {
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
    const recaptchaVerifier = React.useRef(null);
    const verificationCodeTextInput = React.useRef(null);
    const [phoneNumber, setPhoneNumber] = React.useState('+7');
    const [verificationId, setVerificationId] = React.useState('');
    const [verifyError, setVerifyError] = React.useState();
    const [verifyInProgress, setVerifyInProgress] = React.useState(false);
    const [verificationCode, setVerificationCode] = React.useState('');
    const [confirmError, setConfirmError] = React.useState();
    const [confirmInProgress, setConfirmInProgress] = React.useState(false);
    const isConfigValid = !!FIREBASE_CONFIG.apiKey;
    const [shouldShow, setshouldShow] = useState(true);
    const [id,setId]= useState('');
    const backAction = () => {

        return true;
      };
    
      useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);
    
        return () =>
          BackHandler.removeEventListener("hardwareBackPress", backAction);
      }, []);


    function getUserfirst(userID) { //после этой строки мне лишь хотелось умиреть, какого ебучиго жуя я не погу обратиться к объекту снапшон как результату функции
        // var userID = '{132}'
        var database = firebase.database().ref(`/users/${userID}`);
        database.once('value').then((snapshot)=>{
        if (snapshot.exists()) {
            if (snapshot.child("lastName").val()!=""){
                setshouldShow(!shouldShow)
                navigation.push('App')
            }else{
                setshouldShow(!shouldShow)
                Alert.alert(
                    "Ошибка",
                    "Пользователь не найден в системе, вы будете перенаправлены на экран регистрации!!!",
                    [
                    { text: "OK", onPress: () => navigation.push('Reg1') }
                    ]);
            }
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });
    }
    return (
        
        <LinearGradient start={{ x: -0.15, y: -0.15 }} end={{ x: 1, y: 1 }} style={styles.container} colors={['#9900cc', '#6666ff',]}>
            <View>
                <View style={styles.imagePlace}>
                    
                    <Image style={styles.image}
                    source={require('../src/logo.png')} />
                </View>
                {/* <Button title="hide" onPress={()=>setshouldShow(!shouldShow)} /> */}
                <FirebaseRecaptcha.FirebaseRecaptchaVerifierModal
                    ref={recaptchaVerifier}
                    firebaseConfig={FIREBASE_CONFIG}
                />
                <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
                    <View>
                    {
                        shouldShow ?(
                        <View style={styles.textPlace}>
                            <Text style={styles.text}>Авторизация</Text>
                        </View>
                        ): null
                    }   
                    </View>
                    <View>
                        {
                        !shouldShow ?(
                            <View style={styles.textPlace}>
                                <Text style={styles.text}>Введите код:</Text>
                            </View>
                        ): null
                        }
                    </View>
                    <View>
                        {
                        shouldShow ?(
                            <View style={styles.inputPlace}>
                            <FontAwesome5 style={{ position: 'absolute', right: width*0.7}}
                                name="user"
                                size={28}
                                color="#fff" />
                            <TextInput
                                style={styles.input}
                                // autoFocus={isConfigValid}
                                value={phoneNumber}
                                autoCompleteType="tel"
                                keyboardType="phone-pad"
                                textContentType="telephoneNumber"
                                placeholder="+7 999 999 9999"
                                editable={!verificationId}
                                onChangeText={(phoneNumber: string) => setPhoneNumber(phoneNumber)}
                                />    
                            </View>
                            ): null
                        }
                    </View>
                    <View>
                        {
                        !shouldShow ?(
                        <View style={styles.inputPlace}>
                            <FontAwesome5 style={{ position: 'absolute', right: width*0.7}}
                            name="lock" 
                            size={28} 
                            color="#fff"/>   
                            <TextInput 
                            ref={verificationCodeTextInput}
                            editable={!!verificationId}
                            placeholder="123456"
                            keyboardType="phone-pad"
                            onChangeText={(verificationCode: string) => setVerificationCode(verificationCode)} 
                            style={styles.input}  
                            />
                        </View>
                        ): null
                    }   
                    </View>
                </KeyboardAvoidingView>
                <View>
                    {
                    shouldShow ?(
                    <View style={styles.buttonPlace}>
                        <FlatButton
                            text="Продолжить"
                            onPress={
                                
                                async () => {
                                    if (phoneNumber.length>=12){
                                        navigation.push('Log2')
                                        // const phoneProvider = new firebase.auth.PhoneAuthProvider();
                                        // try {
                                        //     // setVerifyError(undefined);
                                        //     // setVerifyInProgress(true);
                                        //     // setVerificationId('');
                                        //     // const verificationId = await phoneProvider.verifyPhoneNumber(
                                        //     //     phoneNumber,
                                        //     //     // @ts-ignore
                                        //     //     recaptchaVerifier.current
                                        //     // );
                                        //     // setVerifyInProgress(false);
                                        //     // setVerificationId(verificationId);
                                        //     // verificationCodeTextInput.current?.focus();
                                        //     // setshouldShow(!shouldShow)
                                            
                                            
                                        // } catch (err) {
                                        //     setVerifyError(err);
                                        //     setVerifyInProgress(false);
                                        // }
                                    }else{ Alert.alert(
                                    "Ошибка",
                                    "Неверный формат номера, проверьте правильность введенных данных. Номер должен быть в формате +7(###)-###-##-##",
                                    [
                                    { text: "OK", onPress: () => {} }
                                    ]);}
                                }
                                
                            }             
    />                   
                        {/* {verifyError && <Text style={styles.error}>{`Error: ${verifyError.message}`}</Text>}
                        {verifyInProgress && <ActivityIndicator style={styles.loader} />} */}
                        {/* {verificationId ? (
                             
                            <Text style={styles.success}>A verification code has been sent to your phone</Text>
                        ) : (
                            undefined
                        )} */}
                    </View>
                    ): null
                }
                {/* {verificationId ? (
                             
                            setshouldShow(!shouldShow)
                         ) : (
                             undefined
                         )} */}
                
                </View>
                <View>
                    {
                    !shouldShow ?(
                        <View style={styles.buttonPlace}>
                        <FlatButton   text="Продолжить"
                                  onPress={async () => {
                                    try {
                                      setConfirmError(undefined);
                                      setConfirmInProgress(true);
                                      const credential = firebase.auth.PhoneAuthProvider.credential(
                                        verificationId,
                                        verificationCode
                                      );
                                      const authResult = true;
                                      setConfirmInProgress(false);
                                      setVerificationId('');
                                      setVerificationCode('');
                                      verificationCodeTextInput.current?.clear();
                                      Alert.alert('Phone authentication successful!');
                                      var user = firebase.auth().currentUser;
                                      if (user != null) {
                                        user.providerData.forEach(function (profile) {
                                          console.log("Sign-in provider: " + profile.providerId);
                                          console.log("   UID: " + user.uid);
                                          console.log("  Provider-specific UID: " + profile.uid);
                                          setToken(user.uid )
                                        });
                                      }
                                      console.log('useruid: ',user.uid)
                                      console.log('userfirst:',getUserfirst(user.uid))
                                      //console.log('user is reg: ',userISregtwo(user.uid))
                                    //   if(userISreg(user.uid)){
                                    //       navigation.navigate('App')
                                    //   }else{Alert.alert(
                                    //     "Ошибка",
                                    //      "Пользователь не найден!")
                                    //      [
                                    //         { text: "OK", onPress: () => navigation.push('Reg1') }
                                    //         ]
                                        
                                    //     }
                                      //navigation.navigate('Reg3')
                                      
                                      
                                    } catch (err) {
                                      setConfirmError(err);
                                      setConfirmInProgress(false);
                                    }
                                  }}/>





                                  {/* {confirmError && <Text style={styles.error}>{`Error: ${confirmError.message}`}</Text>}
        {confirmInProgress && <ActivityIndicator style={styles.loader} />} */}
                    </View>    
                    ): null
                }
                </View>
                {/* <View>
                    {
                    !shouldShow ?(
                        <View>
                        {!isConfigValid && (
                            <View style={styles.overlay} pointerEvents="none">
                              <Text style={styles.overlayText}>
                                To get started, set a valid FIREBASE_CONFIG in App.tsx.
                              </Text>
                            </View>
                          )}
                          </View>      
                        ): null
                }   
                </View> */}
                <View>
                    {
                    shouldShow ?(
                        <View style={styles.mtextPlace}>
                            <Text style={styles.text2}>      На данный номер будет отправлен смс с кодом</Text>
                        </View>
                    ): null
                }
                </View>
                <View style={styles.mbuttonPlace}>
                    {
                    !shouldShow ?(
                        <FlatButton2  text="Я не получил смс отправить ещё раз" />
                    ): null
                }
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
    ;   
    
    
    
    
    
    
    
    
    
