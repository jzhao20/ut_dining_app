import React, { useContext, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-gesture-handler';
import styles from './styles';
import {AuthContext} from '../../App'
import {signIn, getProfile} from '../../mongodb/AuthProvider';
import StyledButton from '../../assets/StyledButton';
import {format} from 'react-string-format'
const display_text = React.createContext({
    display_message:""
})
function SignInScreen({navigation}) {
    const {setUser} = useContext(AuthContext)
    const {setDescription} = useContext(AuthContext)
    const {setImage} = useContext(AuthContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [display_message , setMessage] = useState('');
    const loginHandler = async() => {
        const val = await(signIn(email, password))
        if(val.toString() == "you've been successfully logged in"){
            console.warn("successfully loged in")
            const res = await getProfile(email)
            setUser(email)
            setDescription(res["description"])
            const img = format('data:image/png;base64,{0}',res['picture'])
            setImage(img)
            setMessage(val.toString())
        }
        navigation.navigate('FrontPage')
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
                    <Text style={styles.signupText} onPress={() => {navigation.navigate('signUp')}}>
                        Don't have an account?
                    </Text>
                </TouchableOpacity>
                <Text>{display_message}</Text>
                

            </View>
        </SafeAreaView>
    );
};

export default SignInScreen;