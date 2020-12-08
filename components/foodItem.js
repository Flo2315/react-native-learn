import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'

class FoodItem extends React.Component {
  render() {
    const { food, displayDetailForFood } = this.props
    return (
      <TouchableOpacity
        style={styles.main_container}
        onPress={() => displayDetailForFood(food.id, food.name)}
      >
        <View>
          <Image
            style={styles.image}
            source={{uri: food.image}}
          />
          <View style={styles.price_container}>
            <Text style={styles.price_text}>{food.price} €</Text>
          </View>
        </View>
        <View style={styles.content_container}>
          <Text style={styles.title_text}>{food.name}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    marginBottom: 20,
  },
  image: {
    height: 180,
    margin: 5,
    backgroundColor: 'gray'
  },
  content_container: {
    flex: 1,
    margin: 5
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 14,
    flex: 1,
    flexWrap: 'wrap',
  },
  price_container: {
    flex: 1,
    margin: 5,
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

export default FoodItem