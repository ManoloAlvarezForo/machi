import React from 'react';
import {
  FlatList,
  StyleSheet,
  StatusBar,
  Dimensions,
  ScrollView,
  View,
  Image,
  Text,
} from 'react-native';
import {useQuery} from '@apollo/client';

import {PRODUCTS, TYPES} from '../../graphql/productRequests';
// import Product from '../../components/Product/Product';
import {Loading} from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';
import {BASE_URL} from '../../config';
import {FavoriteIcon} from '../../components/FavoriteIcon/FavoriteIcon';
import Card from '../../components/Card/Card';
import {dummyData} from './Data';
import Slider from './Slider';
import {Button} from 'react-native-ui-lib';
import LinearGradient from 'react-native-linear-gradient';
import Product from './Product';
import ProductType from './ProductType';
const {width} = Dimensions.get('window');

const Promos = () => {
  const {data, loading, error} = useQuery(PRODUCTS, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return <Loading hasBackground />;
  }

  if (error) {
    return <Error error={error} />;
  }

  const {products} = data;

  return <Slider products={products} title="Promos" />;
};

const Products = () => {
  const {data, loading, error} = useQuery(TYPES, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return <Loading hasBackground />;
  }

  if (error) {
    return <Error error={error} />;
  }

  function renderTypes({item: type}) {
    return <ProductType type={type} />;
  }
  const types = data.types;
  return (
    <FlatList
      ListHeaderComponent={() => (
        <Text
          style={{
            color: '#252525',
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 10,
          }}>
          Categorias
        </Text>
      )}
      numColumns={2}
      style={styles.products}
      contentContainerStyle={styles.products}
      data={types}
      renderItem={renderTypes}
      keyExtractor={(item) => `${item.id}`}
    />
  );
};

const exploreComponents = [
  {
    id: 1,
    title: 'Promo',
    type: 'Promo',
    component: <Promos />,
  },
  {
    id: 2,
    title: 'Productos',
    type: 'Products',
    component: <Products key="products" />,
  },
];

export default function ({navigation}) {
  function renderItem({item}) {
    return item.component;
  }

  return (
    <>
      <StatusBar backgroundColor="#ff2134" barStyle={'light-content'} />
      <FlatList
        style={styles.productsList}
        contentContainerStyle={styles.productsListContainer}
        data={exploreComponents}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.id}`}
      />
    </>
  );
}

const styles = StyleSheet.create({
  productsList: {
    backgroundColor: '#f9f9f9',
  },
  productsListContainer: {
    backgroundColor: '#f9f9f9',
  },
  products: {
    backgroundColor: '#f9f9f9',
    paddingVertical: 8,
    marginHorizontal: 8,
  },
  itemTitle: {
    fontSize: 13,
    fontWeight: '600',
  },
});
