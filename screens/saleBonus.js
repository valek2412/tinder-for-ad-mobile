import * as React from 'react';
import {View, Text, SafeAreaView, DrawerItems, StyleSheet, Button,TouchableOpacity,BackHandler,Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
const { Dimensions } = require('react-native');
const { width, height } = Dimensions.get('screen');
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';
import {useEffect} from 'react';
import axios from "axios";
import {API_URL} from '../config'

export function SaleBonus(props) {
  const [id, setId] = useState('');
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


  const backAction = () => {
    props.navigation.push('App')
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);


  return (
    <View style={styles.container}>
      <View>
        <LinearGradient start={{x: -0.15, y: -0.15}} end={{x: 1, y: 1}} style={{alignItems: 'center'}}
                        colors={['#9900cc', '#6666ff']}>

          <View style={{height: height * 0.16, justifyContent: 'flex-end'}}>
            <Text style={styles.userInf}>{name}{"\n"}{surname}</Text>
          </View>
          <View style={styles.roundText}>
            <View style={{flex: 3, alignItems: 'center'}}>
              <Text style={{fontSize: 50, color: '#FFF'}}>{balance}</Text>
            </View>
            <View style={{flex: 2, alignItems: 'flex-start'}}>
              <Text style={{fontSize: 16, color: '#FFF'}}>Бонусов{"\n"} на счету</Text>
            </View>
          </View>
        </LinearGradient>
      </View>
      <View style={{alignItems: 'center'}}>
        <View style={{
          flexDirection: "row",
          height: height * 0.051,
          alignItems: 'center',
          backgroundColor: '#e6e6e6',
          width: width * 0.5,
          borderRadius: 30,
          position: 'absolute',
          bottom: height * 0.525
        }}>
          <View style={{width: width * 0.133, alignItems: 'flex-end'}}>
            <Ionicons name="bookmark-outline" size={28} color="#9900cc"/>

          </View>
          <View style={{width: width * 0.338, alignItems: 'center',}}>
            <TouchableOpacity

              onPress={() => {
              }}>
              <View style={styles.button}>
                <Text style={styles.smallbuttontext}>
                  Мой архив
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{height: height * 0.071}}/>
        {/*<View style={{alignItems:'center',height:height*0.12}}>*/}
        {/*  <TouchableOpacity onPress={()=>{}}>*/}
        {/*    <View style={styles.button1}>*/}
        {/*          <Text style={styles.buttontext}>*/}
        {/*          Преобразовать бонусы в скидку*/}
        {/*          </Text>*/}
        {/*      </View>*/}
        {/*  </TouchableOpacity>*/}
        {/*</View>*/}
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
        {/*<View style={{alignItems:'center',height:height*0.12}}>*/}
        {/*  <TouchableOpacity onPress={()=>{}}>*/}
        {/*    <View style={styles.button1}>*/}
        {/*      <Text style={styles.buttontext}>*/}
        {/*        Списать*/}
        {/*      </Text>*/}
        {/*      <Text style={styles.buttontext2}>*/}
        {/*        200*/}
        {/*      </Text>*/}
        {/*    </View>*/}
        {/*  </TouchableOpacity>*/}
        {/*</View>*/}
        {/*<View style={{alignItems:'center',height:height*0.12}}>*/}
        {/*  <TouchableOpacity onPress={() => {}}>*/}
        {/*    <View style={styles.button1}>*/}
        {/*          <Text style={styles.buttontext}>*/}
        {/*          Списать */}
        {/*          </Text>*/}
        {/*          <Text style={styles.buttontext2}>*/}
        {/*          400 */}
        {/*          </Text>*/}
        {/*      </View>*/}
        {/*  </TouchableOpacity>*/}
        {/*</View>*/}
        {/*<View style={{alignItems:'center',height:height*0.12}}>*/}
        {/*  <TouchableOpacity onPress={()=>{}}>*/}
        {/*    <View style={styles.button1}>*/}
        {/*          <Text style={styles.buttontext}>*/}
        {/*          Списать*/}
        {/*          </Text>*/}
        {/*          <Text style={styles.buttontext2}>*/}
        {/*          600*/}
        {/*          </Text>*/}
        {/*      </View>*/}
        {/*  </TouchableOpacity>*/}
        {/*</View>*/}


        {/* <View style={{alignItems:'center',height:height*0.07}}>
              <TouchableOpacity style={styles.container} onPress={()=>props.navigation.navigate('Exit')}>
                  <View style={styles.button}>
                      <Text style={styles.smallbuttontext2}>
                          Выход
                      </Text>
                  </View>
              </TouchableOpacity>
            </View> */}
      </View>
    </View>
  )
}

const styles= StyleSheet.create({
    container:{
        height:'100%',
        backgroundColor:'#fff'
    },
    userInf:{
        fontSize:24,
        textAlign: 'center',
        color:'#FFF',
  
    },
  
    smallbuttontext:{
      color: "#9900cc",
      fontSize: 18,

                
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
    borderColor: '#d4d4d4',
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
    color: "#9900cc",
    fontSize: 15,
    textAlign: 'center',
    flex:3   
  },
  buttontext2:{
    fontSize: 28,
    color: '#9900cc',
    flex:2   
  },
  smallbuttontext2:{
    color: "#9900cc",
    fontSize: 15
  },
  roundText:{
    justifyContent:'center',
    backgroundColor: 'rgba(255, 255, 255, 0)',
    borderColor: 'white',
    borderWidth: 1,
    width:width*0.7,
    height: 60,
    padding: 8,
    marginVertical: 30,
    borderRadius: 30,
    flexDirection:"row", 
    alignItems: 'center'
  }
   
  });
