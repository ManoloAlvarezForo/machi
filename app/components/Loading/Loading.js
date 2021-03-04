/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ActivityIndicator, StyleSheet, Dimensions, View} from 'react-native';
const {width} = Dimensions.get('window');

export function Loading({hasBackground}) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
      }}>
      <ActivityIndicator
        style={[
          styles.loadingIndicator,
          {
            backgroundColor: hasBackground ? '#fafafa' : 'none',
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
