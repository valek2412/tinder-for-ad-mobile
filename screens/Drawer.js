import * as React from 'react';
import {View, Text, StyleSheet,TouchableOpacity, Alert } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { LinearGradient } from 'expo-linear-gradient';
import FlatButton3 from '../button3';
import FlatButton4 from '../button4';
import FlatButton5 from '../button5';
import { Ionicons } from '@expo/vector-icons';
// import FlatButton2 from '../button2';
import FlatButton6 from '../button6';
import FlatButton7 from '../button7';
import * as SecureStore from 'expo-secure-store';
import { useState,useEffect } from 'react';
import * as firebase from 'firebase';
const { Dimensions } = require('react-native');
const { width, height } = Dimensions.get('screen');
const getToken = () => {
    return SecureStore.getItemAsync('secure_token');
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
function getUserLast(userID) {
    var tester;
    var database = firebase.database().ref(`/users/${userID}`);
    console.log('Auto generated key: ', database.key);
    database.on('value', (snapshot)=>{
    if (snapshot.exists()) {
         console.log(snapshot);
        const userObj = snapshot.val();
        tester = userObj.lastName;
        }
    })
    return tester;
};
function getUserFirst(userID) {
    var tester;
    var database = firebase.database().ref(`/users/${userID}`);
    console.log('Auto generated key: ', database.key);
    database.on('value', (snapshot)=>{
    if (snapshot.exists()) {
         console.log(snapshot);
        const userObj = snapshot.val();
        tester = userObj.firstName;
        }
    })
    return tester;
};
function getUserMoney(userID) {
  var tester;
  var database = firebase.database().ref(`/users/${userID}`);
  console.log('Auto generated key: ', database.key);
  database.on('value', (snapshot)=>{
  if (snapshot.exists()) {
       console.log(snapshot);
      const userObj = snapshot.val();
      tester = userObj.money;
      }
  })
  return tester;
};

//getToken().then(token => setId(token)),console.log(id)
export function DrawerContent(props) {
    const [id,setId]= useState('')
    //getToken().then(token => setId(token))
    function updateUserManey(userID, addManey){
      const reference = firebase.database().ref(`/users/${userID}/money`);
      return reference.transaction(money => {
          if(addManey>money){
            Alert.alert(
              "Ошибка",
              "Недостаточно средств!",
              [
              { text: "OK", onPress: () => {} }
              ]);
          }else{
            getUserMoney(id)
            if (money === null) return addManey;
            
            return money - addManey;
            }
          });
    }
    
    return(
        <LinearGradient start={{x:-0.15, y:-0.15}} end={{x: 1, y: 1}} style={styles.container }  colors={['#9900cc', '#6666ff']}>
      <View >
        <View style={{flexDirection:'row'}}>
          <View style={{height:height*0.143,justifyContent:'flex-end',alignItems:'flex-start',paddingLeft:width*0.1}}>
            <Text style={styles.userInf}>Имя{"\n"}Фамилия</Text>
          </View>
          <View style={{height:height*0.143,justifyContent:'flex-end',alignItems:'flex-start',paddingLeft:width*0.15}}>

            <FlatButton3  onPress={() => props.navigation.closeDrawer()}/>
          </View>
        </View>
        
        <View style={{flexDirection:"row", alignItems: 'center',justifyContent:'flex-start',paddingLeft:width*0.1}}>
          <View style={{flex:3,alignItems: 'flex-start' }}>
              <Text style={{fontSize:50, color:'#FFF'}}>2000</Text>
          </View>
          <View style={{flex:2,alignItems: 'flex-start'}}>
              <Text style={{fontSize:16, color:'#FFF'}}>Бонусов{"\n"}на счету</Text>
          </View>            
        </View>
        <View style={{flexDirection:"row",height:height*0.071, alignItems:'center'}}>
          <View style={{flex:2, alignItems:'flex-end'}} >
            <Ionicons name="bookmark-outline" size={32} color="#FFF"  />
          </View>
          <View style={{flex:4,alignItems:'flex-start'}}>
            <TouchableOpacity
            
            onPress={()=>props.navigation.navigate('UserRoot')}>
              <View style={styles.button}>
                    <Text style={styles.smallbuttontext}>
                        Мой архив
                    </Text>
                </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{alignItems:'center',height:height*0.12}}>
          <TouchableOpacity onPress={()=>props.navigation.navigate('UserRoot')}>
            <View style={styles.button1}>
                  <Text style={styles.buttontext}>
                  Преобразовать бонусы в скидку
                  </Text>
              </View>
          </TouchableOpacity>
        </View>
        <View style={{alignItems:'center',height:height*0.12}}>
          <TouchableOpacity onPress={()=>{props.navigation.push('App')}}>
            <View style={styles.button1}>
                  <Text style={styles.buttontext}>
                  Списать 
                  </Text>
                  <Text style={styles.buttontext2}>
                  200
                  </Text>
              </View>
          </TouchableOpacity>
        </View>
        <View style={{alignItems:'center',height:height*0.12}}>
          <TouchableOpacity onPress={()=>{props.navigation.push('App')}}>
            <View style={styles.button1}>
                  <Text style={styles.buttontext}>
                  Списать 
                  </Text>
                  <Text style={styles.buttontext2}>
                  400 
                  </Text>
              </View>
          </TouchableOpacity>
        </View>
        <View style={{alignItems:'center',height:height*0.12}}>
          <TouchableOpacity onPress={()=>{props.navigation.push('App')}}>
            <View style={styles.button1}>
                  <Text style={styles.buttontext}>
                  Списать
                  </Text>
                  <Text style={styles.buttontext2}>
                  600
                  </Text>
              </View>
          </TouchableOpacity>
        </View>
        <View style={{alignItems:'center',height:height*0.07}}>
          {/* <TouchableOpacity style={styles.container} onPress={()=>props.navigation.navigate('Log1')}>
              <View style={styles.button}>
                  <Text style={styles.smallbuttontext2}>
                      Выход
                  </Text>
              </View>
          </TouchableOpacity> */}
        </View>
      </View> 
    </LinearGradient>);
}

const styles= StyleSheet.create({
    container:{
        height:'100%'
    },
    userInf:{
        fontSize:24,
        textAlign: 'left',
        color:'#FFF',
  
    },
  
    smallbuttontext:{
      color: "white",
      fontSize: 20,
      textDecorationLine: 'underline',
                
  },
  button:{
      backgroundColor: 'rgba(52, 52, 52, 0)',
      width: '75%',
      padding: 0,
      marginVertical: 0,
      borderRadius: 30,   
  },
  button1:{
    backgroundColor: 'rgba(255, 255, 255, 0)',
    borderColor: 'white',
    borderWidth: 1,
    width: 180,
    height: 60,
    padding: 8,
    marginVertical: 10,
    borderRadius: 30,
    flexDirection:'row',
    alignItems: 'center'   
  },
  buttontext:{
    color: "white",
    fontSize: 15,
    textAlign: 'center',
    flex:3   
  },
  buttontext2:{
    fontSize: 28,
    color: 'white',
    flex:2   
  },
  smallbuttontext2:{
    color: "white",
    fontSize: 15
  } 
  });