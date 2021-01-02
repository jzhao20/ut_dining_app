import { StyleSheet } from 'react-native';

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    
    headerRect: {
        marginTop: '-30%',
        width: '100%',
        backgroundColor: '#E05E15',
        height: '50%',
        borderRadius: 76,
        alignItems: 'center',
        justifyContent: 'center',
    },

    titles: {
        position: 'absolute',
        marginTop: '-5%',
        width: '100%',
    },
    
    title: {
        textAlign: 'center',
        fontFamily: 'BigShouldersDisplay_700Bold',
        fontSize: 40,
        // color: '#E05E15',
        color: 'white',
        // fontWeight: 'bold',
    },
    
    image1touch: {
        position: 'absolute',
        marginTop: '50%',
        // top: 170,
        left: 40,
    },

    image: {
        width: windowWidth*0.32,
        height: windowWidth*0.32,
        // height: 120,
        borderWidth: 2,
        borderColor: '#C4C4C4',
    },

    image2touch: {
        position: 'absolute',
        marginTop: '50%',
        // top: 170,
        right: 40,
    },

    image3touch: {
        position: 'absolute',
        marginTop: '85%',
        // top: 300,
        left: 40,
    },

    image4touch: {
        position: 'absolute',
        marginTop: '85%',
        // top: 300,
        right: 40,
    },

    image5touch: {
        position: 'absolute',
        marginTop: '120%',
        // top: 430,
    },

});

export default styles;