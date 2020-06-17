import React from 'react';
import {StyleSheet, FlatList, Text} from 'react-native';
import {useQuery} from '@apollo/client';

import {COMMENTS, PRODUCT_BY_ID} from '../../graphql/productRequests';
import {Loading} from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';
import Product from '../../components/Product/Product';
import Card from '../../components/Card/Card';
import AddComment from '../../components/AddComment/AddComment';

export default function ProductDetails({route}) {
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

  function renderComment({item: comment}) {
    return (
      <Card id={comment.id} style={styles.commentCard}>
        <Text style={{fontWeight: 'bold'}}>{comment.user}</Text>
        <Text>{comment.comment}</Text>
      </Card>
    );
  }

  function renderNumberOfComments() {
    return (
      <Text style={styles.title}>
        {commentsData && commentsData.comments.length > 0
          ? `Comments [${commentsData.comments.length}]`
          : 'No comments found'}
      </Text>
    );
  }

  function renderHeader() {
    const {product} = data;
    return (
      <>
        <Product product={product} />
        <AddComment productId={product.id} />
        {commentsLoading && <Loading />}
        {commentsError && <Error error={commentsError} />}
        {renderNumberOfComments()}
      </>
    );
  }

  return (
    <FlatList
      data={commentsData ? commentsData.comments : []}
      renderItem={renderComment}
      ListHeaderComponent={renderHeader()}
      contentContainerStyle={styles.commentsContainer}
    />
  );
}

const styles = StyleSheet.create({
  commentsContainer: {
    padding: 8,
  },
  commentCard: {
    padding: 16,
    marginVertical: 8,
  },
  title: {
    marginTop: 16,
    marginBottom: 8,
  },
});
