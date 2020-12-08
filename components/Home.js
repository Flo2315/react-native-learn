import React from 'react';
import { StyleSheet, Button, View, Text, Linking } from 'react-native'

const Home = () => {
  return (
    <View style={styles.main_container}>
      <Text style={{fontSize:18}}>Apprendre React Native 📖</Text>
      <Button title="mon github" onPress={() => Linking.openURL('https://github.com/Flo2315')}></Button>
    </View>
  )
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Home