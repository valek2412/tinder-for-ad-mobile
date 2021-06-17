import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput,Button, Image, KeyboardAvoidingView,ActivityIndicator,BackHandler } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Alert } from 'react-native';
import FlatButton from '../Button';
import FlatButton2 from '../button2';
import { FontAwesome5 } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import {useEffect} from 'react';
import * as FirebaseRecaptcha from 'expo-firebase-recaptcha';
import * as firebase from 'firebase';
import { TextInputMask } from 'react-native-masked-text'
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




function pushAD_dont_use(link,nameAD,imageIrl,adID){
    var database = firebase.database();
    //   .ref('/users/${userID}')
    // userID= '1323232'
    const look = 0;
    const reting = 0;
    console.log('Auto generated key: ', database.key);
    //console.log('${userID}')
    database.ref(`/ad/${adID}`) 
      .set({
        look: look,
        reting: reting,
        name:nameAD,
        imageIrl:imageIrl,
        link:link
      })
      .then(() => console.log('test update done'));
}

async function test(userID){
        // var userID = '{132}'
        const response = await fetch(
            `https://tinderforadbd-default-rtdb.firebaseio.com/users/${userID}.json`,
            {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            }
        )
        const data = response.json()
        const todo = Object.keys(data).map(key => ({...data[key],id:key}))
        console.log("i am todo" + todo);
    
}
 
function getADbyId(ID) {
    var database = firebase.database().ref(`/ad/${ID}`);
    console.log('Auto generated key: ', database.key);
    database.once('value').then((snapshot)=>{
    if (snapshot.exists()) {
        console.log(snapshot.val());
        return snapshot.child("imageIrl").val();
      } else {
        console.log("end of Ad вывести с скрин с концом рекламмы");
      }
    }).catch((error) => {
      console.error(error);
    });
}
function loderIMGforUser(userID){ //предзагрузка изображений не ебу как сделать пусть так всдруг сразботает
    var act = getUserActv(userID);
    console.log(getADbyId(act));
    console.log(getADbyId(act+1))
}


function updateAdForUser(userID){
    const reference = firebase.database().ref(`/user/${userID}/activ`);
    return reference.transaction(currentactiv => {
        if (currentactiv === null) return 1;
        return currentactiv + 1;
      });
}

function updateAdlike(postId){
    const reference = firebase.database().ref(`/ad/${postId}/reting`);
    return reference.transaction(currentLikes => {
        if (currentLikes === null) return 1;
        return currentLikes + 1;
      });
}

function updateAdlook(postId){
    const reference = firebase.database().ref(`/ad/${postId}/look`);
    return reference.transaction(currentlook => {
        if (currentlook === null) return 1;
        return currentlook + 1;
      });
}

const setToken = (token) => {
    return SecureStore.setItemAsync('secure_token', token);
};
function userISreg(userID) {
    try{
    console.log(getUser(userID).lastName);
    {
        return true
    } } catch {return false}
}

function getUserActv(userID) { //после этой строки мне лишь хотелось умиреть, какого ебучиго жуя я не погу обратиться к объекту снапшон как результату функции
    // var userID = '{132}'
    var database = firebase.database().ref(`/users/${userID}`);
    console.log('Auto generated key: ', database.key);
    database.once('value').then((snapshot)=>{
    if (snapshot.exists()) {
        console.log(snapshot);
        return snapshot.child("activ").val();
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
}

function user_is_register(userID) {
    var database = firebase.database().ref(`/users/${userID}`);
    console.log('Auto generated key: ', database.key);
    database.once('value').then((snapshot)=>{
    if (snapshot.exists()) {
        console.log(snapshot.val());
        return true;
      } else {
        console.log("registr");
        return false;
      }
    }).catch((error) => {
      console.error(error);
    });
}


try {
    if (FIREBASE_CONFIG.apiKey) {
        firebase.initializeApp(FIREBASE_CONFIG);
    }
} catch (err) {
    // ignore app already initialized error on snack
}

const { Dimensions } = require('react-native');
const { width, height } = Dimensions.get('screen');

export function RegistrationScreen1({ navigation }) {
    
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
    const backAction = () => {

        return true;
      };
    
      useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);
    
        return () =>
          BackHandler.removeEventListener("hardwareBackPress", backAction);
      }, []);

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
    function getUserfirst(userID) { //после этой строки мне лишь хотелось умиреть, какого ебучиго жуя я не погу обратиться к объекту снапшон как результату функции
        // var userID = '{132}'
        var database = firebase.database().ref(`/users/${userID}`);
        database.once('value').then((snapshot)=>{
        if (snapshot.exists()) {
            if (snapshot.child("lastName").val()!=""){
                setshouldShow(!shouldShow)
                Alert.alert(
                    "Ошибка",
                    "Пользователь c таким номером уже зарегистрирован, будет произведен вход в систему!!!",
                    [
                    { text: "OK", onPress: () => navigation.push('App') }
                    ]);
                    
            }else{
                setshouldShow(!shouldShow)
                navigation.push('Reg3')        
            }
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });
    }
    return (

        <LinearGradient start={{ x: -0.15, y: -0.15 }} end={{ x: 1, y: 1 }} style={styles.container} colors={['#9900cc', '#6666ff']}>
            <View>
                <View style={styles.imagePlace}>
                    
                    <Image style={styles.image}
                    source={require('../src/logo.png')} />
                </View>
                {/* <Button title="hide" onPress={()=>setshouldShow(!shouldShow)} /> */}
                {/* <FirebaseRecaptcha.FirebaseRecaptchaVerifierModal
                    ref={recaptchaVerifier}
                    firebaseConfig={FIREBASE_CONFIG}
                /> */}
                <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
                    <View>
                    {
                        shouldShow ?(
                        
                        <View style={styles.textPlace}>
                           
                            <Text style={styles.text}>Регистрация</Text>
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
                                maxLength = {12}
                                editable={!verificationId}
                                onChangeText={(phoneNumber: string) => setPhoneNumber(phoneNumber)}
                                />
                                {/* <TextInputMask
                                style={styles.input}
                        type={'cel-phone'}
                        options={{
                            //^\+\d{1,2}\s+?\(\d{3,5}\)\s+?\d{1,3}-\d{2}-\d{2}$
                            maskType: '^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$',
                            withDDD: true,
                            dddMask: '(99) '
                        }}
                        value={phoneNumber}
                        onChangeText={text => {
                            setPhoneNumber(text)
                        }}
                        />    */}
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
                            maxLength = {6}
                            keyboardType = "numeric"
                            onChangeText={(phoneNumber: string) => setPhoneNumber(phoneNumber)}
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
                            text="Зарегистрировать телефон"
                            onPress={

                                async () => {
                                    if (phoneNumber.length>=12){
                                        // const phoneProvider = new firebase.auth.PhoneAuthProvider();
                                        // try {
                                        //     setVerifyError(undefined);
                                        //     setVerifyInProgress(true);
                                        //     setVerificationId('');
                                        //     const verificationId = await phoneProvider.verifyPhoneNumber(
                                        //         phoneNumber,
                                        //         // @ts-ignore
                                        //         recaptchaVerifier.current
                                        //     );
                                            // setVerifyInProgress(false);
                                            // setVerificationId(verificationId);
                                            // verificationCodeTextInput.current?.focus();
                                            // setshouldShow(!shouldShow)
                                            
                                        // } catch (err) {
                                        //     setVerifyError(err);
                                        //     setVerifyInProgress(false);
                                        // }
                                        navigation.push('Reg2')
                                    }else{ Alert.alert(
                                    "Ошибка",
                                    "Неверный формат номера, проверьте правильность введенных данных. Номер должен быть в формате +7(###)-###-##-##",
                                    [
                                    { text: "OK", onPress: () => {} }
                                    ]);}
                                }
                                
                            }             
    />                   
                        {/* {verifyError && <Text style={styles.error}>{`Error: ${verifyError.message}`}</Text>} */}
                        {/* {verifyInProgress && <ActivityIndicator style={styles.loader} />} */}
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
                                    navigation.push('Reg1')
                                  
                                    // try {
                                    //   setConfirmError(undefined);
                                    //   setConfirmInProgress(true);
                                    //   const credential = firebase.auth.PhoneAuthProvider.credential(
                                    //     verificationId,
                                    //     verificationCode
                                    //   );
                                    //   const authResult = await firebase.auth().signInWithCredential(credential);
                                    //   setConfirmInProgress(false);
                                    //   setVerificationId('');
                                    //   setVerificationCode('');
                                    //   verificationCodeTextInput.current?.clear();
                                    //   Alert.alert('Phone authentication successful!');
                                    //   var user = firebase.auth().currentUser;
                                    //   if (user != null) {
                                    //     user.providerData.forEach(function (profile) {
                                    //       console.log("Sign-in provider: " + profile.providerId);
                                    //       console.log("   UID: " + user.uid);
                                    //       console.log("  Provider-specific UID: " + profile.uid);
                                    //       console.log("  Name: " + profile.displayName);
                                    //       console.log("  Email: " + profile.email);
                                    //       console.log("  Photo URL: " + profile.photoURL);
                                    //       setToken(user.uid )
                                          
                                    //       getUserfirst(user.uid)
                                    //     });
                                    //   }else{
                                    //     Alert.alert(
                                    //         "Ошибка",
                                    //         "Не удалось выполнить вход",
                                    //         [
                                    //         { text: "OK", onPress: () => {} }
                                    //         ]);    
                                    //   }
                                      
                                                                         
                                    // } catch (err) {
                                    //   setConfirmError(err);
                                    //   setConfirmInProgress(false);
                                    }
                                  }/>
                                  {/* {confirmError && <Text style={styles.error}>{`Error: ${confirmError.message}`}</Text>} */}
        {/* {confirmInProgress && <ActivityIndicator style={styles.loader} />} */}
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

                <View style={styles.mtextPlace}>
                    <Text style={styles.text2}>На данный номер будет отправлен смс с кодом</Text>
                </View>
                <View style={styles.mbuttonPlace}>
                    <FlatButton2 text="У меня уже есть аккаунт" onPress={() => {
                        // updateAdlike(1);
                        // updateAdlook(1);
                        // loderIMGforUser('{132}');
                        navigation.push('Log1')
                      
                                            // navigation.push("Log1")
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
    input: {
        borderWidth: 2,
        width: '100%',
        padding: 5,
        borderRadius: 30,
        borderColor: 'white',
        color: 'white',
        fontSize: 25,
        textAlign: 'center'

    },
    imagePlace: {
        height: height * 0.33,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: height * 0.2
    },
    textPlace: {
        height: height * 0.25,
        justifyContent: 'flex-end',
        alignItems: 'center',
        
    },
    
    inputPlace: {
        height: height * 0.13,
        justifyContent: 'center',
        alignItems: 'center',

    },
    buttonPlace: {
        height: height * 0.083,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mbuttonPlace: {
        height: height * 0.083,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mtextPlace: {
        height: height * 0.041,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        flex: 1,
        aspectRatio: 1.5,
        resizeMode: 'contain',

    }
});