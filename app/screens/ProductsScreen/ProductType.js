import React from 'react';
import {View, Text, Image, Dimensions, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Card from '../../components/Card/Card';
// import {Button} from 'react-native-ui-lib';
// import {FavoriteIcon} from '../../components/FavoriteIcon/FavoriteIcon';
import {BASE_URL} from '../../config';
// import CornerLabel from '../../components/CornerLabel/CornerLabel';
const {width} = Dimensions.get('window');

export default function ({type}) {
  const {label, thumb, id} = type;
  const navigation = useNavigation();
  return (
    <Card
      key={id}
      style={{
        marginRight: 3.5,
        marginLeft: 3.5,
        marginTop: 4.5,
        marginBottom: 4.5,
        width: width / 2 - 15,
      }}
      onPress={() => {
        navigation.navigate('FoodProductsList', {
          id,
        });
      }}>
      <Image
        style={{
          height: 130,
          width: width / 2 - 15,
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
        resizeMode="cover"
        source={{uri: BASE_URL + thumb.url}}
      />
      <View style={styles.textView}>
        <Text style={styles.itemTitle}> {label}</Text>
      </View>
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
  textView: {
    position: 'absolute',
    textAlign: 'center',
    bottom: 10,
  },
  image: {
    width: width - 205,
    borderRadius: 10,
  },
  itemTitle: {
    color: 'white',
    fontSize: 22,
    shadowColor: '#000',
    shadowOffset: {width: 0.8, height: 0.8},
    shadowOpacity: 1,
    shadowRadius: 8,
    marginBottom: 5,
    fontWeight: 'bold',
    elevation: 5,
  },
  itemDescription: {
    color: 'white',
    fontSize: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0.8, height: 0.8},
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
  },
});
