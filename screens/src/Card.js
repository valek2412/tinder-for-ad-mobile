import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback,useState } from 'react';
import { Animated, Image, Text, StyleSheet, View, SafeAreaView, TouchableOpacity } from 'react-native';
import Choice from './Choice';
import { ACTION_OFFSET } from './constants';
import { CARD, WIDTH } from './constants';
import ButtonInf from '../buttoninf';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS } from './constants';
import ButtonPoloska from '../buttonpoloska';
const { Dimensions } = require('react-native');
const { width, height } = Dimensions.get('screen');
import FlatButton3 from '../button3';
  
export default function Card({
  title,
  source,
  content,
  isFirst,
  swipe,
  tiltSign,
  handleChoice,
  bool,
  ...rest
},navigation) {
  const [shouldShow, setShouldShow] = useState(bool);
  const rotate = Animated.multiply(swipe.x, tiltSign).interpolate({
    inputRange: [-ACTION_OFFSET, 0, ACTION_OFFSET],
    outputRange: ['8deg', '0deg', '-8deg'],
  });

  const likeOpacity = swipe.x.interpolate({
    inputRange: [25, ACTION_OFFSET],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const nopeOpacity = swipe.x.interpolate({
    inputRange: [-ACTION_OFFSET, -25],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const animatedCardStyle = {
    transform: [...swipe.getTranslateTransform(), { rotate }],
  };

  const renderChoice = useCallback(() => {

    return (
      <>
        <Animated.View
          style={[
            styles.choiceContainer,
            styles.likeContainer,
            { opacity: likeOpacity },
          ]}
        >
          <Choice type="like" />
        </Animated.View>
        <Animated.View
          style={[
            styles.choiceContainer,
            styles.nopeContainer,
            { opacity: nopeOpacity },
          ]}
        >
          
          <Choice type="nope" />
        </Animated.View>
      </>
    );
  }, [likeOpacity, nopeOpacity]);
  
    
  
  return (
    <View style={styles.container}>
     
    <Animated.View
      style={ isFirst && animatedCardStyle}
      {...rest}
    >
      
      <Image source={{uri: source}} style={styles.image} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.9)']}
        style={styles.gradient}
      />
      <View style={{alignItems:'center'}}>
        <Text style={styles.name}>{title}</Text>
      </View>

      <View style={{width:CARD.WIDTH*0.9}}><Text style={styles.description}>{content}</Text></View>
  
        
      {isFirst && renderChoice()}
     
    </Animated.View>
     {
      shouldShow && (
        <SafeAreaView style={{position:'absolute',backgroundColor:'rgba(255,255,255,0.6)', height:0.3*height,bottom:0,width:'100%',borderTopLeftRadius:20,borderTopRightRadius:20,alignItems:'center',flexDirection:'column'}}>
          <TouchableOpacity onPress={()=>setShouldShow(!shouldShow)}>
              <View style={{flex:1,alignItems:'center'}}>
              <ButtonPoloska onPress={()=>setShouldShow(!shouldShow)}/>
              </View>
              <View style={{flex:2,alignItems:'center'}}>
                <Text style={styles.name}>{title}</Text>
                </View>         
                <View style={{flex:7}}>
                <Text style={styles.description}>{content}</Text>
                </View>               
       
          </TouchableOpacity>
        </SafeAreaView>
              )
    } 
    <View style={{alignItems:'center'}}>
    {
      !shouldShow && (
         <View style={styles.buttoncontainer}>
          
          <SafeAreaView>
            <TouchableOpacity onPress={() => handleChoice(-1)}>
          {/* onPress={() => handleChoice(1) */}
          <View style={{height:height*0.085,
            justifyContent:'center',
            alignItems:'center'}}>
                    <Image 
                    style={{flex: 1,
                        aspectRatio: 1, 
                        resizeMode: 'contain',}}
                    source={require('../assets/diss.png')}/>
                </View>
          </TouchableOpacity>
          </SafeAreaView>
        <View style={{flex:1, alignItems:'center'}}>
        <ButtonInf  
             onPress={()=>{setShouldShow(!shouldShow) }}
          />
        </View>
        
       <SafeAreaView>
            <TouchableOpacity onPress={() => handleChoice(1)}>
            <View style={{height:height*0.085,
            justifyContent:'center',
            alignItems:'center'}}>
                    <Image 
                    style={{flex: 1,
                        aspectRatio: 1, 
                        resizeMode: 'contain',}}
                    source={require('../assets/like.png')}/>
                </View>
          </TouchableOpacity>
          </SafeAreaView>
        </View>
        )
      }
      </View>
       
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    //top: 45,
  },
  image: {
    width: CARD.WIDTH,
    height: CARD.HEIGHT,
    //borderRadius: CARD.BORDER_RADIUS,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 260,
    //borderRadius: CARD.BORDER_RADIUS,
  },
  name: {
    //position: 'absolute',
    //bottom:0.18*height,
    //left: 22,
    fontSize: 36,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.6)',
  },
  choiceContainer: {
    position: 'absolute',
    top: 50,
  },
  likeContainer: {
    left: 25,
    //transform: [{ rotate: '-30deg' }],
  },
  nopeContainer: {
    right: 25,
    //transform: [{ rotate: '30deg' }],
  },
  description:{
    //position: 'absolute',
    paddingLeft:width*0.05,
    paddingRight:width*0.05,
    paddingTop:height*0.03,
    fontSize: 15,
    // fontWeight: 'bold',
    color: 'rgba(0,0,0,0.6)',  
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
     height:0.15*height,
     width: width*0.8,
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'space-between',
    // zIndex: -1,
  },
});
