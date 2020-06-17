/* eslint-disable react-native/no-inline-styles */
import React from 'react';
// import {useQuery} from '@apollo/client';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import IconButton from '../IconButton/IconButton';
import FeatherIcons from 'react-native-vector-icons/Feather';

// import {GET_FAVORITE_PRODUCTS_COUNT} from '../graphql/requests';

function FeatherIconsWithBadge({name, badgeCount, color, size}) {
  return (
    <View style={{width: 24, height: 24}}>
      <FeatherIcons name={name} size={size} color={color} />
      {badgeCount > 0 && (
        <View
          style={{
            // On React Native < 0.57 overflow outside of parent will not work on Android, see https://git.io/fhLJ8
            position: 'absolute',
            right: -7,
            top: -1,
            backgroundColor: '#252525',
            borderRadius: 6,
            width: 14,
            height: 14,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#fff', fontSize: 10, fontWeight: 'bold'}}>
            {badgeCount}
          </Text>
        </View>
      )}
    </View>
  );
}

function HeartIconWithBadge(props) {
  // You should pass down the badgeCount in some other ways like React Context API, Redux, MobX or event emitters.
  return <FeatherIconsWithBadge {...props} badgeCount={3} />;
}

export default function HeaderSearchProducts() {
  //   const {data} = useQuery(GET_FAVORITE_PRODUCTS_COUNT);
  const count = 5;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      onPress={() => alert('Search Product')}>
      <FeatherIcons name="search" color="#fff" size={24} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    // backgroundColor: '#252525',
    height: 36,
    width: 36,
    borderRadius: 36 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});
