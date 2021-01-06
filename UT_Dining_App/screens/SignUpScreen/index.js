import React, { useContext, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-gesture-handler';
import styles from './styles';

import StyledButton from '../../assets/StyledButton';

function SignUpScreen({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const { setUser } = useContext(AuthContext);

    const submitHandler = () => {
        signup(email, password)
          .then((res) => {
            navigation.navigate('Setup', { uid: res.user.uid });
          })
          .catch((err) => {
            alert(err);
          });
    };

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.login}>
                    Sign Up
                </Text>
                <TextInput
                    placeholder="Email"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    autoCorrect={false}
                    autoCapitalize="none"
                />
                <TextInput
                    placeholder="Password"
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    autoCorrect={false}
                    secureTextEntry={true}
                    autoCapitalize="none"
                />
                <TextInput
                    placeholder="Confirm password"
                    style={styles.input}
                    autoCorrect={false}
                    secureTextEntry={true}
                    autoCapitalize="none"
                />
                <View style={ styles.button }>

                <StyledButton
                    type="primary"
                    content={"Submit"}
                    onPress={() => {
                    console.warn("Submit pressed")
                    // change to act as a signup
                    }}
                />
                </View>
                
                <TouchableOpacity>
                    <Text style={styles.signupText} onPress={() => console.warn('stuff works')}>
                        Already have an account?
                    </Text>
                </TouchableOpacity>
                
            </View>
        </SafeAreaView>
    );
};

export default SignUpScreen;