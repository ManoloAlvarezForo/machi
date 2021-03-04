import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
// import DeliveryIcon from '../../components/FavoriteIcon/DeliveryIcon';
import Logo from '../../components/Logo/LogoSvg';

export default function () {
  return (
    <View>
      <Logo style={styles.icon} />
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
    borderRadius: 5,
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
