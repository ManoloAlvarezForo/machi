import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Svg, Path} from 'react-native-svg';

export function FavoriteIcon({favorite, onPress}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={onPress}>
      <Svg
        width={16}
        height={16}
        viewBox="0 0 24 24"
        fill={favorite ? '#ff2134' : 'none'}
        stroke="#ff2134"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round">
        <Path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </Svg>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 3,
    top: 120 - 25 / 2,
    height: 26,
    width: 26,
    borderRadius: 64 / 2,
    // backgroundColor: '#ff4700',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    // borderRadius: 16,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
  },
});
