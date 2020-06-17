import React, {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {onScrollEvent, useValue} from 'react-native-redash';

import HeaderImage from './HeaderImage';
import Content, {defaultTabs} from './Content';
import Header from './Header';
import {useQuery} from '@apollo/client';
import {PRODUCT_BY_ID, COMMENTS} from '../../graphql/productRequests';
import {Loading} from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ({route}) => {
  const scrollView = useRef(null);
  const y = useValue(0);
  const onScroll = onScrollEvent({y});
  const {id} = route.params;
  const {loading: productLoading, error: productError, data} = useQuery(
    PRODUCT_BY_ID,
    {
      variables: {
        id,
      },
      fetchPolicy: 'cache-first',
    },
  );
  const {
    loading: commentsLoading,
    error: commentsError,
    data: commentsData,
  } = useQuery(COMMENTS, {
    variables: {
      productId: id,
    },
    fetchPolicy: 'cache-and-network',
  });

  if (productLoading) {
    return <Loading hasBackground />;
  }

  if (productError) {
    return <Error error={productError} />;
  }

  const {product} = data;

  return (
    <View style={styles.container}>
      <HeaderImage {...{y, product}} />
      <Animated.ScrollView
        ref={scrollView}
        style={StyleSheet.absoluteFill}
        scrollEventThrottle={1}
        {...{onScroll}}>
        <Content {...{y, product}} />
      </Animated.ScrollView>
      <Header {...{y, product}} />
    </View>
  );
};
