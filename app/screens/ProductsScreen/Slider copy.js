import React from 'react';
import {ScrollView, View, Text, Dimensions} from 'react-native';
import {BASE_URL} from '../../config';
import CarouselItem from './CarouselItem';
import Product from './Product';
const {width} = Dimensions.get('window');
const height = width * 0.6;

export default function Slider({products, title, loading}) {
  return (
    <View style={{width: width, marginTop: 10}}>
      {title !== undefined && (
        <Text
          style={{
            marginLeft: 10,
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 10,
          }}>
          {title}
        </Text>
      )}
      {loading === false && (
        <ScrollView
          horizontal
          scrollEnabled
          // pagingEnabled
          scrollEventThrottle={16}
          decelerationRate={'fast'}
          showsHorizontalScrollIndicator={false}
          style={{width: 'auto'}}>
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </ScrollView>
      )}
    </View>
  );
}
