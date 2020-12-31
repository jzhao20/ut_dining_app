import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import CalendarScreen from '../screens/CalendarScreen/index';
import FrontPage from '../screens/FrontPage/index';
import HallSelectionScreen from '../screens/HallSelectionScreen/index';
import MealtimeSelectionScreen from '../screens/MealtimeSelectionScreen/index';

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
                name='Home' component={FrontPage}
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
                name='Profile' component={CalendarScreen}
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