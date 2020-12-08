import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { useQuery, gql } from '@apollo/client'
import ListFood from './listFood'

const CATEGORY_QUERY = gql`
  query getCategory($id: ID!) {
    category(id: $id) {
      id
      name
      products {
        id
        name
        description
        image
        price
      }
    }
  }
`;

const CatDetail = ({route}) => {
  const { loading, error, data } = useQuery(CATEGORY_QUERY, {
    variables: { id: route.params.idCat },
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
      <ListFood products={data.category.products} />
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
    backgroundColor: '#ffffff'
  },
  image: {
    height: 180,
    margin: 5,
    backgroundColor: 'gray'
  },
})

export default CatDetail