import React, { useContext, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-gesture-handler';
import styles from './styles';
import {AuthContext} from '../../App'
import {signIn, getProfile} from '../../mongodb/AuthProvider';
import StyledButton from '../../assets/StyledButton';
// import CounterInput from "react-native-counter-input";
import Counter from "react-native-counters";

function MenuScreen ({navigation, route}) {

    const [test, setTest] = useState([
        { key: 'Beef Noodle Soup', serving_size: '6 ozl', quantity: 0},
        { key: 'Wheat Dinner Roll', serving_size: '1 each', quantity: 0},
    ]);

    const renderItem = ({ item }) => {
        return (
            <View style={styles.row}>
                <Text style={styles.foodName}>
                    {item.key}
                </Text>
                <Text style={styles.servingSize}>
                    {item.serving_size}
                </Text>
                <View style={styles.quantity}>
                    <Counter
                        start={0}
                        onChange={(counter)=>{
                            console.warn(counter);
                        }}
                        buttonStyle={styles.quantityButton}
                        buttonTextStyle={styles.quantityFont}
                    />
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.row}>
                    <Text style={styles.foodNameTitle}>
                        Food
                    </Text>
                    <Text style={styles.servingSizeTitle}>
                        Serving size
                    </Text>
                    <Text style={styles.quantityTitle}>
                        Quantity
                    </Text>
                </View>
                <FlatList
                    data={test}
                    renderItem={renderItem}
                />
            </View>
        </SafeAreaView>
    );
};

export default MenuScreen;