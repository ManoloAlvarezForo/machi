import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';

import ProductScreen from '../ProductsScreen';
import TabsScreen from '../TabsScreen';
const Drawer = createDrawerNavigator();
const DrawerScreen = () => (
  <Drawer.Navigator initialRouteName="Products">
    <Drawer.Screen name="Home" component={TabsScreen} />
    <Drawer.Screen name="Products" component={ProductScreen} />
  </Drawer.Navigator>
);

export default DrawerScreen;
