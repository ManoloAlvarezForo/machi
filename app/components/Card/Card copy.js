import React from 'react';
import {StyleSheet, TouchableHighlight} from 'react-native';

export default function Card({style, children, onPress}) {
  return (
    <TouchableHighlight
      underlayColor="rgba(73,182,77,1,0.9)"
      style={[styles.card, style]}
      onPress={onPress}>
      {children}
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
  },
});
