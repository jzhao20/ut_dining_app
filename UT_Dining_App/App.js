import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import axios from 'axios';
import FrontPage from './screens/FrontPage/index';
// import Auth from './screens/Auth/AuthStackNav';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {base_url} from './ngrok_code'
//import {getRealmApp} from "./getRealmApp";
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
import Tabs from './navigation/tabs';
// import { Calendar } from 'react-native-calendars';
// import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import HallSelectionScreen from './screens/HallSelectionScreen/index';
import MealtimeSelectionScreen from './screens/MealtimeSelectionScreen/index';
import SignInScreen from './screens/SignInScreen/index';
import ProfileScreen from './screens/ProfileScreen/index';
import SignUpScreen from './screens/SignUpScreen/index';
import AuthStackNav from './screens/AuthStackNav/index'
import Home from './screens/RootDrawerNav';
import MenuScreen from './screens/MenuScreen/index';
//const app = useContext(getRealmApp());
//const dining_hall_collection = app.collection2 

const AuthContext = React.createContext({
  user:"",
  setUser: null,
  diningHalls:[],
  description:"",
  setDescription:null,
  image:"",
  setImage:null
})

export default function App() {
  const Stack = createStackNavigator();

  const [user, setUser] = React.useState("");
  const [description, setDescription] = React.useState("")
  const [image, setImage] = React.useState("")
  const [diningHalls, setDiningHalls] = React.useState(null);
  useEffect(()=>{
    axios.get(base_url.concat('/halls/get')).then((response)=>{
      console.warn(response["data"])
      setDiningHalls(response["data"])
      }
    )
  },[]);

  //useEffect(()=>
  //{
    //setDiningHall(dining_hall_collection.find()[0]);
  //}, []);
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
    <MenuScreen/>
    // <AuthContext.Provider value = {{user, setUser, description, setDescription, image, setImage, diningHalls}}>
    //   <NavigationContainer>{!user ? <AuthStackNav/> : <Home/>}</NavigationContainer>
    // </AuthContext.Provider>
    // <AuthContext.Provider value = {{user, setUser, description, setDescription, image, setImage, diningHalls}}>
    // <NavigationContainer>
    //   <Stack.Navigator
    //     screenOptions={{
    //       headerShown: false
    //     }}
    //     initialRouteName='TabScreen'
    //   >
    //     <Stack.Screen name='TabScreen' component={Tabs}/>
    //   </Stack.Navigator>
    // </NavigationContainer>
    // </AuthContext.Provider>
  );}
export {AuthContext};

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
