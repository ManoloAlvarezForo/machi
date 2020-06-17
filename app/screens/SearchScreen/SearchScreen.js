import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {Text, Button} from 'react-native';

const SearchStack = createStackNavigator();

export const Search = ({navigation}) => (
  <>
    <Text>Search Screen</Text>
    <Button title="Search 2" onPress={() => navigation.push('Search2')} />
    <Button
      title="React Native School"
      onPress={() => {
        navigation.navigate('Home', {
          screen: 'Details',
          params: {name: 'React Native School'},
        });
      }}
    />
  </>
);

export const Search2 = () => <Text>Search2 Screen</Text>;

const SearchStackScreen = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen name="Search" component={Search} />
    <SearchStack.Screen name="Search2" component={Search2} />
  </SearchStack.Navigator>
);

export default SearchStackScreen;
