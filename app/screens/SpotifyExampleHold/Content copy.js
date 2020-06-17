import * as React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';
import {onScrollEvent} from 'react-native-redash';

import {Album, MAX_HEADER_HEIGHT, MIN_HEADER_HEIGHT} from './Model';
import Track from './Track';
import ShufflePlay, {BUTTON_HEIGHT} from './ShufflePlay';
import Header from './Header';
import Card from '../../components/Card/Card';
import {BASE_URL} from '../../config';
import {FavoriteIcon} from '../../components/FavoriteIcon/FavoriteIcon';
import Product from '../../components/Product/Product';

const {interpolate, Extrapolate} = Animated;

export default ({album: {artist, tracks}, y}) => {
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
  const productData = {
    id: '1',
    thumb: {
      url: '/images/products/canelones.jpg',
    },
    productName: 'Canelones',
    price: 100,
  };
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
            start={{x: 0, y: 0.3}}
            end={{x: 0, y: 1}}
            colors={['transparent', 'rgba(0, 0, 0, 0.2)', 'black']}
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
      <View style={styles.tracks}>
        <View style={{backgroundColor: 'black'}}>
          <Product key={1} product={productData} onPress={() => {}} />
          <Product key={2} product={productData} onPress={() => {}} />
        </View>
      </View>
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
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
  },
  artist: {
    textAlign: 'center',
    color: 'white',
    fontSize: 48,
    fontWeight: 'bold',
  },
  header: {
    marginTop: -BUTTON_HEIGHT,
  },
  tracks: {
    paddingTop: 32,
    backgroundColor: 'black',
  },
});
