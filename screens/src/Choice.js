import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { COLORS } from './constants';
const { Dimensions } = require('react-native');
const { width, height } = Dimensions.get('screen');

export default function Choice({ type }) {
  const color = COLORS[type];

  // return (
  //   <View style={[styles.container, { borderColor: color }]}>
  //     <Text style={[styles.text, { color }]}>{type}</Text>
  //   </View>
  // );

  if (type=='like'){
    return(
      <View style={styles.container}>
                <Image 
                style={{flex: 1,
                    aspectRatio: 1, 
                    resizeMode: 'contain',}}
                source={require('../assets/like.png')}/>
            </View>
    );
  }
  if (type=='nope'){
    return(
      <View style={styles.container}>
                <Image 
                style={{flex: 1,
                    aspectRatio: 1, 
                    resizeMode: 'contain',}}
                source={require('../assets/diss.png')}/>
            </View>
    );
  }

}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    height:height*0.1,
    justifyContent:'center',
    alignItems:'center'
  }
});