import React from 'react';
import {Text, Button} from 'react-native';

const Home = ({navigation}) => (
  <>
    <Text>Master List Screen</Text>
    <Button
      title="React Native by Example"
      onPress={() =>
        navigation.push('Details', {name: 'React Native by Example '})
      }
    />
    <Button
      title="React Native School"
      onPress={() => navigation.push('Details', {name: 'React Native School'})}
    />
    <Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
  </>
);

export default Home;
