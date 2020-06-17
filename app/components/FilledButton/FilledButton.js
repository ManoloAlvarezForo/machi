import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const FilledButton = ({title, style, onPress}) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Text style={styles.text}>{title.toUpperCase()}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ff4700',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 13,
    borderRadius: 8,
  },
  text: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
  },
});

export default FilledButton;
