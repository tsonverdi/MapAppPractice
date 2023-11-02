import { StatusBar } from 'expo-status-bar';
import { Alert, Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import MyContext from './store';
import { useState } from 'react';
import HomeScreen from './screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NewPhotoScreen from './screens/NewPhotoScreen';
import PhotoDetail from './screens/PhotoDetail';
const Stack = createNativeStackNavigator();
export default function App() {
  const [photoList, setPhotoList] = useState([])

  


  return (
    <MyContext.Provider value={{photoList, setPhotoList}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={HomeScreen} options={{title:"Ana Sayfa"}}></Stack.Screen>
          <Stack.Screen name='NewPhoto' component={NewPhotoScreen} options={{title:"Add Photo Maps"}}></Stack.Screen>
          <Stack.Screen name='Details' component={PhotoDetail} options={{title:"Photo Details"}}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>

    </MyContext.Provider>
  );
}

const styles = StyleSheet.create({
 
});
