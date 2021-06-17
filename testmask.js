import React, {useState} from 'react';
import { TextInputMask } from 'react-native-masked-text'
import {View} from 'react-native'
export default function testMask(){
    
    return(
        <TextInputMask 
        type={'cel-phone'}
        options={{
            maskType: 'BRL',
            withDDD: true,
            dddMask: '(99) '
          }}
          value={this.state.international}
          onChangeText={text => {
            this.setState({
              international: text
            })
          }}
        />
    )
}