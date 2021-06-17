import React,{useState} from 'react';
import {LoginScreen1} from './screens/LoginScreen1';
import {LoginScreen2} from './screens/LoginScreen2';
import {MainScreen1} from './screens/MainScreen1';
import {RegistrationScreen1} from './screens/RegistrationScreen1';
import {RegistrationScreen2} from './screens/RegistrationScreen2';
import {RegistrationScreen3} from './screens/RegistrationScreen3';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {SaleBonus} from './screens/saleBonus';

import Main from './screens/src/Main';
import { LinearGradient } from 'expo-linear-gradient';
import {  Text,StyleSheet, View, TouchableOpacity  } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import {DrawerContent} from './screens/Drawer'
import * as firebase from 'firebase';
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

const Stack = createStackNavigator();
function Root() {
  return (
    <NavigationContainer>
    <Stack.Navigator >
    
    <Stack.Screen options={{headerShown: false}} name="App2" component={App2} />
    <Stack.Screen options={{headerShown: false}} name="Reg1" component={RegistrationScreen1} />
      <Stack.Screen options={{headerShown: false}} name="Log1" component={LoginScreen1} />
      
      <Stack.Screen options={{headerShown: false}} name="Log2" component={LoginScreen2} />
      <Stack.Screen options={{headerShown: false}} name="Main" component={MainScreen1} />
      <Stack.Screen options={{headerShown: false}} name="Animation" component={Main} /> 
      <Stack.Screen options={{headerShown: false}} name="SaleBonus" component={SaleBonus} />
      <Stack.Screen options={{headerShown: false}} name="Reg2" component={RegistrationScreen2} />
      <Stack.Screen options={{headerShown: false}} name="Reg3" component={RegistrationScreen3} />
      <Stack.Screen options={{headerShown: false}} name="Drawer" component={DrawerContent} />
      {/* <Stack.Screen options={{headerShown: false}} name="App2" component={App2} /> */}
      <Stack.Screen options={{headerShown: false}} name="App" component={App} />
    </Stack.Navigator>
    </NavigationContainer>

  );
}
const Drawer2 = createDrawerNavigator();

function App2() {

  return (
      <Drawer2.Navigator initialRouteName="Anime2"  
      drawerContent={props => <DrawerContent {...props} />}>
        <Drawer2.Screen name="Anime2" component={Main} />
      </Drawer2.Navigator>
  );
}
const Drawer = createDrawerNavigator(); 
function App() {

  return (

      <Drawer.Navigator initialRouteName="Root"  
      drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="Root" component={MainScreen1} />
        <Drawer.Screen name="Anime" component={Main} />
        <Drawer.Screen name="UserRoot" component={SaleBonus} />
        <Drawer.Screen name="Exit" component={LoginScreen1} />
        <Drawer.Screen name="Root1" component={Root} />
      </Drawer.Navigator>

  );
}
export default Root;



