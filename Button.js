import React from 'react';
import {View, StyleSheet, Text,TouchableOpacity} from 'react-native';
const { Dimensions } = require('react-native');
const { width, height } = Dimensions.get('screen');
export default function FlatButton({text,onPress,disabled}) {
    return(
        <TouchableOpacity onPress={onPress} disabled={disabled}>
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
            color: "#6666ff",
            textAlign: 'center',
            fontSize: 18           
        },
        button:{
            backgroundColor: "white",
            width: width*0.81,
            padding: 12,
            borderRadius: 30,   
        }
})
