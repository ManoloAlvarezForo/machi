import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

export default function Card({style, children, onPress}) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.card, style]}
      onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
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
