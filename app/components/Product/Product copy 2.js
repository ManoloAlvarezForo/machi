/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, StyleSheet, Text, View, Dimensions} from 'react-native';
// import {useMutation} from '@apollo/client';

import {BASE_URL} from '../../config';
import {FavoriteIcon} from '../FavoriteIcon/FavoriteIcon';
import Card from '../Card/Card';
// import {ADD_OR_REMOVE_PRODUCT_FROM_FAVORITE} from '../graphql/requests';
// screen sizing
const {width, height} = Dimensions.get('window');
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

// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const recipeNumColums = 2;
// item size
const RECIPE_ITEM_HEIGHT = 150;
const RECIPE_ITEM_MARGIN = 20;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: RECIPE_ITEM_MARGIN,
    marginTop: 20,
    width:
      (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) /
      recipeNumColums,
    height: RECIPE_ITEM_HEIGHT + 75,
    borderColor: '#cccccc',
    borderRadius: 15,
  },
  thumb: {
    width:
      (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) /
      recipeNumColums,
    height: RECIPE_ITEM_HEIGHT,
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
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
