import React from 'react';
import {View, Text, ImageBackground} from 'react-native';
import StyledButton from '../../assets/StyledButton';
import styles from './styles';

// const FrontPage = (props) => {
function FrontPage(props) {
    return (
        <View style={styles.frontPageContainer}>

          <ImageBackground
            source={require('../../assets/images/Front/longhorn_logo.png')}
            style={{
              marginTop: '20%',
              width: 354,
              height: 185,
              position: 'absolute'}}
          />

          <View style={styles.titles}>

            <Text style={styles.title}>UT Austin Menu</Text>
            <Text style={styles.subtitle}>Bringing the Joy to Dining</Text>

          </View>

          <View style={styles.buttonContainer}>
            <StyledButton 
              type="primary"
              content={"Continue"}
              onPress={() => {
                // console.warn("Continue pressed")
                props.navigation.navigate('Search');
              }}
            />
          </View>
        
      </View>
    );
};

export default FrontPage;