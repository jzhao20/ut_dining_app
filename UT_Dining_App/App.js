import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
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

 import FrontPage from './assets/components/FrontPage';


export default function App() {
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
  } else {
  return (
    <View style={styles.container}>
      <FrontPage/>
      {/* <View style={styles.frontPageContainer}>

          <ImageBackground
            source={require('./assets/images/front/longhorn_logo.png')}
            style={{
              marginTop: '20%',
              width: 354,
              height: 185,
              position: 'absolute'}}
          />

          <ImageBackground
            source={require('./assets/images/front/rectangle_button.png')}
            style={{
              marginTop: '120%',
              width: 240,
              height: 54,
              position: 'absolute'}}
          />
          <Text style={styles.button1}>Continue</Text>

          <View style={styles.titles}>

            <Text style={styles.title}>UT Austin Menu</Text>
            <Text style={styles.subtitle}>Bringing the Joy to Dining</Text>

          </View>
        
      </View> */}

      <StatusBar style="auto" />
    </View>
  );}
}

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
