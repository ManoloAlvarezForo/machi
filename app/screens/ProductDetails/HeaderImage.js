import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';
import {BASE_URL} from '../../config';
import {getStatusBarHeight} from 'react-native-status-bar-height';
const {Extrapolate, interpolate} = Animated;
const {width: wWidth} = Dimensions.get('window');

export const HEADER_IMAGE_HEIGHT = 270 + getStatusBarHeight();
const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: wWidth,
    resizeMode: 'cover',
  },
});

export default ({y, product}) => {
  const height = interpolate(y, {
    inputRange: [-100, 0],
    outputRange: [HEADER_IMAGE_HEIGHT + 100, HEADER_IMAGE_HEIGHT],
    extrapolateRight: Extrapolate.CLAMP,
  });
  const top = interpolate(y, {
    inputRange: [0, 100],
    outputRange: [0, -100],
    extrapolateLeft: Extrapolate.CLAMP,
  });
  return (
    <Animated.Image
      source={{uri: `${BASE_URL}${product.thumb.url}`}}
      style={[styles.image, {top, height}]}
    />
  );
};
