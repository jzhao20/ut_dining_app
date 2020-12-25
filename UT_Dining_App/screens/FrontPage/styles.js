import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    frontPageContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    
    titles: {
        marginTop: '70%',
        width: '100%',
        alignItems: 'center',
    },
    
    title: {
        fontFamily: 'BigShouldersDisplay_700Bold',
        fontSize: 50,
        color: '#E05E15',
        // fontWeight: 'bold',
    },
    
    subtitle: {
        fontSize: 16,
        color: '#5c5e62',
    },
    
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute',
    },
    
    // button1: {
    //     fontFamily: 'BigShouldersDisplay_700Bold',
    //     marginTop: '122%',
    //     fontSize: 25,
    //     position: 'absolute',
    //     color: '#FFFFFF',
    // },

    buttonContainer: {
        position: 'absolute',
        marginTop: '122%',
        width: '60%',
    }
});

export default styles;