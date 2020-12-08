import React from 'react'
import { StyleSheet, View, Text, Image, ActivityIndicator, Dimensions } from 'react-native'
import { useQuery, gql } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';

import FoodItem from './foodItem'

const { width: viewportWidth } = Dimensions.get('window');

function wp (percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);
const sliderWidth = viewportWidth;
const itemWidth = slideWidth + itemHorizontalMargin * 2;

const PRODUCT_QUERY = gql`
  query getProduct($id: ID!) {
    product(id: $id) {
      id
      name
      description
      image
      price
      category {
        id
        name
      }
    }
  }
`;

const PRODUCTS_QUERY = gql`
  query getProducts($filter: FilterProduct) {
    products(filter: $filter) {
      id
      name
      image
      price
    }
  }
`;

const OtherList = ({ categoryId, categoryName, productIdSelected }) =>  {
  const navigation = useNavigation()

  const { loading, error, data } = useQuery(PRODUCTS_QUERY, {
    variables: { filter: { categoryId: categoryId } },
  })

  const _displayDetailForFood = (idFood, nameRoute) => navigation.navigate("FoodDetail", { idFood: idFood, name: nameRoute })

  if (loading) {
    return (
      <View style={styles.loading_container}>
        <ActivityIndicator size='large' />
      </View>
    )
  }

  return (
    <View style={[styles.main_container, { marginTop: 30 }]}>
      <Text style={styles.other_title}>Autres {categoryName.toLowerCase()}</Text>
      <Carousel
        data={data.products.filter(product => product.id !== productIdSelected)}
        renderItem={({item}) => <FoodItem food={item} displayDetailForFood={_displayDetailForFood} />}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
      />
    </View>
  )
}

const FoodDetail = ({ route }) => {
  const { loading, error, data } = useQuery(PRODUCT_QUERY, {
    variables: { id: route.params.idFood },
  })

  if (loading) {
    return (
      <View style={styles.loading_container}>
        <ActivityIndicator size='large' />
      </View>
    )
  }

  return (
    <View style={styles.main_container}>
      <View>
        <Image
          style={styles.image}
          source={{uri: data.product.image}}
        />
        <View style={styles.price_container}>
          <Text style={styles.price_text}>{data.product.price} €</Text>
        </View>
      </View>
      <View style={{ marginLeft: 5, marginRight: 5 }}>
        <Text style={styles.title_text}>{data.product.name}</Text>
        {data.product.description && <Text style={styles.description_text}>{data.product.description}</Text>}
      </View>
      <OtherList categoryId={data.product.category.id} categoryName={data.product.category.name} productIdSelected={data.product.id} />
    </View>
  )
}

const styles = StyleSheet.create({
  loading_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  main_container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    height: 180,
    backgroundColor: 'gray'
  },
  other_title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 14,
    flexWrap: 'wrap',
    textAlign: 'center',
    marginTop: 10
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
    textAlign: 'center',
    marginTop: 5
  },
  price_container: {
    flex: 1,
    padding: 10,
    bottom: 0,
    right: 0,
    position: 'absolute',
    backgroundColor: 'rgba(52, 52, 52, 0.8)'
  },
  price_text: {
    fontWeight: 'bold',
    textAlign: 'right',
    fontSize: 14,
    color: '#fff'
  }
})

export default FoodDetail