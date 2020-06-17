/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
// import {useMutation} from '@apollo/client';

import {BASE_URL} from '../../config';
import {FavoriteIcon} from '../FavoriteIcon/FavoriteIcon';
import Card from '../Card/Card';
// import {ADD_OR_REMOVE_PRODUCT_FROM_FAVORITE} from '../graphql/requests';

export default function Product({product, onPress}) {
  // const [addOrRemoveProductFromFavorite] = useMutation(
  //   ADD_OR_REMOVE_PRODUCT_FROM_FAVORITE,
  //   {
  //     variables: {
  //       productId: product.id,
  //     },
  //   },
  // );

  const addOrRemoveProductFromFavorite = () => {
    alert('Ok');
  };

  return (
    <Card key={product.id} style={styles.card} onPress={onPress}>
      <Image style={styles.thumb} source={{uri: BASE_URL + product.url}} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{product.productName}</Text>
        <View style={{display: 'flex', flexDirection: 'row', marginTop: 10}}>
          <Text style={styles.description}>{product.description}</Text>
          <Text style={styles.price}>Bs. {product.price}</Text>
        </View>
      </View>
      <FavoriteIcon
        favorite={product.favorite}
        onPress={async () => {
          await addOrRemoveProductFromFavorite();
        }}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 20,
  },
  thumb: {
    height: 260,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    marginLeft: 'auto',
  },
  description: {
    display: 'flex',
    fontSize: 16,
    fontWeight: '400',
    color: '#787878',
    alignSelf: 'center',
  },
});
