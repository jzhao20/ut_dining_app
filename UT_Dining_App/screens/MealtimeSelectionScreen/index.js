import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import StyledButton from '../../assets/StyledButton';

function MealtimeSelectionScreen({route, navigation}) {
// function MealtimeSelectionScreen(props) {
    // const { day, month, year } = props;
    // console.warn(route)
    // console.warn(route.params)

    let monthNames = [0, 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const { day, month, year } = route.params;
    
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.headerRect}/>
                <View style={styles.titles}>
                    <Text style={styles.title}>
                        {monthNames[month]}{' '}{day}{'\n'}{year}{'\n\n'}Select a Mealtime
                    </Text>
                </View>

                <View style={styles.buttons}>
                    <StyledButton 
                        type="secondary"
                        content={"Breakfast"}
                        onPress={() => {
                            navigation.navigate('HallSelectionScreen', {
                                day: day,
                                month: monthNames[month],
                                year: year,
                                meal: 'Breakfast'
                            });
                        }}
                    />
                    <StyledButton 
                        type="primary"
                        content={"Lunch"}
                        onPress={() => {
                            navigation.navigate('HallSelectionScreen', {
                                day: day,
                                month: monthNames[month],
                                year: year,
                                meal: 'Lunch'
                            });
                        }}
                    />
                    <StyledButton 
                        type="secondary"
                        content={"Dinner"}
                        onPress={() => {
                            navigation.navigate('HallSelectionScreen', {
                                day: day,
                                month: monthNames[month],
                                year: year,
                                meal: 'Dinner'
                            });
                        }}
                    />
                </View>
                
            </View>
        </SafeAreaView>
    );
}

export default MealtimeSelectionScreen;