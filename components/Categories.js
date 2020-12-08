import React from "react";
import { FlatList, SafeAreaView, View, ActivityIndicator, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useQuery, gql } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';

const CATEGORIES_QUERY = gql`
  query getCategories {
    categories {
      id
      name
    }
  }
`;

const Item = ({ item, displayDetailForCat, style }) => (
  <TouchableOpacity
    onPress={() => displayDetailForCat(item.id, item.name)}
    style={[styles.item, style]}
  >
    <Text style={styles.title}>{item.name}</Text>
  </TouchableOpacity>
);

const Categories = () => {
  const navigation = useNavigation()
  const _displayDetailForCat = (idCat, nameRoute) => navigation.navigate("CatDetail", { idCat: idCat, name: nameRoute })
	const { loading, data } = useQuery(CATEGORIES_QUERY)

	if (loading) {
    return (
      <View style={styles.loading_container}>
        <ActivityIndicator size='large' />
      </View>
    )
  }

  const renderSeparator = () => {
    return <View style={{height: 1, width: "100%", backgroundColor: "#CED0CE"}} />
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ItemSeparatorComponent={renderSeparator}
        data={data.categories}
        renderItem={({item}) => <Item item={item} displayDetailForCat={_displayDetailForCat} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
	loading_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff'
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  item: {
    padding: 5,
  },
  title: {
    fontSize: 32,
	},
	separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});

export default Categories