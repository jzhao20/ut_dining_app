import React, { useContext, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-gesture-handler';
import styles from './styles';
import {signIn} from '../../mongodb/AuthProvider';
import StyledButton from '../../assets/StyledButton';

function SignInScreen({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [display_message , setMessage] = useState('');
    const loginHandler = async() => {
        signIn(email, password).then((res)=>{
            console.warn(res)
        })
      };

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.login}>
                    Login
                </Text>
                <TextInput
                    placeholder="Email"
                    style={styles.input}
                    // placeholderTextColor={Theme.colors.gray1}
                    value={email}
                    onChangeText={setEmail}
                    autoCorrect={false}
                    autoCapitalize="none"
                />
                <TextInput
                    placeholder="Password"
                    style={styles.input}
                    // placeholderTextColor={Theme.colors.gray1}
                    value={password}
                    onChangeText={setPassword}
                    autoCorrect={false}
                    secureTextEntry={true}
                    autoCapitalize="none"
                />
                <View style={ styles.button }>

                <StyledButton
                    type="primary"
                    content={"Submit"}
                    onPress={ loginHandler}
                />
                </View>
                
                <TouchableOpacity>
                    <Text style={styles.signupText} onPress={() => navigation.navigate('SignUpScreen')}>
                        Don't have an account?
                    </Text>
                </TouchableOpacity>
                

            </View>
        </SafeAreaView>
    );
};

export default SignInScreen;