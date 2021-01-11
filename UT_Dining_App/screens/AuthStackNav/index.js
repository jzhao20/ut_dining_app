import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import signIn from '../SignInScreen/index'
import signUp from '../SignUpScreen/index'
import {AuthContext} from '../../App'
const Stack = createStackNavigator();
const AuthStackNav = ()=>{
    const {setUser} = useContext(AuthContext)
    setUser("")
    return(
        <Stack.Navigator screenOptions = {{header: () =>null}}>
            <Stack.Screen name="signIn" component = {signIn}/>
            <Stack.Screen name = "signUp" component = {signUp}/>
        </Stack.Navigator>
    )
}
export default AuthStackNav