import * as React from 'react';
import {StyleSheet, View, Platform} from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';
import {onScrollEvent} from 'react-native-redash';
import {MAX_HEADER_HEIGHT, MIN_HEADER_HEIGHT, STATUS_BAR_HEIGHT} from './Model';
import ShufflePlay, {BUTTON_HEIGHT} from './ShufflePlay';
import Header from './Header';

const {interpolate, Extrapolate} = Animated;

const products = [
  {
    id: '1',
    productName: 'One',
    thumb: {
      url: '/images/products/silpancho.jpg',
    },
    price: 100,
  },
  {
    id: '2',
    productName: 'One',
    thumb: {
      url: '/images/products/silpancho.jpg',
    },
    price: 100,
  },
  {
    id: '3',
    productName: 'One',
    thumb: {
      url: '/images/products/silpancho.jpg',
    },
    price: 100,
  },
  {
    id: '4',
    productName: 'One',
    thumb: {
      url: '/images/products/silpancho.jpg',
    },
    price: 100,
  },
  {
    id: '5',
    productName: 'One',
    thumb: {
      url: '/images/products/silpancho.jpg',
    },
    price: 100,
  },
];

export default ({album: {artist, content}, y}) => {
  const height = interpolate(y, {
    inputRange: [-MAX_HEADER_HEIGHT, -BUTTON_HEIGHT / 2],
    outputRange: [0, MAX_HEADER_HEIGHT + BUTTON_HEIGHT],
    extrapolate: Extrapolate.CLAMP,
  });
  const opacity = interpolate(y, {
    inputRange: [-MAX_HEADER_HEIGHT / 2, 0, MAX_HEADER_HEIGHT / 2],
    outputRange: [0, 1, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  return (
    <Animated.ScrollView
      onScroll={onScrollEvent({y})}
      style={styles.container}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={1}
      stickyHeaderIndices={[1]}>
      <View style={styles.cover}>
        <Animated.View style={[styles.gradient, {height}]}>
          <LinearGradient
            style={StyleSheet.absoluteFill}
            start={{x: 0, y: 0.5}}
            end={{x: 0, y: 1}}
            colors={['transparent', 'rgba(0, 0, 0, 0.2)', 'white']}
          />
        </Animated.View>
        <View style={styles.artistContainer}>
          <Animated.Text style={[styles.artist, {opacity}]}>
            {artist}
          </Animated.Text>
        </View>
      </View>
      <View style={styles.header}>
        <Header {...{y, artist}} />
        <ShufflePlay />
      </View>
      <View style={styles.tracks}>{content}</View>
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  backIcon: {
    fontWeight: 'bold',
    position: 'absolute',
    top: STATUS_BAR_HEIGHT - 40,
    left: 10,
    elevation: 3,
    zIndex: 3,
  },
  container: {
    flex: 1,
    paddingTop: MIN_HEADER_HEIGHT - BUTTON_HEIGHT / 2,
  },
  cover: {
    height: MAX_HEADER_HEIGHT - BUTTON_HEIGHT,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
  },
  artistContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  artist: {
    marginTop: 60,
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  header: {
    marginTop: -BUTTON_HEIGHT,
  },
  tracks: {
    paddingTop: 32,
    backgroundColor: 'white',
  },
});
