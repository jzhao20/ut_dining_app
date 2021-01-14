import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import CalendarScreen from '../screens/CalendarScreen/index';
import FrontPage from '../screens/FrontPage/index';
import HallSelectionScreen from '../screens/HallSelectionScreen/index';
import MealtimeSelectionScreen from '../screens/MealtimeSelectionScreen/index';

import SignUpScreen from '../screens/SignUpScreen/index';
import SignInScreen from '../screens/SignInScreen/index';
import ProfileScreen from '../screens/ProfileScreen/index';
import EditProfile from '../screens/EditProfile/index';

const ProfileStack = createStackNavigator();

function ProfileStackScreen () {
    return(
        <ProfileStack.Navigator >
            <ProfileStack.Screen 
                name = "profile" 
                component = {ProfileScreen}
                options={{
                    title: ''
                }}
            />
            <ProfileStack.Screen 
                name = "edit profile" 
                component = {EditProfile}
                options={{
                    title: ''
                }}
            />
        </ProfileStack.Navigator>
    )
}

const LoginStack = createStackNavigator();

function LoginStackScreen () {
    return (
        <LoginStack.Navigator
            initialRouteName='SignInScreen'
            screenOptions={{
                headerShown: false
              }}>
            <LoginStack.Screen
                name='SignInScreen'
                component={SignInScreen}
            />
            <LoginStack.Screen
                name='SignUpScreen'
                component={SignUpScreen}
            />
            <LoginStack.Screen
                name='FrontPage'
                component={FrontPage}
            />
        </LoginStack.Navigator>
    );
}

const SelectionStack = createStackNavigator();

function SelectionStackScreen () {
    return (
        <SelectionStack.Navigator
            initialRouteName='CalendarScreen'>
            <SelectionStack.Screen 
                name='CalendarScreen' 
                component={CalendarScreen}
                options={{
                    title: 'Calendar',
                    headerStyle: {
                        backgroundColor: '#E05E15',
                    },
                    headerTintColor: 'white'
                }}
            />
            <SelectionStack.Screen
                name='MealSelectionScreen'
                component={MealtimeSelectionScreen}
                options={{
                    title: ''
                }}
            />
            <SelectionStack.Screen
                name='HallSelectionScreen'
                component={HallSelectionScreen}
                options={{
                    title: ''
                }}
            />
        </SelectionStack.Navigator>
    );
}

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            tabBarOptions={{
                // showLabel: false,
                style: {
                    // borderTopWidth: 0,
                    backgroundColor: 'white',
                    elevation: 0
                }
            }}
        >
            <Tab.Screen
                // name='Home' component={FrontPage}
                name='Home' component={LoginStackScreen}
                options={{
                    tabBarVisible: false,
                    tabBarIcon: ({focused}) => (
                        <Image
                            source={require('../assets/images/Icons/cutlery.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: '#E05E15'
                            }}
                        />
                    ),
                }}
            />
            <Tab.Screen
                // name='Search' component={CalendarScreen}
                name='Search' component={SelectionStackScreen}
                options={{
                    tabBarVisible: true,
                    tabBarIcon: ({focused}) => (
                        <Image
                            source={require('../assets/images/Icons/search.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: '#E05E15'
                            }}
                        />
                    )
                }}
            />
            <Tab.Screen
                name='Profile' component={ProfileStackScreen}
                options={{
                    tabBarVisible: true,
                    tabBarIcon: ({focused}) => (
                        <Image
                            source={require('../assets/images/Icons/user.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: '#E05E15'
                            }}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    );
}

export default Tabs;