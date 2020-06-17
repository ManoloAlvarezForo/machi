/* eslint-disable max-len */
import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
// import {AntDesign as Icon} from '@expo/vector-icons';
import Animated, {Extrapolate, interpolate} from 'react-native-reanimated';
import {HEADER_IMAGE_HEIGHT} from './HeaderImage';
import {MIN_HEADER_HEIGHT} from './Header';
import IconButton from '../../components/IconButton/IconButton';

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  section: {
    padding: 16,
  },
  placeholder: {
    height: HEADER_IMAGE_HEIGHT - 60,
    marginBottom: MIN_HEADER_HEIGHT,
  },
  text: {
    // fontFamily: 'UberMoveRegular',
    fontSize: 14,
  },
  title1: {
    // fontFamily: 'UberMoveMedium',
    fontSize: 24,
  },
  title2: {
    //fontFamily: 'UberMoveMedium',
    fontSize: 16,
  },
  divider: {
    height: 2,
    backgroundColor: '#e2e3e4',
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  ratings: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  link: {
    color: '#247A00',
  },
  item: {
    borderBottomColor: '#e2e3e4',
    borderBottomWidth: 1,
    marginTop: 16,
  },
  title: {
    //fontFamily: 'UberMoveMedium',
    fontSize: 16,
    marginBottom: 8,
  },
  description: {
    marginBottom: 8,
  },
  price: {
    //fontFamily: 'UberMoveMedium',
    marginBottom: 16,
  },
});

export default ({y, product}) => {
  const opacity = interpolate(y, {
    inputRange: [
      HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT - 100,
      HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT,
    ],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  return (
    <>
      <View style={styles.placeholder} />
      <Animated.View style={[styles.section, {opacity}]}>
        <Text style={styles.text}>$$ • Asiatisch • Koreanisch • Japanisch</Text>
        <View style={styles.info}>
          <Text style={styles.text}>Opens at 11:30 AM</Text>
          <View style={styles.ratings}>
            <IconButton
              color="white"
              style={{height: 24, width: 24}}
              name={'star-outline'}
            />
            <Text style={styles.text}>(186)</Text>
          </View>
        </View>
      </Animated.View>
      <View style={styles.divider} />
      <View style={styles.section}>
        <Text style={styles.title2}>Restaurant info</Text>
        <View style={styles.info}>
          <Text style={styles.text}>Europaallee 48, Zürich, Zürich 8004</Text>
          <Text style={styles.link}>More info</Text>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.item} key={1}>
        <Text style={styles.title}>Manu</Text>
        <Text style={styles.description} numberOfLines={2}>
          {product.description}
        </Text>
        <Text style={styles.price}>{product.price}</Text>
      </View>
      <View style={styles.item} key={2}>
        <Text style={styles.title}>Manu</Text>
        <Text style={styles.description} numberOfLines={2}>
          This a description
        </Text>
        <Text style={styles.price}>500</Text>
      </View>
      <View style={styles.item} key={3}>
        <Text style={styles.title}>Manu</Text>
        <Text style={styles.description} numberOfLines={2}>
          This a description
        </Text>
        <Text style={styles.price}>500</Text>
      </View>
      <View style={{height}} />
    </>
  );
};
