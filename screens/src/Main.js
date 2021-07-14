import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, PanResponder, View, StyleSheet,Text,TouchableWithoutFeedback,BackHandler } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient'
import Card from './Card';
import FlatButton3 from '../button3';
import Footer from './Footer';
import { ACTION_OFFSET, CARD } from './constants';
import ButtonInf from '../buttoninf';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS } from './constants';
import ButtonPoloska from '../buttonpoloska';
import axios from "axios";
const { Dimensions } = require('react-native');
import * as SecureStore from 'expo-secure-store';
import FlatButton from "../../Button";
import {API_URL} from '../../config'

const { width, height } = Dimensions.get('screen');

export default function Main(props) {
  const [id, setId] = useState(null);
  const [ads, setAds] = useState([]);
  const [checkAds, setCheckAds] = useState(true)
  const [bool, setBool] = useState(false);
  const swipe = useRef(new Animated.ValueXY()).current;
  const tiltSign = useRef(new Animated.Value(1)).current;

  const backAction = () => {
    props.navigation.navigate('App')
    return true;
  };


  useEffect( () => {
    const fetchData = async () => {
      try{
        const userId = await SecureStore.getItemAsync('userId');
        const response = await axios.get(`${API_URL}/users/${userId}/notEvaluatedAds`);
        setAds(response.data)
        setId(userId);
      } catch (e) {
        console.log(e);
      }
    }
      fetchData();
  }, [checkAds])

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

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, { dx, dy, y0 }) => {
      swipe.setValue({ x: dx, y: dy });
      tiltSign.setValue(y0 > CARD.HEIGHT / 2 ? 1 : -1);
    },
    onPanResponderRelease: async (_, { dx, dy }) => {
      const direction = Math.sign(dx);
      const isActionActiveRight = dx > ACTION_OFFSET;
      const isActionActiveLeft = dx < -ACTION_OFFSET;
      const isActionActiveDown = dy > ACTION_OFFSET;

      if (isActionActiveDown) {
        await axios.post(`${API_URL}/evaluation`, { userId: id, adId: ads[0].id, mark: 'favourite'})
        Animated.timing(swipe, {
          duration: 200,
          toValue: {
            x: dx,
            y: CARD.OUT_OF_SCREEN,
          },
          useNativeDriver: true,
        }).start(removeTopCard);
      }
      if (isActionActiveRight) {
        await axios.post(`${API_URL}/evaluation`, { userId: id, adId: ads[0].id, mark: 'like'})
        Animated.timing(swipe, {
          duration: 200,
          toValue: {
            x: CARD.OUT_OF_SCREEN,
            y: dy,
          },
          useNativeDriver: true,
        }).start(removeTopCard);
      } else if (isActionActiveLeft) {
        await axios.post(`${API_URL}/evaluation`, { userId: id, adId: ads[0].id, mark: 'dislike'})
        Animated.timing(swipe, {
          duration: 200,
          toValue: {
            x: -CARD.OUT_OF_SCREEN,
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

  const removeTopCard = useCallback( () => {
    setAds((prevState) => prevState.slice(1));
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
      { ads.length ? (<View style={styles.container}>
      {ads
        .map(({ id, title, content, image }, index) => {
          const isFirst = index === 0;
          const dragHandlers = isFirst ? panResponder.panHandlers : {};

          return (
            <Card
              key={id}
              name={title}
              description={content}
              source={`${API_URL}/${image}`}
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
    </View>) : (<View style={{flexDirection: "column", alignItems: 'center'}}>
        <Text style={styles.text}>Новые предложения{"\n"} будут доступны{"\n"} после 18:00</Text>
        <View style={{height: height * 0.1}} />
        <FlatButton text="Проверить наличие доступных предложений" onPress={() => setCheckAds(prev => !prev)}/>
      </View>)}
    
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
  text: {
    fontFamily:'',
    paddingTop:200,
    textAlign:'center',
    fontSize: 25,
    color: 'white',
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