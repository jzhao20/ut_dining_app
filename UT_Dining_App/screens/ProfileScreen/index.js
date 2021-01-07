import React from 'react';
import {View, Text, Image, TouchableOpacity, Avatar} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
const user_profile = React.createContext({
  meal_time:"",
  current_dining_hall:"",
  current_selections:{},
  setMealTime:null,
  setDiningHall:null,
  setSelections:null
})  

export default function ProfileScreen(props) {
    const [meal_time, setMealTime] = React.useState("")
    const [current_dining_hall, setDiningHall] = React.useState("")
    const [current_selections, setSelections] = React.useState("")
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.userInfoSection}>
                </View>
            </View>
        </SafeAreaView>
    );
}
export {user_profile};