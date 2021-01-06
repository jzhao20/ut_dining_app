import React, { useContext, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-gesture-handler';
import styles from './styles';

import StyledButton from '../../assets/StyledButton';

function SignInScreen(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const { setUser } = useContext(AuthContext);

    const loginHandler = () => {
        login(email, password)
          .then((user) => {
            getUser(user.user.uid).then((res) => {
              setUser({ uid: user.user.uid, ...res });
            });
          })
          .catch((err) => {
            alert(err);
          });
      };

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.login}>
                    Login
                </Text>
                <TextInput
                    placeholder="email"
                    style={styles.input}
                    // placeholderTextColor={Theme.colors.gray1}
                    value={email}
                    onChangeText={setEmail}
                    autoCorrect={false}
                    autoCapitalize="none"
                />
                <TextInput
                    placeholder="password"
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
                    onPress={() => {
                    console.warn("Submit pressed")
                    // change to act as a signin
                    }}
                />
                </View>
                
                <TouchableOpacity>
                    <Text style={styles.signupText} onPress={() => console.warn('stuff works')}>
                        Don't have an account?
                    </Text>
                </TouchableOpacity>
                

            </View>
        </SafeAreaView>
    );
}

export default SignInScreen;