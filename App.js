import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from './components/Home';
import Search from './components/Search';
import Categories from './components/Categories';
import CatDetail from './components/catDetail';
import FoodDetail from './components/foodDetail';


const Tab = createMaterialBottomTabNavigator();
const MyTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#f0edf6"
      inactiveColor="#34495e"
      barStyle={{ backgroundColor: '#3498db' }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigation}
        options={{
          tabBarLabel: 'Accueil',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchNavigation}
        options={{
          tabBarLabel: 'Rechercher',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="search-web" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoriesNavigation}
        options={{
          tabBarLabel: 'Catégories',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="book" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();
const HomeNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} options={{ title: 'Accueil' }} />
    </Stack.Navigator>
  );
}
const SearchNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Search">
      <Stack.Screen name="Search" component={Search} options={{ title: 'Recherche' }} />
      <Stack.Screen name="FoodDetail" component={FoodDetail} options={({ route }) => ({ title: route.params.name })} />
    </Stack.Navigator>
  );
}
const CategoriesNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Categories">
      <Stack.Screen name="Categories" component={Categories} options={{ title: 'Catégories' }} />
      <Stack.Screen name="CatDetail" component={CatDetail} options={({ route }) => ({ title: route.params.name })} />
      <Stack.Screen name="FoodDetail" component={FoodDetail} options={({ route }) => ({ title: route.params.name })} />
    </Stack.Navigator>
  );
}

const App = () => {
  const client = new ApolloClient({
    uri: 'https://graphql-apollo-server-1.herokuapp.com/graphql',
    cache: new InMemoryCache()
  });

  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider>
        <NavigationContainer>
          <MyTabs />
        </NavigationContainer>
      </SafeAreaProvider>
    </ApolloProvider>
  );
}

export default App