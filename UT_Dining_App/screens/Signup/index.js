import React, { useState, useContext} from 'react';
import {AuthContext} from '../../App';
import {TextInput} from 'react-native-gesture-handler';
export default function Login({navigation}){
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const{setUser} = useContext(AuthContext);

    const submitHandler = () =>{
        signup(email, password)
        .then((res)=>{
            navigation.navigate("Setup", {uid:res.user.uid});
        })
        .catch((err)=>{
            alert(err)
        });

    }
}