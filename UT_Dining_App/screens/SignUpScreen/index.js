import React, { useContext, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-gesture-handler';
import styles from './styles';
import {signUp} from '../../mongodb/AuthProvider';
import StyledButton from '../../assets/StyledButton';
import {AuthContext} from '../../App'
const display_text = React.createContext({
    display_message:""
})
function SignUpScreen({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [display_message, setMessage] = useState('');
    const { setUser } = useContext(AuthContext);
    const {setDescription} = useContext(AuthContext);
    const {setImage} = useContext(AuthContext);
    const [confirmpassword, setConfirmpassword] = useState('');
    const submitHandler = async() => {
        //console.warn("hello there")
        const val = await(signUp(email, password))
        console.warn(val)
        if (val.toString() == "added profile logging you in"){
            setUser(email)
            setDescription("")
            setImage("")
        }
        setMessage(val.toString())
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
                            submitHandler()
                    // change to act as a signup
                    }}
                />
                </View>
                
                <TouchableOpacity>
                    <Text style={styles.signupText} onPress={() => navigation.navigate('signIn')}>
                        Already have an account?
                    </Text>
                </TouchableOpacity>
                <Text>{display_message}</Text>
                
            </View>
        </SafeAreaView>
    );
};

export default SignUpScreen;