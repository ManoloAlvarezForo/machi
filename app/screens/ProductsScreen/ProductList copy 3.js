import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {useQuery} from '@apollo/client';

import {PRODUCTS} from '../../graphql/productRequests';
import Product from '../../components/Product/Product';
import {Loading} from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';

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
      <Product
        product={product}
        onPress={() => {
          navigation.navigate('ProductDetails', {
            id: product.id,
          });
        }}
      />
    );
  }

  return (
    <FlatList
      numColumns={2}
      style={styles.productsList}
      contentContainerStyle={styles.productsListContainer}
      data={data.products}
      renderItem={renderProduct}
      keyExtractor={(item) => `${item.id}`}
    />
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
