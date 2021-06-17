import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity,} from 'react-native';
export default function FlatButton4({text,onPress}) {
    return(
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                <Text style={styles.buttontext}>
                    { text }
                </Text>
            </View>
        </TouchableOpacity>
    )
}
    const  styles = StyleSheet.create({
        buttontext:{
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
        }
    
    })