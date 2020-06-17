import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProductsList from './ProductList';
import ProductDetails from './ProductDetails';
import HeaderFavoriteProductsCount from '../../components/HeaderFavoriteProductsCount/HeaderFavoriteProductsCount';
import HeaderSearchProducts from '../../components/HeaderFavoriteProductsCount/HeaderSearchProducts';
// import Example from '../SpotifyExample/Spotify';
import {HeaderStyleInterpolators} from '@react-navigation/stack';
import {StatusBar} from 'react-native';
import Logo from '../Logo/Logo';
const ProductsStack = createStackNavigator();
const ProductsStackScreen = () => (
  <ProductsStack.Navigator>
    <ProductsStack.Screen
      name={'ProductsList'}
      component={ProductsList}
      options={{
        headerRight: () => <HeaderFavoriteProductsCount />,
        headerLeft: () => <HeaderSearchProducts />,
        headerTitle: () => <Logo />,
        headerTitleAlign: 'center',
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
