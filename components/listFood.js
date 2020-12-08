import React from 'react'
import { FlatList, View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import FoodItem from './foodItem'

const ListFood = ({ products }) =>  {
  const navigation = useNavigation()
  const _displayDetailForFood = (idFood, nameRoute) => navigation.navigate("FoodDetail", { idFood: idFood, name: nameRoute })
  const _listEmpty = () => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>☝️ Faire une recherche ☝️</Text>
    </View>
  );
  return (
    <FlatList
      contentContainerStyle={{ flexGrow: 1 }}
      data={products}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      renderItem={({item}) => <FoodItem food={item} displayDetailForFood={_displayDetailForFood} />}
      onEndReachedThreshold={0.5}
      onEndReached={() => {
        console.log("onEndReached")
      }}
      ListEmptyComponent={() => _listEmpty()}
    />
  )
}

export default ListFood
