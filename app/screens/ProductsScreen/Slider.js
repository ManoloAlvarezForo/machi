import React from 'react';
import {ScrollView, View, Text, Dimensions} from 'react-native';
import {BASE_URL} from '../../config';
import CarouselItem from './CarouselItem';
import Product from './Product';
const {width} = Dimensions.get('window');
const height = width * 0.6;

export default function Slider({renderItems, title, loading}) {
  return (
    <View style={{width: width, marginTop: 10}}>
      {title !== undefined && (
        <Text
          style={{
            color: '#252525',
            marginLeft: 10,
            fontSize: 17,
            fontWeight: 'bold',
            marginBottom: 10,
          }}>
          {title}
        </Text>
      )}
      <ScrollView
        horizontal
        scrollEnabled
        // pagingEnabled
        scrollEventThrottle={16}
        decelerationRate={'fast'}
        showsHorizontalScrollIndicator={false}
        style={{width: 'auto'}}>
        {renderItems()}
      </ScrollView>
    </View>
  );
}
