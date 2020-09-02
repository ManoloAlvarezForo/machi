/* eslint-disable react-native/no-inline-styles */
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

//TODO We need to implement logic to re render this component according the category product selected.
const Promos = ({id, type}) => {
  const {data, loading, error} = useQuery(PRODUCTS, {
    fetchPolicy: 'cache-and-network',
  });

  const promoProducts = () => {
    if (loading) {
      return <Loading hasBackground />;
    }

    if (error) {
      return <Error error={error} />;
    }

    return (
      <>
        {data.products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </>
    );
  };

  return (
    <Slider itemRender={Product} renderItems={promoProducts} title="Promos" />
  );
};

const SliderItems = () => {
  const {data, loading, error} = useQuery(PRODUCTS, {
    fetchPolicy: 'cache-and-network',
  });

  if (error) {
    return <Error error={error} />;
  }

  const {products} = data;
  const promoProducts = (productsParam) => {
    return (
      <>
        {productsParam.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </>
    );
  };

  return (
    <Slider
      renderItems={() => promoProducts(products)}
      title="Promos"
      loading={loading}
    />
  );
};

const buildRenderType = (type, item) => {
  if (type === 'category') {
    return <ProductType type={item} />;
  }
};

const Products = (id, type) => {
  // TODO: id is used to get Graphql data.
  const {data, loading, error} = useQuery(TYPES, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return <Loading hasBackground />;
  }

  if (error) {
    return <Error error={error} />;
  }

  function renderTypes({item}) {
    return buildRenderType(type, item);
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

const getMainExploreComponents = () => {
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
  return exploreComponents;
};

const buildProductList = (id, type) => {
  const newExploreComponents = [
    {
      id: 1,
      title: 'Promo',
      type: 'Promo',
      component: <Promos id={id} type={type} />,
    },
    {
      id: 2,
      title: 'Productos',
      type: 'Products',
      component: <Products key="products" id={id} type={type} />,
    },
  ];
  return newExploreComponents;
};

export default function ProductsList({route}) {
  const {
    params: {id = '', type = ''},
  } = route;

  function renderItem({item}) {
    return item.component;
  }

  const buildProductListComponents = () => {
    if (id) {
      return buildProductList(id, type);
    }

    return getMainExploreComponents();
  };

  return (
    <>
      <StatusBar backgroundColor="#ff2134" barStyle={'light-content'} />
      <FlatList
        style={styles.productsList}
        contentContainerStyle={styles.productsListContainer}
        data={buildProductListComponents}
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
