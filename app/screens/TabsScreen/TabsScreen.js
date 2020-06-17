import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStackScreen from '../HomeScreen/HomeScreen';
import SearchStackScreen from '../SearchScreen/SearchScreen';

const Tabs = createBottomTabNavigator();
const TabsScreen = () => (
  <Tabs.Navigator>
    <Tabs.Screen name="Home" component={HomeStackScreen} />
    <Tabs.Screen name="Search" component={SearchStackScreen} />
  </Tabs.Navigator>
);

export default TabsScreen;
