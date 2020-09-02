import React from 'react';
import {View, Text, Image, Dimensions, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Card from '../../components/Card/Card';
import {Button} from 'react-native-ui-lib';
import {FavoriteIcon} from '../../components/FavoriteIcon/FavoriteIcon';
import {BASE_URL} from '../../config';
import CornerLabel from '../../components/CornerLabel/CornerLabel';
const {width} = Dimensions.get('window');

export default function ({product}) {
  const navigation = useNavigation();

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
        style={{
          height: 120,
          width: width / 2 - 15,
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
        }}
        resizeMode="cover"
        source={{uri: BASE_URL + product.thumbs[0].url}}
      />
      <View
        style={{
          paddingTop: 3,
          marginLeft: 5,
          marginRight: 7,
          flex: 1,
          flexDirection: 'column',
        }}>
        <Text style={styles.itemTitle}>{product.name}</Text>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          {product.promo && (
            <View
              style={{borderRadius: 2, display: 'flex', alignSelf: 'center'}}>
              <Text
                style={{
                  borderRadius: 2,
                  backgroundColor: 'red',
                  color: '#fff',
                  marginRight: 4,
                  fontSize: 9,
                  fontWeight: 'bold',
                  paddingHorizontal: 2,
                }}>
                Promo
              </Text>
            </View>
          )}
          <Text
            style={{
              fontWeight: product.promo === true ? '300' : 'bold',
              fontSize: 11,
              textDecorationLine:
                product.promo === true ? 'line-through' : 'none',
            }}>
            Bs. {product.price}
          </Text>
          {product.promo === true && (
            <Text style={{fontWeight: 'bold', fontSize: 11, marginLeft: 3}}>
              Bs. {product.promoPrice}
            </Text>
          )}
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{
                height: 15,
                width: 15,
              }}
              resizeMode="cover"
              source={{uri: BASE_URL + product.client.thumb.url}}
            />
            <Text
              style={{
                flex: 1,
                marginLeft: 3,
                alignSelf: 'center',
                color: 'gray',
                fontSize: 11,
              }}>
              {brand}
            </Text>
          </View>
          <Button
            style={{marginLeft: 'auto'}}
            text90
            round={false}
            color="#252525"
            label="Pedir"
            link
            labelStyle={{fontWeight: 'bold'}}
            onPress={() => alert(`Pedir: ${product.name}`)}
          />
        </View>
      </View>
      <FavoriteIcon
        favorite={product.favorite}
        onPress={() => alert(`${product.productName} Agregado a favoritos`)}
      />
    </Card>
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
