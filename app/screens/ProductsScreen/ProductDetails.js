import React from 'react';
import {
  StyleSheet,
  FlatList,
  Text,
  ScrollView,
  TouchableHighlight,
  Dimensions,
  StatusBar,
} from 'react-native';
import {useQuery} from '@apollo/client';

import {COMMENTS, PRODUCT_BY_ID} from '../../graphql/productRequests';
import {Loading} from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';
// import Product from '../../components/Product/Product';
import Carousel from '../../components/Carousel/Carousel';
import Card from '../../components/Card/Card';
import AddComment from '../../components/AddComment/AddComment';
import {dummyData} from './Data';
import {View, Image} from 'react-native-ui-lib';
import stylesDetails from './styles';
import {BASE_URL} from '../../config';
const Details = ({product}) => {
  return (
    <ScrollView style={stylesDetails.container}>
      <View style={stylesDetails.carouselContainer}>
        <View style={stylesDetails.carousel}>
          <TouchableHighlight>
            <View style={stylesDetails.imageContainer}>
              <Image
                style={stylesDetails.image}
                resizeMode="cover"
                source={{uri: BASE_URL + product.thumbs[0].url}}
              />
            </View>
          </TouchableHighlight>
        </View>
      </View>
      <View style={stylesDetails.infoRecipeContainer}>
        <Text style={stylesDetails.infoRecipeName}>{product.productName}</Text>
        <View style={stylesDetails.infoContainer}>
          <Image
            style={{
              height: 50,
              width: 50,
            }}
            source={{uri: BASE_URL + product.client.thumb.url}}
          />
          <Text
            style={{
              marginLeft: 10,
              alignSelf: 'center',
              fontSize: 18,
            }}>
            {product.client.brand}
          </Text>
        </View>

        <View style={stylesDetails.infoContainer}>
          <Text>Tiempo de preparacion15 minutes</Text>
          <Text style={stylesDetails.infoRecipe}>15 minutes </Text>
        </View>

        <View style={stylesDetails.infoContainer}>
          <Text style={stylesDetails.infoDescriptionRecipe}>
            {product.description}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};
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
        <Details product={product} />
        {/* <AddComment productId={product.id} />
        {commentsLoading && <Loading />}
        {commentsError && <Error error={commentsError} />}
        {renderNumberOfComments()} */}
      </>
    );
  }
  const {product} = data;

  return (
    <>
      <StatusBar backgroundColor="#252525" barStyle={'light-content'} />
      <Details product={product} />
    </>
  );
}

const styles = StyleSheet.create({
  commentCard: {
    padding: 16,
    marginVertical: 8,
  },
  title: {
    marginTop: 16,
    marginBottom: 8,
  },
});
