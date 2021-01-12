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
  email:"",
  description:"",
  image:""
})  

export default function ProfileScreen ({navigation}){
    const {user} = useContext(AuthContext)
    const {description} = useContext(AuthContext)
    const {image} = useContext(AuthContext)
    const [state, setState] = React.useState(false)
    const [meal_time, setMealTime] = React.useState("")
    const [current_dining_hall, setDiningHall] = React.useState("")
    const [current_selections, setSelections] = React.useState("")
    const [tempValue, setTempValue] = React.useState("")
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
                        <Text style={styles.iconText}>{user}</Text>
                    </View>
                    <View style={styles.row}>
                        <Icon name='alpha-d-box-outline' color = 'gray' size={30}/>
                        { <Text style={styles.iconText}>
                            {description}
                        </Text> }
                    </View>
                    <View style = {styles.row}>
                        <Image style={{
                            width:200,
                            height:200,
                            resizeMode: 'cover'
                        }}
                        source={
                            {uri: format('data:image/png;base64,{0}',image)}
                        }/>
                    </View>
                </View>
                <TouchableOpacity>
                    <Text style = {styles.signupText}onPress={()=>{navigation.navigate('edit profile')}}>
                        Edit Profile 
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
export {user_profile};