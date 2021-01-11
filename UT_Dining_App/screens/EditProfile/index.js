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
    const [new_image, set_new_image] = useState({image})
    const [new_image_display, set_new_image_display] = useState(null);
    const [display_message, set_message] = useState('')
    const editHandler = async()=>{
        setDescription(new_description)
        setImage(new_image)
        const val = await(updateProfile(new_description, new_image, user))
        set_message(val)
        if(display_message == "updated profile"){
            navigation.navigate('profile')
        }
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
            set_new_image(format('data:image/png;base64,{0}',result.base64))
        }
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
                    onChangeText = {set_new_description}
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