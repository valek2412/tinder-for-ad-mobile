import * as React from 'react';
import {View, Text, StyleSheet,TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FlatButton3 from '../button3';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { useState, useEffect } from 'react';
import axios from "axios";
const { Dimensions } = require('react-native');
const { width, height } = Dimensions.get('screen');
import { API_URL } from '../config'

export function DrawerContent(props) {
  const [id,setId]= useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [balance, setBalance] = useState(0);
  const [prizes, setPrizes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await SecureStore.getItemAsync('userId');
        const user = await axios.get(`${API_URL}/users/${userId}`);
        const prizes = await axios.get(`${API_URL}/prizes`);
        setId(userId);
        setBalance(user.data.points);
        setName(user.data.name);
        setSurname(user.data.surname);
        setPrizes(prizes.data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [balance])
    
    return(
        <LinearGradient start={{x:-0.15, y:-0.15}} end={{x: 1, y: 1}} style={styles.container }  colors={['#9900cc', '#6666ff']}>
      <View >
        <View style={{flexDirection:'row'}}>
          <View style={{height:height*0.143,justifyContent:'flex-end',alignItems:'flex-start',paddingLeft:width*0.1}}>
            <Text style={styles.userInf}>{name}{"\n"}{surname}</Text>
          </View>
          <View style={{height:height*0.143,justifyContent:'flex-end',alignItems:'flex-start',paddingLeft:width*0.15}}>

            <FlatButton3  onPress={() => props.navigation.closeDrawer()}/>
          </View>
        </View>
        
        <View style={{flexDirection:"row", alignItems: 'center',justifyContent:'flex-start',paddingLeft:width*0.1}}>
          <View style={{flex:3,alignItems: 'flex-start' }}>
              <Text style={{fontSize:50, color:'#FFF'}}>{balance}</Text>
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
        {prizes.map(prize => (
          <View style={{alignItems: 'center', height: height * 0.12}}>
            <TouchableOpacity onPress={async () => {
              await axios.post(`${API_URL}/winners`, {userId: id, prizeId: prize.id})
                .then(response => {
                  setBalance(prevState => prevState - prize.cost)
                })
                .catch(err => {
                  if (err.response.status === 400) {
                    Alert.alert(
                      "Ошибка",
                      "Недостаточно средств",
                      [
                        {
                          text: "OK", onPress: () => {
                          }
                        }
                      ]);
                  }
                })
            }}>
              <View style={styles.button1}>
                <Text style={styles.buttontext}>
                  {prize.title}
                </Text>
                <Text style={styles.buttontext2}>
                  {prize.cost}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
        <View style={{alignItems:'center',height:height*0.07}}>
          <TouchableOpacity style={styles.container} onPress={()=>props.navigation.navigate('Log1')}>
              <View style={styles.button}>
                  <Text style={styles.smallbuttontext2}>
                      Выход
                  </Text>
              </View>
          </TouchableOpacity>
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