import * as React from 'react';
import {StyleSheet, Platform} from 'react-native';
import Animated from 'react-native-reanimated';
import {MIN_HEADER_HEIGHT, HEADER_DELTA} from './Model';
import {BUTTON_HEIGHT} from './ButtonOption';
import {getStatusBarHeight} from 'react-native-status-bar-height';
const {interpolate, Extrapolate} = Animated;
export default ({productName, y}) => {
  const opacity = interpolate(y, {
    inputRange: [HEADER_DELTA - 16, HEADER_DELTA],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });
  const textOpacity = interpolate(y, {
    inputRange: [HEADER_DELTA - 8, HEADER_DELTA - 4],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });
  return (
    <Animated.View style={[styles.container, {opacity}]}>
      <Animated.Text style={[styles.title, {opacity: textOpacity}]}>
        {productName}
      </Animated.Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  closeIcon: {
    position: 'absolute',
    top: getStatusBarHeight(),
    left: 10,
    fontWeight: 'bold',
  },
  container: {
    position: 'absolute',
    top: BUTTON_HEIGHT / 2 - MIN_HEADER_HEIGHT,
    left: 0,
    right: 0,
    height: MIN_HEADER_HEIGHT,
    backgroundColor: 'white',
    paddingTop: getStatusBarHeight(),
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
  },
  title: {
    color: 'black',
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    elevation: 2,
  },
  cont: {
    shadowRadius: 4,
    shadowColor: 'black',
    elevation: 1,
  },
});
