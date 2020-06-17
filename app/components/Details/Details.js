import React from 'react';
import {Text} from 'react-native';

const Details = ({route}) => (
  <>
    <Text>Details Screen</Text>
    {route.params.name && <Text>{route.params.name}</Text>}
  </>
);
export default Details;
