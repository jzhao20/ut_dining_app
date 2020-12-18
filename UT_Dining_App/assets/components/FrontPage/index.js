import React from 'react';
import {View, Text, ImageBackground} from 'react-native';
import StyledButton from '../StyledButton';
import styles from './styles';

const FrontPage = (props) => {
    return (
        <View style={styles.frontPageContainer}>

          <ImageBackground
            source={require('../../images/front/longhorn_logo.png')}
            style={{
              marginTop: '20%',
              width: 354,
              height: 185,
              position: 'absolute'}}
          />

          {/* <ImageBackground
            source={require('../../images/front/rectangle_button.png')}
            style={{
              marginTop: '120%',
              width: 240,
              height: 54,
              position: 'absolute'}}
          />

          <Text style={styles.button1}>Continue</Text> */}

          <View style={styles.titles}>

            <Text style={styles.title}>UT Austin Menu</Text>
            <Text style={styles.subtitle}>Bringing the Joy to Dining</Text>

          </View>

          <View style={styles.buttonContainer}>
            <StyledButton 
              type="primary"
              content={"Continue"}
              onPress={() => {
                console.warn("Continue pressed")
              }}
            />
          </View>
          
        
      </View>
    );
};

export default FrontPage;