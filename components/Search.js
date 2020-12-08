import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, ActivityIndicator } from 'react-native'
import { useLazyQuery, gql } from '@apollo/client';
import ListFood from './listFood'

const PRODUCTS_QUERY = gql`
  query getProducts($filter: FilterProduct) {
    products(filter: $filter) {
      id
      name
      image
      description
      price
    }
  }
`;

const SearchInput = ({callbackText}) => {
  return (
    <TextInput
      style={styles.textinput}
      placeholder='Pizza'
      onChangeText={(text) => callbackText(text)}
    />
  )
}

const Search = () => {
  const [getProducts, { loading, data }] = useLazyQuery(PRODUCTS_QUERY)
  const [textSearch, setTextSearch] = useState('')
  const _callbackText = (text) => setTextSearch(text)

  return (
    <View style={styles.main_container}>
      <View style={{marginBottom: 15}}>
        <SearchInput callbackText={_callbackText} />
        <Button
          title='Rechercher'
          onPress={() => getProducts({ variables: { filter: { name: textSearch }} })}
        />
      </View>
      {loading ?
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View> :
        <ListFood products={data?.products} />
      }
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
    backgroundColor: '#fff'
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5
  }
})

export default Search