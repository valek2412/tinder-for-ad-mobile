import React, {useState} from 'react';
import {useEffect} from 'react';
import {View, StyleSheet,TextInput, Text, KeyboardAvoidingView, ActivityIndicator, Alert,BackHandler} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FlatButton from '../Button';
import FlatButton2 from '../button2';
const { Dimensions } = require('react-native');
const { width, height } = Dimensions.get('screen');
import * as SecureStore from 'expo-secure-store';
import axios from "axios";
import {API_URL} from '../config'



export  function RegistrationScreen3({route,navigation}) {
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [patronymic, setPatronymic] = useState('');
    const [cityName, setCityName] = useState('');
    const [birthDay, setBirthDay] = useState('');
    const [birthMonth, setBirthMonth] = useState('');
    const [birthYear, setBirthYear] = useState('');

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

      const registrationUser = async () => {
          const data = {
              phoneNumber: route.params.phoneNumber,
              name: firstName,
              surname: lastName,
              patronymic,
              city: cityName,
              birthDate: `${birthYear}-${birthMonth}-${birthDay}`
          }
          try {
              const response = await axios.post(`${API_URL}/auth/registration3`, data)
              if (Number(response.status) === 201) {
                  await SecureStore.setItemAsync('userId', response.data.id.toString());
                  navigation.push('App');
              }
          } catch (err){
              console.log(err);
          }
      }

    return (
        <LinearGradient start={{x:-0.15, y:-0.15}} end={{x: 1, y: 1}} style={styles.container }  colors={['#9900cc', '#6666ff']}>
                <View>
                <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
                    <View style={{height:height*0.17}}></View>
                    <View style={styles.textPlace}>
                        <Text style={styles.text}>Имя:</Text>
                    </View>
                    <View style={styles.inputPlace}>
                        <TextInput
                        returnKeyType = { "next" }
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
                        returnKeyType = { "next" }
                        style={styles.input}  
                        value={lastName} 
                        onChangeText={value => setLastName(value)} 
                        />
                    </View>
                    <View style={styles.textPlace}>
                        <Text style={styles.text}>Отчество:</Text>
                    </View>
                    <View style={styles.inputPlace}>
                        <TextInput
                          returnKeyType = { "next" }
                          style={styles.input}
                          value={patronymic}
                          onChangeText={value => setPatronymic(value)}
                        />
                    </View>
                    <View style={{alignItems:'center', marginBottom: 5}}>
                        <Text style={styles.text}>Дата рождения:</Text>
                    </View>
                    <View style={{width:width*0.8, flexDirection:'row', alignItems:'flex-end', marginBottom: 10}}>
                        <View style={{width:width*0.23, alignItems:'flex-end'}}>
                            
                            <TextInput style={styles.input1}
                            returnKeyType = { "next" }
                            value={birthDay} 
                            keyboardType="phone-pad"
                            onChangeText={value => setBirthDay(value)}
                            />
                        </View>
                        <View style={{width:width*0.23, alignItems:'flex-end'}}>
                            <TextInput style={styles.input1}
                            returnKeyType = { "next" }
                           value={birthMonth}
                           keyboardType="phone-pad"
                            onChangeText={value  => setBirthMonth(value)}
                            />
                        </View>
                        <View style={{width:width*0.34, alignItems:'flex-end'}}>
                            <TextInput style={styles.input2} 
                            value={birthYear}
                            keyboardType="phone-pad"
                            returnKeyType = { "next" }
                            onChangeText={value => setBirthYear(value)}
                            />
                        </View>
                        </View>
                               
                    <View style={styles.textPlace}>
                        <Text style={styles.text}>Город:</Text>
                    </View>
                    <View style={styles.inputPlace}>
                        <TextInput
                        style={styles.input}
                        value={cityName}
                        onChangeText={value => setCityName(value)} 
                         />
                    </View>
                    </KeyboardAvoidingView> 
                    <View style={styles.buttonPlace}>
                        <FlatButton   
                        text="Регистрация" 
                        onPress={registrationUser} />
                    </View>
                    <View style={styles.mbuttonPlace}>
                        <FlatButton2    text="Выход" onPress={()=>{
                        navigation.push('Reg2')
                        }}/>
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
            padding: 3,
            borderRadius: 30,
            borderColor: 'white' ,
            color: 'white', 
            fontSize: 23,
            textAlign: 'center',
        },
        input1:{
            borderWidth: 2,
            width: '96%',
            padding: 3,
            borderRadius: 30,
            borderColor: 'white' ,
            color: 'white', 
            fontSize: 25,
            textAlign: 'center',

        },
        input2:{
            borderWidth: 2,
            width: '97%',
            padding: 3,
            borderRadius: 30,
            borderColor: 'white' ,
            color: 'white', 
            fontSize: 25,
            textAlign: 'center',
        },
        imagePlace:{
            marginBottom: 10,
            justifyContent:'center',
            alignItems:'center',
        },
        textPlace:{
            marginBottom: 5,
            justifyContent:'flex-end',
            alignItems:'center',
        },
        inputPlace:{
            marginBottom: 10,
            justifyContent:'center',
            alignItems:'center',    
        },
        buttonPlace:{
            marginTop: 10,
            marginBottom: 10,
            justifyContent:'center',
            alignItems:'center',    
        },
        mbuttonPlace:{
            marginBottom: 10,
            justifyContent:'center',
            alignItems:'center'    
        },
        mtextPlace:{
            justifyContent:'center',
            alignItems:'center'   
        } 
    });