/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import FeatherIcons from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

export default function HeaderLeftButton() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      onPress={() => navigation.goBack()}>
      <FeatherIcons name="chevron-left" color="#ffffff" size={24} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    opacity: 0.7,
    height: 36,
    width: 36,
    borderRadius: 36 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
