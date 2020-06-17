import React from 'react';
import {View, StyleSheet, Text, Image, Dimensions} from 'react-native';
import CornerLabel from '../../components/CornerLabel/CornerLabel';

const {width} = Dimensions.get('window');

const CarouselItem = ({item}) => {
  return (
    <View style={styles.cardView}>
      <Image style={styles.image} source={{uri: item.url}} />
      <CornerLabel
        text="Oferta"
        cornerRadius={54}
        style={{backgroundColor: '#ff2134', height: 18}}
        textStyle={{fontSize: 11, fontWeight: 'bold', color: '#fff'}}
      />
      <View style={styles.textView}>
        <Text style={styles.itemTitle}> {item.title}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardView: {
    flex: 1,
    width: width - 205,
    height: 150,
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
    overflow: 'hidden',
  },

  textView: {
    position: 'absolute',
    bottom: 10,
    margin: 10,
    left: 5,
  },
  image: {
    width: width - 205,
    height: 150,
    borderRadius: 10,
  },
  itemTitle: {
    color: 'white',
    fontSize: 22,
    shadowColor: '#000',
    shadowOffset: {width: 0.8, height: 0.8},
    shadowOpacity: 1,
    shadowRadius: 3,
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

export default CarouselItem;
