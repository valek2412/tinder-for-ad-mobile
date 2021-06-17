import React from 'react';
import { View, StyleSheet } from 'react-native';

import RoundButton from './RoundButton';

import { COLORS } from './constants';
const { Dimensions } = require('react-native');
const { width, height } = Dimensions.get('screen');
export default function Footer({ handleChoice}) {
  return (
    <View style={styles.container}>
      <RoundButton
        name="times"
        size={40}
        color={COLORS.nope}
        onPress={() => handleChoice(-1)}
      />

      <RoundButton
        name="heart"
        size={34}
        color={COLORS.like}
        onPress={() => handleChoice(1)}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
     bottom: 15,
     height:0.06*height,
     width: width*.6,
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'space-between',
    // zIndex: -1,
  },
});
