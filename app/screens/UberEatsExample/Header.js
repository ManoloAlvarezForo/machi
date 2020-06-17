/* eslint-disable react-native/no-inline-styles */
import React, {RefObject} from 'react';
import {StyleSheet, View, Text, Platform} from 'react-native';
import Animated from 'react-native-reanimated';
import {
  useValue,
  withTimingTransition,
  useValues,
  get,
} from 'react-native-redash';
// import {Feather as Icon} from '@expo/vector-icons';
import {useSafeArea} from 'react-native-safe-area-context';

import {useNavigation} from '@react-navigation/native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {HEADER_IMAGE_HEIGHT} from './HeaderImage';
import TabHeader from './TabHeader';
import IconButton from '../../components/IconButton/IconButton';
// import {TabModel} from './Content';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {interpolateColors} from './interpolateColors';

const ICON_SIZE = 22;
const PADDING = 10;
export const MIN_HEADER_HEIGHT = getStatusBarHeight() + 45;
const {interpolate, Extrapolate, useCode, greaterThan, set, block} = Animated;

const topHeader = Platform.OS === 'ios' ? -getStatusBarHeight() + 20 : 0;

export default ({y, tabs, scrollView}) => {
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
    inputRange: [-100, 0, HEADER_IMAGE_HEIGHT],
    outputRange: [
      HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT + 100,
      HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT,
      0,
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
          ...StyleSheet.absoluteFillObject,
          opacity,
          backgroundColor: 'white',
        }}
      />
      <View style={styles.header}>
        <TouchableWithoutFeedback onPress={() => navigation.pop()}>
          <View>
            <IconButton color="white" name={'arrow-back'} />
            <Animated.View
              style={{...StyleSheet.absoluteFillObject, opacity: transition}}>
              <IconButton color="black" name={'arrow-back'} />
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
        <Animated.Text
          style={[
            {
              color: interpolateColors(y, [0.7, 1], ['#f5f5f5', '#060606']),
            },
            styles.title,
            {
              transform: [{translateX}, {translateY}],
            },
          ]}>
          Title example for header
        </Animated.Text>
        <IconButton color="white" name={'heart-empty'} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    marginTop: topHeader,
    left: 0,
    right: 0,
  },
  header: {
    flexDirection: 'row',
    height: MIN_HEADER_HEIGHT,
    alignItems: 'center',
    paddingHorizontal: PADDING,
  },
  titleContainer: {
    marginLeft: PADDING,
    fontWeight: 'bold',
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginLeft: PADDING,
    fontWeight: 'bold',
    flex: 1,
  },
});
