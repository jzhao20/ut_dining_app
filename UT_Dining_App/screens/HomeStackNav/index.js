import {createStackNavigator} from '@react-navigation/stack';
import React from 'react'
import Calendar from '../CalendarScreen/index'
import Profile from '../ProfileScreen/index'
import AuthStackNav from '../AuthStackNav/index'
const Stack = createStackNavigator();
export default function HomeStackNav({navigation}){
    return(
        <Stack.Navigator>
            <Stack.Screen name = "Calendar" component = {Calendar} options = {{headerShown:false}}/>
            <Stack.Screen name = "Profile" component = {Profile} options = {{headerShown:false}}/>
            <Stack.Screen name = "Sign out" component = {AuthStackNav} options = {{headerShown:false}}/>
        </Stack.Navigator>
    )
}