import React, {useState, useContext, useEffect} from 'react';
import {updateProfile} from '../../mongodb/AuthProvider'
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {format} from 'react-string-format'
import { TextInput } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker'
import { Platform } from 'react-native';
import styles from '../../assets/StyledButton/styles';
import StyledButton from '../../assets/StyledButton';
import {AuthContext} from '../../App'
function editProfileScreen({navigation}){
    const {user} = useContext(AuthContext)
    const {description} = useContext(AuthContext)
    const {setDescription} = useContext(AuthContext)
    const {image} = useContext(AuthContext)
    const {setImage} = useContext(AuthContext)
    const [new_description, set_new_description] = useState("")
    const [new_image, set_new_image] = useState("")
    const [new_image_display, set_new_image_display] = useState(null);
    const [message_state, set_message_state] = useState(false)
    const [image_state, set_image_state] = useState(false)
    const editHandler = ()=>{
        if (message_state){
            setDescription(new_description)
        }
        if (image_state){
            setImage(new_image)
        }
        updateProfile(new_description, new_image, user)
        navigation.navigate('profile')
    }
    const pickImage = async()=>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing:true,
            aspect:[4,3],
            quality:1,
            base64:true,
        });
        if( !result.cancelled){
            set_new_image_display(result.uri)
            set_new_image(result.base64)
            set_image_state(true)
        }
    }
    const description_handler = ()=>{
        
    }
    useEffect(()=>{
        (async ()=>{
            if(Platform.OS !== 'web'){
                const{
                    status,
                } = await ImagePicker.requestCameraPermissionsAsync();
            if(status !== 'granted'){
                alert('Camera roll permissions are needed')
            }
        }
        })();
    },[]);

    return (
        <SafeAreaView>
            <View>
                <Text>
                    {format('Email:{0}',user)}
                </Text>
                <Text>
                    Description:
                </Text>
                <TextInput
                    placeholder = {description}
                    value = {new_description}
                    onChangeText = {(text)=> {
                        set_new_description(text)
                        set_message_state(true)
                    }
                }
                    autoCorect = {false}
                    autoCapitalize = "none"
                />
                <Text>
                    Image:
                </Text>
                <TouchableOpacity onPress={pickImage}>
                    {new_image_display ?(
                        <Image source={{uri:new_image_display}}style= {styles.pfp}/>
                    ):(
                        <View 
                            style={{
                                width:200,
                                height:200
                            }}
                        ></View>
                    )}
                </TouchableOpacity>
                <View style={styles.button}>
                <StyledButton
                    type="primary"
                    content = {"Edit"}
                    onPress={editHandler}
                />
                </View>
            </View>
        </SafeAreaView>
    )
}
export default editProfileScreen