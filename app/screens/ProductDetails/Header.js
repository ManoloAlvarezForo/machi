/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, Platform} from 'react-native';
import Animated from 'react-native-reanimated';
import {useValue, withTimingTransition} from 'react-native-redash';
import {useSafeArea} from 'react-native-safe-area-context';

import {useNavigation} from '@react-navigation/native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {HEADER_IMAGE_HEIGHT} from './HeaderImage';
import IconButton from '../../components/IconButton/IconButton';
import {interpolateColors} from './interpolateColors';

const ICON_SIZE = 22;
const PADDING = 10;
export const MIN_HEADER_HEIGHT = 64;
const {interpolate, Extrapolate, useCode, greaterThan, set, block} = Animated;

const topHeader = Platform.OS === 'ios' ? -20 : 40;

export default ({y, product}) => {
  const navigation = useNavigation();
  const toggle = useValue(0);
  const insets = useSafeArea();
  const transition = withTimingTransition(toggle, {duration: 100});
  const {top: paddingTop} = insets;
  const translateX = interpolate(y, {
    inputRange: [0, HEADER_IMAGE_HEIGHT],
    outputRange: [-ICON_SIZE - PADDING, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const translateY = interpolate(y, {
    inputRange: [-100, topHeader, HEADER_IMAGE_HEIGHT],
    outputRange: [
      HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT + 100,
      HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT,
      -2.5,
    ],
    extrapolateRight: Extrapolate.CLAMP,
  });
  const opacity = transition;
  useCode(() => block([set(toggle, greaterThan(y, HEADER_IMAGE_HEIGHT))]), [
    toggle,
    y,
  ]);
  return (
    <Animated.View style={[styles.container, {paddingTop}]}>
      <Animated.View
        style={{
          backgroundColor: 'black',
          ...StyleSheet.absoluteFillObject,
          opacity,
        }}
      />
      <View style={styles.header}>
        <TouchableWithoutFeedback onPress={() => navigation.pop()}>
          <View>
            <IconButton color="white" name={'arrow-back'} />
            <Animated.View
              style={{...StyleSheet.absoluteFillObject, opacity: transition}}>
              <IconButton color="white" name={'arrow-back'} />
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
        <Animated.Text
          style={[
            {
              backgroundColor: interpolateColors(
                y,
                [0.7, 1],
                ['#060606', '#ffffff'],
              ),
            },
            styles.title,
            {
              transform: [{translateX}, {translateY}],
            },
          ]}>
          {product.productName}
        </Animated.Text>

        <IconButton
          style={{display: 'flex', marginLeft: 'auto'}}
          color="white"
          name={'heart-empty'}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  header: {
    flexDirection: 'row',
    height: MIN_HEADER_HEIGHT,
    alignItems: 'center',
    paddingHorizontal: PADDING,
  },
  title: {
    backgroundColor: 'black',
    fontSize: 21,
    marginLeft: PADDING,
    padding: 5,
    fontWeight: 'bold',
    borderRadius: 5,
    overflow: 'hidden',
  },
});
