import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ProductsListScreen} from '../screens/ProductsScreen';

const MainStack = createStackNavigator();

export function MainStackNavigator() {
  return (
    <MainStack.Navigator headerMode="screen">
      <MainStack.Screen
        name={'ProductsList'}
        component={ProductsListScreen}
        options={{
          title: 'Products List',
        }}
      />
    </MainStack.Navigator>
  );
}
