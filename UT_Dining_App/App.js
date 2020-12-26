import { StatusBar } from 'expo-status-bar';
import React from 'react';
import axios from 'axios';
import FrontPage from './screens/FrontPage/index';
import Auth from './screens/Auth/AuthStackNav';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import {
  useFonts,
  BigShouldersDisplay_100Thin,
  BigShouldersDisplay_300Light,
  BigShouldersDisplay_400Regular,
  BigShouldersDisplay_500Medium,
  BigShouldersDisplay_600SemiBold,
  BigShouldersDisplay_700Bold,
  BigShouldersDisplay_800ExtraBold,
  BigShouldersDisplay_900Black} from '@expo-google-fonts/big-shoulders-display';
import { AppLoading } from 'expo';
import { createStackNavigator } from '@react-navigation/stack';
import CalendarScreen from './screens/CalendarScreen/index';
// import { Calendar } from 'react-native-calendars';
// import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

const Stack = createStackNavigator()

const AuthContext = React.createContext({
  user:null,
  diningHalls:[],
  setUser:null,
  properties:[],
  setProperties:null,
})

export default function App() {
  const [user, setUser] = React.useState(null);
  const [diningHalls, setDiningHalls] = React.useState(null);
  let [fontsLoaded] = useFonts({
    BigShouldersDisplay_100Thin,
    BigShouldersDisplay_300Light,
    BigShouldersDisplay_400Regular,
    BigShouldersDisplay_500Medium,
    BigShouldersDisplay_600SemiBold,
    BigShouldersDisplay_700Bold,
    BigShouldersDisplay_800ExtraBold,
    BigShouldersDisplay_900Black,
  });
  if (!fontsLoaded) {
    return <AppLoading />
  }
  return (
    <NavigationContainer>
      {/* <CalendarList/> */}
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName='FrontPage'
      >
        <Stack.Screen name='FrontPage' component={FrontPage}/>
        <Stack.Screen name='CalendarScreen' component={CalendarScreen}/>
      </Stack.Navigator>

    {/* <AuthContext.Provider
      value={{ user, setUser, diningHalls}}
    >
     {!user ? <Auth /> : <FrontPage />}
    </AuthContext.Provider> */}
    </NavigationContainer>
  );}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  frontPageContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },

  titles: {
    marginTop: '70%',
    width: '100%',
    alignItems: 'center',
  },

  title: {
    fontFamily: 'BigShouldersDisplay_700Bold',
    fontSize: 50,
    color: '#E05E15',
    // fontWeight: 'bold',
  },

  subtitle: {
    fontSize: 16,
    color: '#5c5e62',
  },

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },

  button1: {
    fontFamily: 'BigShouldersDisplay_700Bold',
    marginTop: '122%',
    fontSize: 25,
    position: 'absolute',
    color: '#FFFFFF',
  }
});
