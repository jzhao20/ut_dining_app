import React, { useContext, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-gesture-handler';
import styles from './styles';
import {signUp} from '../../mongodb/AuthProvider';
import StyledButton from '../../assets/StyledButton';

function SignUpScreen({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [display_message, setMessage] = useState('');
    // const { setUser } = useContext(AuthContext);
    const [confirmpassword, setConfirmpassword] = useState('');
    const submitHandler = () => {
        SignUp(email, password)
          .then((res) => {
              setMessage(res)
          })
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
                    value={confirmpassword}
                    onChangeText={setConfirmpassword}
                    autoCorrect={false}
                    secureTextEntry={true}
                    autoCapitalize="none"
                />
                <View style={ styles.button }>

                <StyledButton
                    type="primary"
                    content={"Submit"}
                    onPress={() => {
                        if (password != confirmpassword)
                            console.warn("Passwords do not match")
                        else
                            console.warn("Valid submit")
                    // change to act as a signup
                    }}
                />
                </View>
                
                <TouchableOpacity>
                    <Text style={styles.signupText} onPress={() => navigation.navigate('SignInScreen')}>
                        Already have an account?
                    </Text>
                </TouchableOpacity>
                
            </View>
        </SafeAreaView>
    );
};

eixport default SignUpScreen;