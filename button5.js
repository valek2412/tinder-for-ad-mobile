import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity,} from 'react-native';
export default function FlatButton5({text1,text2,onPress}) {
    return(
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.button}>
                <View style={{flexDirection:"row", alignItems: 'center'}}>

                <View style={{flex:3}}>
                    <Text style={styles.buttontext}>
                        { text1 }
                        {' '}
                    </Text>
                </View>    
                <View style={{flex:2}}> 
                    <Text style={styles.text2}>
                    { text2 }
                    </Text>
                </View>       
                </View>
            </View>
        </TouchableOpacity>
    )
}
    const  styles = StyleSheet.create({
        container:{
            alignItems: 'center'
        },
        buttontext:{
            color: "white",
            fontSize: 15,
            textAlign: 'center'
                      
        },
        button:{

            backgroundColor: 'rgba(255, 255, 255, 0)',
            borderColor: 'white',
            borderWidth: 1,
            width: 180,
            height: 60,
            padding: 8,
            marginVertical: 10,
            borderRadius: 22,   
        },
        text2:{
            fontSize: 28,
            color: 'white',
        }
    
    })