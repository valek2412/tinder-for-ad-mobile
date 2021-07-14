import React, {useState} from 'react';
import {View, StyleSheet, Text, TextInput, Image, SafeAreaView, TouchableOpacity,BackHandler,Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FlatButton3 from '../button3';
import FlatButton from '../Button';
import * as SecureStore from 'expo-secure-store';
import {useEffect} from 'react';
import axios from "axios";
import Main from "./src/Main";
const { Dimensions } = require('react-native');
const { width, height } = Dimensions.get('screen');
import {API_URL} from '../config'


export  function MainScreen1({route,navigation}) {
  const [id, setId]= useState('');
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userId = await SecureStore.getItemAsync('userId');
      const ads = await axios.get(`${API_URL}/users/${userId}/notEvaluatedAds`);
      setId(userId);
      setAds(ads.data);
    }
    fetchData();
  }, [])

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
       ads.length ? ( <LinearGradient start={{x: -0.15, y: -0.15}} end={{x: 1, y: 1}} style={styles.container}
                  colors={['#9900cc', '#6666ff']}>
    <View style={{alignItems: 'flex-start', paddingTop: 0.01 * height}}>
      <FlatButton3 onPress={() => {
        navigation.openDrawer()
      }}/>
    </View>
    <View style={{flexDirection: "column", alignItems: 'center'}}>
      <Text style={styles.text}>Новые предложения{"\n"} будут доступны{"\n"} после 18:00</Text>
      <View style={{height: height * 0.1}}></View>
      <FlatButton text="Попробовать анимацию" onPress={() => navigation.push("App2")}/>

    </View>
  </LinearGradient>) :
         (<Main ads></Main>)
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