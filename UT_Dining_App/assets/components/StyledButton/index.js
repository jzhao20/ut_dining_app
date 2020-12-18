import React from 'react';
import {View, Text, Pressable} from 'react-native';
import styles from './styles';

const StyledButton = (props) => {

    // const type = props.type;
    // const content = props.content;
    // const onPress = props.onPress;

    const { type, content, onPress } = props;

    const backgroundColor = type === 'primary' ? '#E05E15' : '#5c5e62';

    return (
        <View style={styles.container}>

            <Pressable
                style={[styles.button, {backgroundColor: backgroundColor}]}
                onPress={() => {
                    onPress()
                }}>

                <Text style={styles.text}>{content}</Text>

            </Pressable>
            
        </View>
    
    );
};

export default StyledButton;