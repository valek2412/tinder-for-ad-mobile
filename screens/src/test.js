import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, PanResponder, View, StyleSheet, Button,Text } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient'
import * as FirebaseRecaptcha from 'expo-firebase-recaptcha';
import * as firebase from 'firebase';
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



export default function Test() {
    return(
        <View style={styles.container}>

        <Button title="test" onPress={()=>{}}/>
	</View>
    )
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
