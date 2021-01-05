import React from 'react';
import {View, Text, Image, TouchableOpacity, Avatar} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';

function ProfileScreen(props) {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.userInfoSection}>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default ProfileScreen;