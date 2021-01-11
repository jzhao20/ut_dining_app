import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react'
import Home from '../HomeStackNav/index'
import AuthStackNav from '../AuthStackNav/index';
import Profile from '../ProfileScreen/index'
const Drawer = createDrawerNavigator();
export default function RootDrawerNav(){
    return(
        <Drawer.Navigator drawerContentOptions={{labelStyle:{fontWeight:'800',fontSize:20},
    itemStyle:{borderRadius:20, paddingHorizontal:10},
        }}>
            <Drawer.Screen name = "Calendar" component = {Home}/>
            <Drawer.Screen name = "Profile" component = {Profile}/>
            <Drawer.Screen name = "Sign Out" component = {AuthStackNav}/>
        </Drawer.Navigator>
    )
}