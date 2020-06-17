/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, StyleSheet, Text, View, Dimensions} from 'react-native';
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
      <Image
        style={styles.thumb}
        source={{uri: BASE_URL + product.thumb.url}}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{product.productName}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.moneyType}>Bs. </Text>
          <Text style={styles.priceValue}>{product.price}</Text>
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

// screen sizing
const {width, height} = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const recipeNumColums = 2;
// item size
const RECIPE_ITEM_HEIGHT = 120;
const RECIPE_ITEM_MARGIN = 12;

const styles = StyleSheet.create({
  card: {
    margin: 7,
    height: RECIPE_ITEM_HEIGHT + 80,
    width:
      (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) /
      recipeNumColums,
  },
  thumb: {
    height: RECIPE_ITEM_HEIGHT,
    width:
      (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) /
      recipeNumColums,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
  },
  priceContainer: {
    display: 'flex',
    flexDirection: 'row',
    // marginBottom: 8,
    // marginLeft: 'auto',
  },
  moneyType: {
    fontSize: 16,
    display: 'flex',
    fontWeight: '500',
    alignSelf: 'flex-end',
  },
  priceValue: {
    fontSize: 18,
    fontWeight: '500',
  },
  description: {
    display: 'flex',
    fontSize: 16,
    fontWeight: '400',
    color: '#787878',
    alignSelf: 'center',
  },
});
