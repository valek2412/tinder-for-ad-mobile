import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity,} from 'react-native';
export default function FlatButton7({text,onPress}) {
    return(
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.button}>
                <Text style={styles.buttontext}>
                    { text }
                </Text>
            </View>
        </TouchableOpacity>
    )
}
    const  styles = StyleSheet.create({
        container:{
            paddingTop: 50
        },
        buttontext:{
            color: "white",
            fontSize: 13           
        },
        button:{
            backgroundColor: 'rgba(52, 52, 52, 0)',
            width: '80%',
            padding: 0,
            marginVertical: 0,
            borderRadius: 30,   
        }
    
    })