import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, PanResponder, View, StyleSheet,Text,TouchableWithoutFeedback,BackHandler } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient'
import Card from './Card';
import FlatButton3 from '../button3';
import Footer from './Footer';
import { ACTION_OFFSET, CARD } from './constants';
import { pets as petsArray } from './data';
import ButtonInf from '../buttoninf';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS } from './constants';
import ButtonPoloska from '../buttonpoloska';
const { Dimensions } = require('react-native');
const { width, height } = Dimensions.get('screen');

export default function Main(props) {
  const [pets, setPets] = useState(petsArray);
  const [bool, setBool] = useState(false);
  const swipe = useRef(new Animated.ValueXY()).current;
  const tiltSign = useRef(new Animated.Value(1)).current;
  const backAction = () => {
    props.navigation.navigate('App')
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);
  const scale = useRef(new Animated.Value(1)).current;

  const animateScale = useCallback(
    (newValue) => {
      Animated.spring(scale, {
        toValue: newValue,
        friction: 4,
        useNativeDriver: true,
      }).start();
    },
    [scale]
  );
  useEffect(() => {
    if (!pets.length) {
      // setPets(petsArray);
      props.navigation.push('App')
    }
  }, [pets.length]);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, { dx, dy, y0 }) => {
      swipe.setValue({ x: dx, y: dy });
      tiltSign.setValue(y0 > CARD.HEIGHT / 2 ? 1 : -1);
    },
    onPanResponderRelease: (_, { dx, dy }) => {
      const direction = Math.sign(dx);
      const isActionActive = Math.abs(dx) > ACTION_OFFSET;
      const isActionActiveInf = Math.abs(dy) > 20;

      if (isActionActiveInf) {
        setBool(bool)
        console.log(bool)
      }
      if (isActionActive) {
        
        Animated.timing(swipe, {
          duration: 200,
          toValue: {
            x: direction * CARD.OUT_OF_SCREEN,
            y: dy,
          },
          useNativeDriver: true,
        }).start(removeTopCard);
      } else {
        Animated.spring(swipe, {
          toValue: {
            x: 0,
            y: 0,
          },
          useNativeDriver: true,
          friction: 5,
        }).start();
      }
    },
  });

  const removeTopCard = useCallback(() => {
    setPets((prevState) => prevState.slice(1));
    swipe.setValue({ x: 0, y: 0 });
  }, [swipe]);

  const handleChoice = useCallback(
    (direction) => {
      Animated.timing(swipe.x, {
        toValue: direction * CARD.OUT_OF_SCREEN,
        duration: 400,
        useNativeDriver: true,
      }).start(removeTopCard);
    },
    [removeTopCard, swipe.x]
  );

  return (
    <LinearGradient start={{x:-0.15, y:-0.15}} end={{x: 1, y: 1}} style={styles.gradient }  colors={['#9900cc', '#6666ff']}>
    <View style={styles.container}>
    
      {pets
        .map(({ name, source,description }, index) => {
          const isFirst = index === 0;
          const dragHandlers = isFirst ? panResponder.panHandlers : {};

          return (
            <Card
              key={name}
              name={name}
              description={description}
              source={source}
              isFirst={isFirst}
              swipe={swipe}
              tiltSign={tiltSign}
              handleChoice={handleChoice}
              bool = {bool}
              {...dragHandlers}
            />
          );
        })
        .reverse()}
    </View>
    
    <View style={{alignItems:'flex-start',paddingTop:0.01*height,position:'absolute'}}>
        <FlatButton3  onPress={()=>{props.navigation.openDrawer()}}/>
    </View>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  gradient: {

    height:'100%'
  },
  container:{
    flex: 1,
    //position:'absolute',
    alignItems: 'center',  
  },
  
  button: {
    width: 70,
    height: 70,
    backgroundColor: '#fff',
    //elevation: 5,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttoncontainer: {
    position: 'absolute',
     bottom: 40,
     height:0.06*height,
     width: width*.6,
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'space-between',
    // zIndex: -1,
  },
  gradient1: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 260,
    //borderRadius: CARD.BORDER_RADIUS,
  },
  name: {
    position: 'absolute',
    bottom:0.18*height,
    //left: 22,
    fontSize: 36,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.6)',
  },
  description:{
    position: 'absolute',
    bottom: 22,
    left: 22,
    fontSize: 15,
    // fontWeight: 'bold',
    color: 'rgba(0,0,0,0.6)',  
  }
});