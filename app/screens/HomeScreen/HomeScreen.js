import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../../components/Home/Home';
import Details from '../../components/Details/Details';

const HomeStack = createStackNavigator();
const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={Home} />
    <HomeStack.Screen
      name="Details"
      component={Details}
      options={({route}) => ({
        title: route.params.name,
      })}
    />
  </HomeStack.Navigator>
);

export default HomeStackScreen;
