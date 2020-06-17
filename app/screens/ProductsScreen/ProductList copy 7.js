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

import {PRODUCTS} from '../../graphql/productRequests';
// import Product from '../../components/Product/Product';
import {Loading} from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';
import {BASE_URL} from '../../config';
import {FavoriteIcon} from '../../components/FavoriteIcon/FavoriteIcon';
import Card from '../../components/Card/Card';
import {dummyData} from './Data';
import Slider from './Slider';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native-ui-lib';
const {width} = Dimensions.get('window');

const Products = () => {
  const navigation = useNavigation();
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
    let brand = '';
    if (product.client) {
      brand = product.client.brand;
    }
    return (
      <Card
        key={product.id}
        style={{
          marginRight: 3.5,
          marginLeft: 3.5,
          marginTop: 4.5,
          marginBottom: 4.5,
          width: width / 2 - 15,
          height: 180,
        }}
        onPress={() => {
          navigation.navigate('ProductDetails', {
            id: product.id,
          });
        }}>
        <Image
          style={{width: width / 2 - 15, height: 120}}
          source={{uri: BASE_URL + product.thumb.url}}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{product.productName}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.moneyType}>Bs. </Text>
            <Text style={styles.priceValue}>{product.price}</Text>
          </View>
        </View>
        <FavoriteIcon favorite={product.favorite} onPress={() => {}} />
      </Card>
    );
  }
  const products = data.products;
  return (
    <FlatList
      ListHeaderComponent={() => (
        <Text
          style={{
            color: '#252525',
            fontSize: 22,
            fontWeight: 'bold',
            marginBottom: 10,
          }}>
          Categorias
        </Text>
      )}
      numColumns={2}
      style={styles.products}
      contentContainerStyle={styles.products}
      data={products}
      renderItem={renderProduct}
      keyExtractor={(item) => `${item.id}`}
    />
  );
};

const exploreComponents = [
  {
    id: 1,
    title: 'Ofertas',
    type: 'Oferta',
    component: <Slider images={dummyData} title="Ofertas" />,
  },
  {
    id: 2,
    title: 'Productos',
    type: 'Products',
    component: <Products key="products" />,
  },
];

export default function ProductsList({navigation}) {
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
    backgroundColor: '#fff',
  },
  productsListContainer: {
    backgroundColor: '#fff',
  },
  products: {
    backgroundColor: '#fff',

    paddingVertical: 8,
    marginHorizontal: 8,
  },
});
