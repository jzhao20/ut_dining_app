import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from '../ProfileScreen/index'
import EditProfile from '../EditProfile/index'
const Stack = createStackNavigator();
const ProfileNav = () =>{
    return(
        <Stack.Navigator screenOptions = {{header: ()=>null}}>
            <Stack.Screen name = "profile" component = {ProfileScreen}/>
            <Stack.Screen name = "edit profile" component = {EditProfile}/>
        </Stack.Navigator>
    )
}
export default ProfileNav