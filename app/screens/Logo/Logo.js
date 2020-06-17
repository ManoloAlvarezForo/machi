import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import DeliveryIcon from '../../components/FavoriteIcon/DeliveryIcon';

export default function () {
  return (
    <View style={styles.logoContainer}>
      <Text style={styles.logoText}>Machi</Text>
      <DeliveryIcon style={styles.icon} />
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 5,
    paddingTop: 5,
    paddingHorizontal: 8,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 0,
    backgroundColor: '#212027',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'white',
  },
  icon: {
    marginLeft: 5,
  },
});
