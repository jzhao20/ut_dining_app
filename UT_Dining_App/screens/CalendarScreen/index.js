import React from 'react';
import {View, Text, ImageBackground} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';

function CalendarScreen(props) {
    return (
        <SafeAreaView>
            <View>
                <CalendarList
                    onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}

                    // Change for pressing a certain date
                    // onDayPress={(day) => {console.warn('selected day', day)}}
                    onDayPress={(day) => {props.navigation.navigate('MealSelectionScreen', {
                        day:day.day, month:day.month, year:day.year});
                    }}
                    onDayLongPress={(day) => {console.log('selected day', day)}}

                    // Max amount of months allowed to scroll to the past. Default = 50
                    pastScrollRange={1}
                    // Max amount of months allowed to scroll to the future. Default = 50
                    futureScrollRange={1}
                    // Enable or disable scrolling of calendar list
                    scrollEnabled={true}
                    // Enable or disable vertical scroll indicator. Default = false
                    showScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
        
    );
}

export default CalendarScreen;