import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-ionicons';

const IconButton = ({name, style, color, onPress}) => {
  return (
    <TouchableOpacity style={(styles.container, style)} onPress={onPress}>
      <Icon name={name} color={color} size={38} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default IconButton;
