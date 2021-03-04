/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  FlatList,
  StyleSheet,
  StatusBar,
  Dimensions,
  ScrollView,
  View,
  Image,
  Text,
} from 'react-native';
import {useQuery} from '@apollo/client';

import {PRODUCTS, CATEGORIES} from '../../graphql/productRequests';
// import Product from '../../components/Product/Product';
import {Loading} from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';
import {BASE_URL} from '../../config';
import {FavoriteIcon} from '../../components/FavoriteIcon/FavoriteIcon';
import Card from '../../components/Card/Card';
import {dummyData} from './Data';
import Slider from './Slider';
import {Button} from 'react-native-ui-lib';
import LinearGradient from 'react-native-linear-gradient';
import Product from './Product';
import ProductCategory from './ProductCategory';
import {useRoute, useNavigation} from '@react-navigation/native';
const {width} = Dimensions.get('window');

//TODO We need to implement logic to re render this component according the category product selected.
const Promos = ({id = null, type}) => {
  const {data, loading, error} = useQuery(PRODUCTS, {
    fetchPolicy: 'cache-and-network',
  });

  const promoProducts = () => {
    if (loading) {
      return <Loading hasBackground />;
    }

    if (error) {
      return <Error error={error} />;
    }

    return (
      <>
        {data.products.length ? (
          data.products.map((product) => (
            <Product key={product.id} product={product} />
          ))
        ) : (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: width,
            }}>
            <Text style={{color: 'gray'}}>No existen promos...</Text>
          </View>
        )}
      </>
    );
  };

  return (
    <Slider itemRender={Product} renderItems={promoProducts} title="Promos" />
  );
};

const CategoryProduct = ({id, type}) => {
  const {data, loading, error} = useQuery(PRODUCTS, {
    variables: {
      parent: id,
    },
    fetchPolicy: 'cache-and-network',
  });

  const products = () => {
    if (loading) {
      return <Loading hasBackground />;
    }

    if (error) {
      return <Error error={error} />;
    }

    return (
      <>
        {data.products.length ? (
          data.products.map((product) => (
            <Product key={product.id} product={product} />
          ))
        ) : (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: width,
            }}>
            <Text style={{color: 'gray'}}>No existen items</Text>
          </View>
        )}
      </>
    );
  };

  return <Slider itemRender={Product} renderItems={products} title={type} />;
};

// const SliderItems = () => {
//   const {data, loading, error} = useQuery(PRODUCTS, {
//     fetchPolicy: 'cache-and-network',
//   });

//   if (error) {
//     return <Error error={error} />;
//   }

//   const {products} = data;
//   const promoProducts = (productsParam) => {
//     return (
//       <>
//         {productsParam.map((product) => (
//           <Product key={product.id} product={product} />
//         ))}
//       </>
//     );
//   };

//   return (
//     <Slider
//       renderItems={() => promoProducts(products)}
//       title="Promos"
//       loading={loading}
//     />
//   );
// };
const buildRenderCategoryTwo = (item) => {
  return <ProductCategory type={item} />;
};

const buildRenderCategory = (items) => {
  return (
    <>
      {items.map((item) => (
        <CategoryProduct type={item.name} id={item.id} />
      ))}
    </>
  );
};

// const buildRenderProducts = (id, type) => {
//   return <CategoryProduct id={id} type={type} />;
// };

// const CategoryProds = ({id, type}) => {
//   const {data, loading, error} = useQuery(PRODUCTS, {
//     variables: {
//       parent: id,
//     },
//     fetchPolicy: 'cache-and-network',
//   });
// };

const CategoryProductsComponent = ({id, type}) => {
  // TODO: id is used to get Graphql data.
  const {data, loading, error} = useQuery(CATEGORIES, {
    variables: {parent: id},
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return <Loading hasBackground />;
  }

  if (error) {
    return <Error error={error} />;
  }

  const {categories} = data;

  // function renderItems({item}) {
  //   if (categories || categories.length) {
  //     return buildRenderCategory(item);
  //   } else {
  //     return buildRenderProducts(id, type);
  //   }
  // }

  return (
    <>
      {categories.length ? (
        <RenderItems items={categories} />
      ) : (
        <Products id={id} title={type} />
      )}
    </>
  );
};

const RenderItems = ({title, items}) => {
  return (
    <>
      {items.map((item) => (
        <CategoryProduct type={item.name} id={item.id} />
      ))}
    </>
  );
};

const Products = ({id, title}) => {
  // TODO: id is used to get Graphql data.
  const {data, loading, error} = useQuery(PRODUCTS, {
    variables: {
      parent: id,
    },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return <Loading hasBackground />;
  }

  if (error) {
    return <Error error={error} />;
  }

  function renderCategories({item}) {
    return buildRenderCategory(item);
  }

  const {categories} = data;

  return (
    <FlatList
      ListHeaderComponent={() => (
        <Text
          style={{
            color: '#252525',
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 10,
          }}>
          {title}
        </Text>
      )}
      numColumns={2}
      style={styles.products}
      contentContainerStyle={styles.products}
      data={categories}
      renderItem={renderCategories}
      keyExtractor={(item) => `${item.id}`}
    />
  );
};

/**
 * Main Category component.
 *
 * @param {String} id That represents the category id.
 * @param {String} type That represents the category type.
 * @param {String} title That represents the slide title.
 */
const MainCategories = ({id, type, title}) => {
  // TODO: id is used to get Graphql data.
  const {data, loading, error} = useQuery(CATEGORIES, {
    variables: {
      parent: id,
    },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return <Loading hasBackground />;
  }

  if (error) {
    return <Error error={error} />;
  }

  function renderCategories({item}) {
    return buildRenderCategoryTwo(item);
  }

  const categories = data.categories;

  return (
    <FlatList
      ListHeaderComponent={() => (
        <Text
          style={{
            color: '#252525',
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 10,
          }}>
          {title}
        </Text>
      )}
      numColumns={2}
      style={styles.products}
      contentContainerStyle={styles.products}
      data={categories}
      renderItem={renderCategories}
      keyExtractor={(item) => `${item.id}`}
    />
  );
};

const getMainExploreComponents = () => {
  const exploreComponents = [
    {
      id: 1,
      title: 'Promo',
      type: 'Promo',
      component: <Promos />,
    },
    {
      id: 2,
      title: 'Productos',
      type: 'Products',
      component: <MainCategories key="products" title="Categorias" />,
    },
  ];
  return exploreComponents;
};

const buildProductList = (id, type) => {
  const newExploreComponents = [
    {
      id: 1,
      title: 'Promo',
      type: 'Promo',
      component: <Promos id={id} type={type} />,
    },
    {
      id: 2,
      title: 'Productos',
      type: 'Products',
      component: (
        <CategoryProductsComponent key="products" id={id} type={type} />
      ),
    },
  ];
  return newExploreComponents;
};

export default function ProductsList() {
  const route = useRoute();
  const navigation = useNavigation();
  let id;
  let category;

  if (route.params) {
    const {params} = route;
    id = params.id;
    category = params.category;
    navigation.setOptions({headerTitle: category});
  }

  function renderItem({item}) {
    return item.component;
  }

  const buildProductListComponents = () => {
    if (id) {
      return buildProductList(id, category);
    }

    return getMainExploreComponents();
  };

  return (
    <>
      <StatusBar backgroundColor="#ff2134" barStyle={'light-content'} />
      <FlatList
        style={styles.productsList}
        contentContainerStyle={styles.productsListContainer}
        data={buildProductListComponents()}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.id}`}
      />
    </>
  );
}

const styles = StyleSheet.create({
  productsList: {
    backgroundColor: '#f9f9f9',
  },
  productsListContainer: {
    backgroundColor: '#f9f9f9',
  },
  products: {
    backgroundColor: '#f9f9f9',
    paddingVertical: 8,
    marginHorizontal: 8,
  },
  itemTitle: {
    fontSize: 13,
    fontWeight: '600',
  },
});
