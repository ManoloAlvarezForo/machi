import * as React from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import Animated from 'react-native-reanimated';
import Content from './Content';
import Cover from './Image';
import IconButton from '../../components/IconButton/IconButton';
import {STATUS_BAR_HEIGHT} from './Model';
import {useNavigation} from '@react-navigation/native';
const {Value} = Animated;
const iconName = Platform.OS === 'android' ? 'arrow-round-back' : 'arrow-back';

export default ({product}) => {
  const navigation = useNavigation();
  const y = new Value(0);
  return (
    <View style={styles.container}>
      <IconButton
        color="#fff"
        style={styles.backIcon}
        name={iconName}
        onPress={() => {
          navigation.pop();
        }}
      />

      <Cover {...{y, product}} />
      <Content {...{y, product}} />
    </View>
  );
};

const styles = StyleSheet.create({
  backIcon: {
    fontWeight: 'bold',
    position: 'absolute',
    top: STATUS_BAR_HEIGHT,
    left: 10,
    elevation: 3,
    zIndex: 3,
    backgroundColor: 'black',
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
