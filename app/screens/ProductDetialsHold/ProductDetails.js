import React from 'react';
import {StatusBar} from 'react-native';
import Details from './Details';
import {useQuery} from '@apollo/client';
import {COMMENTS, PRODUCT_BY_ID} from '../../graphql/productRequests';
import {Loading} from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';
export default ({route}) => {
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
    <>
      <StatusBar barStyle="light-content" />
      <Details {...{product}} />
    </>
  );
};
