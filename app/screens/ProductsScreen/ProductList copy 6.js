import React from 'react';
import {
  FlatList,
  StyleSheet,
  StatusBar,
  Dimensions,
  ScrollView,
} from 'react-native';
import {useQuery} from '@apollo/client';

import {PRODUCTS} from '../../graphql/productRequests';
// import Product from '../../components/Product/Product';
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
import Carousel from './Carousel';
import {dummyData} from './Data';
import Slider from './Slider';
const {width} = Dimensions.get('window');

const Products = ({navigation}) => {
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
          <Card.Image
            height={120}
            cover
            thumbnailSource={{
              uri: BASE_URL + product.thumb.formats.thumbnail.url,
            }}
            imageSource={{uri: BASE_URL + product.thumb.url}}
          />

          <View
            style={{
              // paddingTop: 14,
              // paddingHorizontal: 7,
              // paddingBottom: 3,
              flex: 1,
              flexDirection: 'column',
            }}>
            <Text style={{fontSize: 14}} color={Colors.dark10}>
              {product.productName}
            </Text>
            <Text style={{fontWeight: 'bold', fontSize: 13}}>
              Bs. {product.price}
            </Text>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Text
                style={{
                  flex: 1,
                  alignSelf: 'center',
                  color: 'gray',
                  fontSize: 11,
                }}>
                {brand}
              </Text>
              <Button
                style={{marginLeft: 'auto'}}
                text90
                round={false}
                color="#252525"
                label="Pedir"
                link
                labelStyle={{fontWeight: 'bold'}}
                onPress={() => alert(`Pedir: ${product.productName}`)}
              />
            </View>
          </View>
          <FavoriteIcon
            favorite={product.favorite}
            onPress={() => alert(`${product.productName} Agregado a favoritos`)}
          />
        </Card>
      </View>
    );
  }
  const products = data.products;
  return (
    <FlatList
      ListHeaderComponent={() => (
        <Text style={{color: '#252525', fontSize: 16}}>Ofertas</Text>
      )}
      numColumns={2}
      style={styles.productsList}
      contentContainerStyle={styles.productsListContainer}
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
    component: <Slider images={dummyData} />,
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
    paddingVertical: 8,
    marginHorizontal: 8,
  },
});
