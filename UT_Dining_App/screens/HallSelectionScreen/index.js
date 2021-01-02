import React from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';

function HallSelectionScreen({route, navigation}) {
    const { day, month, year, meal } = route.params;

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.headerRect}/>

                <View style={styles.titles}>
                    <Text style={styles.title}>
                        {month}{' '}{day}{'\n'}{year}{'\n'}{meal}
                    </Text>
                </View>

                {/* <ScrollView> */}
                <TouchableOpacity style={styles.image1touch} onPress={() => console.warn('j2')}>
                    <Image 
                        source={require('../../assets/images/DiningHalls/j2dining.png')}
                        style={styles.image}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.image2touch} onPress={() => console.warn('cypress')}>
                    <Image 
                        source={require('../../assets/images/DiningHalls/cypressbend.png')}
                        style={styles.image}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.image3touch} onPress={() => console.warn('kinsdining')}>
                    <Image 
                        source={require('../../assets/images/DiningHalls/kinsdining.png')}
                        style={styles.image}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.image4touch} onPress={() => console.warn('kinsmarket')}>
                    <Image 
                        source={require('../../assets/images/DiningHalls/kinsmarket.png')}
                        style={styles.image}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.image5touch} onPress={() => console.warn('jcm')}>
                    <Image 
                        source={require('../../assets/images/DiningHalls/jestercitymarket.png')}
                        style={styles.image}
                    />
                </TouchableOpacity>
                {/* </ScrollView> */}
            </View>
        </SafeAreaView>
    );
}

export default HallSelectionScreen;