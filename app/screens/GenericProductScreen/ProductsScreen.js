import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProductsList from './ProductList';
import ProductDetails from './ProductDetails';
import HeaderFavoriteProductsCount from '../../components/HeaderFavoriteProductsCount/HeaderFavoriteProductsCount';
import HeaderSearchProducts from '../../components/HeaderFavoriteProductsCount/HeaderSearchProducts';
// import Example from '../SpotifyExample/Spotify';
import {HeaderStyleInterpolators} from '@react-navigation/stack';
import {StatusBar, View} from 'react-native';
import Logo from '../Logo/Logo';
const ProductsStack = createStackNavigator();
const ProductsStackScreen = () => (
  <ProductsStack.Navigator mode="modal">
    <ProductsStack.Screen
      name={'ProductsList'}
      component={ProductsList}
      options={{
        headerRight: () => (
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <HeaderSearchProducts />
            <HeaderFavoriteProductsCount />
          </View>
        ),
        headerTitle: () => <Logo />,
        headerTitleAlign: 'center',
        headerStyle: {backgroundColor: '#ff2134'},
      }}
    />
    <ProductsStack.Screen
      name={'FoodProductsList'}
      component={ProductsList}
      options={{
        headerRight: () => (
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <HeaderSearchProducts />
            <HeaderFavoriteProductsCount />
          </View>
        ),
        headerBackTitle: 'Productos',
        //TODO: Change title when the scren is monunted.
        headerTitle: 'Comida',
        headerTitleAlign: 'center',
        headerTintColor: '#ffffff',
        headerStyle: {backgroundColor: '#ff2134'},
      }}
    />
    <ProductsStack.Screen
      name={'ProductDetails'}
      options={{
        headerTransparent: 'true',
        headerTitleAlign: 'center',
        headerTitle: 'Detalle',
        headerBackTitle: 'Productos',
        headerTintColor: '#ffffff',
        headerStyle: {backgroundColor: '#000000'},
      }}
      component={ProductDetails}
    />
  </ProductsStack.Navigator>
);

export default ProductsStackScreen;
