import React from 'react';
import {FlatList, StyleSheet, StatusBar} from 'react-native';
import {useQuery} from '@apollo/client';

import {PRODUCTS} from '../../graphql/productRequests';
import Product from '../../components/Product/Product';
import {Loading} from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';
import {
  Constants,
  Colors,
  View,
  Card,
  Button,
  Text,
  Image,
} from 'react-native-ui-lib';
import {BASE_URL} from '../../config';
import {FavoriteIcon} from '../../components/FavoriteIcon/FavoriteIcon';

export default function ProductsList({navigation}) {
  const {data, loading, error} = useQuery(PRODUCTS, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return <Loading hasBackground />;
  }

  if (error) {
    return <Error error={error} />;
  }

  function renderProduct({item: product}) {
    return (
      // <Product
      //   product={product}
      //   onPress={() => {
      //     navigation.navigate('ProductDetails', {
      //       id: product.id,
      //     });
      //   }}
      // />
      <View column>
        <Card
          key={product.id}
          style={{marginBottom: 15}}
          onPress={() => {
            navigation.navigate('ProductDetails', {
              id: product.id,
            });
          }}>
          <Card.Image
            height={220}
            thumbnailSource={{
              uri: BASE_URL + product.thumb.formats.thumbnail.url,
            }}
            imageSource={{uri: BASE_URL + product.thumb.url}}
          />

          <View padding-10>
            <Text style={{fontWeight: 'bold'}} text40 color={Colors.dark10}>
              {product.productName}
            </Text>
            <View row>
              <Text text90 color={'green'}>
                status
              </Text>
              <Text text90> | 33</Text>
            </View>

            <Text text70 color={Colors.dark10}>
              {product.description}
            </Text>

            <View>
              <Text text90 color={Colors.dark50}>
                {product.likes} 5 Likes
              </Text>
              <View row right>
                <Button style={{marginRight: 10}} text90 link label="Feature" />
                <Button text90 link label="Share" />
              </View>
            </View>
          </View>
          <FavoriteIcon favorite={product.favorite} onPress={async () => {}} />
        </Card>
      </View>
    );
  }

  return (
    <>
      <StatusBar backgroundColor="#545454" barStyle={'light-content'} />
      <FlatList
        column={2}
        style={styles.productsList}
        contentContainerStyle={styles.productsListContainer}
        data={data.products}
        renderItem={renderProduct}
        keyExtractor={(item) => `${item.id}`}
      />
    </>
  );
}

const styles = StyleSheet.create({
  productsList: {
    backgroundColor: '#fafafa',
  },
  productsListContainer: {
    backgroundColor: '#fafafa',
    paddingVertical: 8,
    marginHorizontal: 8,
  },
});
