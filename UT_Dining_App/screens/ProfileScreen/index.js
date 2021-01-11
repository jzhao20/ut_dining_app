import React, { useEffect, useContext } from 'react';
import {View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import {getProfile} from '../../mongodb/AuthProvider'
import { TextInput } from 'react-native-gesture-handler';
// import { Avatar, Title, Caption, TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import StyledButton from '../../assets/StyledButton';
import {AuthContext} from '../../App'
import { format } from 'react-string-format';

const user_profile = React.createContext({
  meal_time:"",
  current_dining_hall:"",
  current_selections:{},
  setMealTime:null,
  setDiningHall:null,
  setSelections:null,
})  

export default function ProfileScreen (props){
    const user = useContext(AuthContext).user
    const [state, setState] = React.useState(false)
    const [meal_time, setMealTime] = React.useState("")
    const [current_dining_hall, setDiningHall] = React.useState("")
    const [current_selections, setSelections] = React.useState("")
    const [email, setEmail] = React.useState()
    const [description, setDescription] = React.useState("")
    const [image, setImage] = React.useState("")
    const [tempValue, setTempValue] = React.useState("")
    const get_info = async() =>{
        const res = await getProfile(user)
        setEmail(user)
        setDescription(res["description"])
        setImage(format('data:image/png;base64,{0}',res["picture"]))
        setState(true)
        }
    if(!state){
        get_info()
        console.warn("image: "+image)
    }
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.profilePicture}>
                    <ImageBackground
                        source={require('../../assets/images/Front/longhorn_logo.png')}
                        style={{height: 100, width: 100}}
                        imageStyle={{borderRadius:15}}
                    />
                </View>
                <View style={styles.userInfoSection}>
                    <View style={styles.row}>
                        <Icon name='email' color = 'gray' size={30}/>
                        <Text style={styles.iconText}>{email}</Text>
                    </View>
                    <View style={styles.row}>
                        <Icon name='alpha-d-box-outline' color = 'gray' size={30}/>
                        { <Text style={styles.iconText}>
                            {description}
                        </Text> }
                    </View>
                    <View style = {styles.row}>
                        <Image style={{
                            resizeMode: 'cover'
                        }}
                        source={image!=""?
                            {uri: image}:null
                        }/>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
export {user_profile};