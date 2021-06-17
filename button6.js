import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity,} from 'react-native';
export default function FlatButton6({text1,text2,onPress}) {
    return(
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.button}>
                    <Text style={styles.buttontext}>
                        { text1 }
                    </Text>
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
            fontSize: 16,
            textAlign: 'center'                
        },
        button:{
            backgroundColor: 'rgba(255, 255, 255, 0)',
            borderColor: 'white',
            borderWidth: 1,
            width: 180,
            height: 60,
            padding: 8,
            marginVertical: 15,
            borderRadius: 22,   
        },
    })