import React from 'react';
import {View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';

import { TextInput } from 'react-native-gesture-handler';
// import { Avatar, Title, Caption, TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import StyledButton from '../../assets/StyledButton';

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


    const [tempValue, setTempValue] = React.useState("asdf testSuper long test description placeholder perhapsasdflaksjdfl;kasjdfl;kajsdfl;kjsdlkf alskdjflsakjdf asdlfkjsldkf")

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.profilePicture}>
                    <ImageBackground
                        source={require('../../assets/images/Front/longhorn_logo.png')}
                        style={{height: 100, width: 100}}
                        imageStyle={{borderRadius:15}}
                    />
                </View>
                <View style={styles.userInfoSection}>
                    <View style={styles.row}>
                        <Icon name='email' color = 'gray' size={30}/>
                        <Text style={styles.iconText}>Email Placeholder</Text>
                    </View>
                    <View style={styles.row}>
                        <Icon name='lock' color = 'gray' size={30}/>
                        <Text style={styles.iconText}>Password Placeholder</Text>
                    </View>
                    <View style={styles.row}>
                        <Icon name='inbox' color = 'gray' size={30}/>
                        {/* <Text style={styles.iconText}>
                            Super long test description placeholder perhaps
                            asdflaksjdfl;kasjdfl;kajsdfl;kjsdlkf alskdjflsakjdf 
                            asdlfkjsldkf
                        </Text> */}
                        <TextInput
                            style={styles.descriptionBox}
                            value={tempValue}
                            onChangeText={setTempValue}
                            multiline={true}
                            maxLength={100}
                        />
                    </View>
                </View>
                
                <View style={{marginTop: 50}}/>
                <TextInput
                    placeholder="Change password"
                    style={styles.input}
                    // needs changes
                    // value={confirmpassword}
                    // onChangeText={setConfirmpassword}
                    autoCorrect={false}
                    secureTextEntry={true}
                    autoCapitalize="none"
                />
                <TextInput
                    placeholder="Confirm change password"
                    style={styles.input}
                    // needs changes
                    // value={confirmpassword}
                    // onChangeText={setConfirmpassword}
                    autoCorrect={false}
                    secureTextEntry={true}
                    autoCapitalize="none"
                />
                
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <View style={styles.buttonContainer}>
                        <StyledButton 
                            type="primary"
                            content={"Submit changes"}
                            onPress={() => {
                            console.warn("Continue pressed")
                        }}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
export {user_profile};