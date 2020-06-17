import React from 'react';
import {ScrollView, View, Text, Dimensions} from 'react-native';
import {BASE_URL} from '../../config';
import CarouselItem from './CarouselItem';
const {width} = Dimensions.get('window');
const height = width * 0.6;

export default function Slider({images, title}) {
  return (
    <View style={{width, marginTop: 10}}>
      {title !== undefined && (
        <Text style={{marginLeft: 10, fontSize: 20, fontWeight: 'bold'}}>
          {title}
        </Text>
      )}
      <ScrollView
        scrollEnabled
        scrollEventThrottle={16}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal
        style={{width: width}}>
        {images.map((image) => (
          <CarouselItem key={image.url} item={image} />
        ))}
      </ScrollView>
    </View>
  );
}
