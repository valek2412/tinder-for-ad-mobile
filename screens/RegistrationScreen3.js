import React, {useState} from 'react';
import {useEffect} from 'react';
import {View, StyleSheet,TextInput, Text, KeyboardAvoidingView, ActivityIndicator, Alert,BackHandler} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FlatButton from '../Button';
import FlatButton2 from '../button2';
const { Dimensions } = require('react-native');
const { width, height } = Dimensions.get('screen');
import * as firebase from 'firebase';
import * as SecureStore from 'expo-secure-store';
import moment from 'moment'; 
import { TextInputMask } from 'react-native-masked-text'

const money = 1; // стартовые деньги
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
const getToken = () => {
    return SecureStore.getItemAsync('secure_token');
};
var activ = 1;
function test(){
    database()
    .ref('/users/132')
    .once('value')
    .then(snapshot => {
      console.log('User data: ', snapshot.val());
    //   console.log(snapshot.age);
    //   console.log(snapshot.city);
    //   console.log(snapshot.firstName);
    //   console.log(snapshot.lastName);
    });
}
function pushDatainBD(User_first_name,User_last_name,User_age,User_city,userID){
 var database = firebase.database();
console.log('Auto generated key: ', database.key);
database.ref(`/users/${userID}`) 
  .set({
    age: User_age,
    firstName: User_first_name,
    lastName: User_last_name,
    city: User_city,
    activ: activ,
    money: money
  })
  .then(() => console.log('test update done'));

}
function getUserfirst(userID) { //после этой строки мне лишь хотелось умиреть, какого ебучиго жуя я не погу обратиться к объекту снапшон как результату функции
    //  var userID = 'tmDQ0LJXMrOTCnvXyc9LU0HONg42'
    var tester;
    var database = firebase.database().ref(`/users/${userID}`);
    console.log('Auto generated key: ', database.key);
    database.on('value', (snapshot)=>{
    if (snapshot.exists()) {
         console.log(snapshot);
        const userObj = snapshot.val();
        tester = userObj.firstName;
        // tester = snapshot.child("activ").val();
        }
    })
    return tester;
};
try {
    if (FIREBASE_CONFIG.apiKey) {
        firebase.initializeApp(FIREBASE_CONFIG);
    }
} catch (err) {
}
export  function RegistrationScreen3({route,navigation}) {
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');  
    const [cityName, setCityName] = useState('');
    const [birthDate, setbirthDate] = useState('');
    const [birthDay, setbirthDay] = useState('');
    const [birthMonth, setbirthMonth] = useState('');
    const [birthYear, setbirthYear] = useState('');
    const [id,setId]= useState('')
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
    return (
        getToken().then(token => setId(token)),
        
    
        <LinearGradient start={{x:-0.15, y:-0.15}} end={{x: 1, y: 1}} style={styles.container }  colors={['#9900cc', '#6666ff']}>
                <View>
                <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
                {/* <FirebaseRecaptcha.FirebaseRecaptchaVerifierModal
                    ref={recaptchaVerifier}
                    firebaseConfig={FIREBASE_CONFIG}
                /> */}
                    <View style={{height:height*0.18}}></View>   
                    <View style={styles.textPlace}>
                        <Text style={styles.text}>Имя:</Text>
                    </View>
                    <View style={styles.inputPlace}>
                        <TextInput
                        returnKeyType = { "next" }
                        onSubmitEditing={() => { this.secondTextInput1.focus(); }}
                        blurOnSubmit={false} 
                        autoFocus={true} 
                        style={styles.input} 
                        
                        value={firstName} 
                        onChangeText={value => setFirstName(value)} 
                        />
                    </View>

                    <View style={styles.textPlace}>
                        <Text style={styles.text}>Фамилия:</Text>
                    </View>
                    <View style={styles.inputPlace}>
                        <TextInput 
                        ref={(input) => { this.secondTextInput1 = input; }}
                        returnKeyType = { "next" }
                        onSubmitEditing={() => { this.secondTextInput2.focus(); }}
                        blurOnSubmit={false} 
                        style={styles.input}  
                        value={lastName} 
                        onChangeText={value => setLastName(value)} 
                        />
                    </View>
                    <View style={{alignItems:'center', height:height*0.07}}>
                        <Text style={styles.text}>Дата рождения:</Text>
                    </View>
                    <View style={{width:width*0.8, flexDirection:'row'}}>
                        <View style={{width:width*0.23, alignItems:'flex-end'}}>
                            
                            <TextInput style={styles.input1}
                            ref={(input) => { this.secondTextInput2 = input; }}
                            returnKeyType = { "next" }
                            onSubmitEditing={() => { this.secondTextInput3.focus(); }}
                            blurOnSubmit={false}
                            value={birthDay} 
                            keyboardType="phone-pad"
                            onChangeText={value => setbirthDay(value)}
                            //onChangeText={} //todo
                            />
                        </View>
                        <View style={{width:width*0.23, alignItems:'flex-end'}}>
                            <TextInput style={styles.input1}
                            ref={(input) => { this.secondTextInput3 = input; }}
                            returnKeyType = { "next" }
                            onSubmitEditing={() => { this.secondTextInput4.focus(); }}
                            blurOnSubmit={false}
                            
                           value={birthMonth}
                           keyboardType="phone-pad" 
                        //     onChangeText={value => this.value =this.value+"."+value}
                            onChangeText={value  => setbirthMonth(value)} 
                            />
                        </View>
                        <View style={{width:width*0.34, alignItems:'flex-end'}}>
                            <TextInput style={styles.input2} 
                            value={birthYear}
                            keyboardType="phone-pad" 
                            // onChangeText={value => this.value =this.value+"."+value}
                            ref={(input) => { this.secondTextInput4 = input; }}
                            returnKeyType = { "next" }
                            onSubmitEditing={() => { this.secondTextInput5.focus(); }}
                            blurOnSubmit={false}
                            onChangeText={value => setbirthYear(value)} 
                            />
                        </View>
                        </View>
                               
                    <View style={styles.textPlace}>
                        <Text style={styles.text}>Город:</Text>
                    </View>
                    <View style={styles.inputPlace}>
                        <TextInput 
                        ref={(input) => { this.secondTextInput5 = input; }}
                        
                        
                        style={styles.input}
                        value={cityName} 
                        // onChangeText={value3 => this.value3 = value3}
                        onChangeText={value => setCityName(value)} 
                         />
                    </View>
                    </KeyboardAvoidingView> 
                    <View style={styles.buttonPlace}>
                        <FlatButton   
                        text="Регистрация" 
                        onPress={ () =>{
                            var currentYear = moment().format("YYYY"); 
                            if ((parseInt(birthDay)<=31)&&(parseInt(birthMonth)<=12)&&(parseInt(birthYear)>=1921)&&(parseInt(birthYear)<=currentYear)){
                            setbirthDate(currentYear - parseInt(birthYear))   
                             if (firstName!="") {
                                 if (lastName!=""){
                                     if (cityName!=""){
                                                 if (birthDate!=""){                                                                                                 
                                                    //  pushDatainBD(
                                                    //     firstName,
                                                    //     lastName,
                                                    //     birthDate,
                                                    //     cityName ,
                                                    //     id)
                                                        navigation.navigate('App')
                                                     }else{Alert.alert(
                                                        "Внимание!",
                                                         "Внимательно проверьте данные! Это очень важно!")}        
                                         }else{Alert.alert(
                                            "Ошибка",
                                             "Поле 'Город' пустое!")}
                                     }else{Alert.alert(
                                        "Ошибка",
                                         "Поле 'Фамилия' пустое!")}
                                 }else{Alert.alert(
                                "Ошибка",
                                 "Поле 'Имя' пустое!")}
                            }else{Alert.alert(
                                 "Ошибка",
                                 "Проверьте дату рождения!")}

                        }
                    }
                        />
                    </View>
                    <View style={styles.mbuttonPlace}>
                        <FlatButton2    text="Выход" onPress={()=>{
                        // readerBd('132')
                        //RAider()   
                        navigation.push('Reg2')
                        }}/> 
                        {/* onPress={()=>navigation.push("Reg1")} */}
                    </View>
                </View>
        </LinearGradient>  
      );
    }
    const styles = StyleSheet.create({ 
        container:{

            alignItems:'center',
            height: '100%'
        },
        text: {
  
            fontFamily:'',
            alignItems:'center',
            fontSize: 25,
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
        input1:{
            borderWidth: 2,
            width: '96%',
            padding: 5,
            borderRadius: 30,
            borderColor: 'white' ,
            color: 'white', 
            fontSize: 25,
            textAlign: 'center',

        },
        input2:{
            borderWidth: 2,
            width: '97%',
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
        },
        textPlace:{
            height:height*0.05,
            justifyContent:'flex-end',
            alignItems:'center',
        },
        inputPlace:{
            height:height*0.095,
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
        } 
    });