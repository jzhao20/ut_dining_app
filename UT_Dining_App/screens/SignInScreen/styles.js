import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        padding: 40,
    },

    login: {
        marginVertical: 50,
        fontFamily: 'BigShouldersDisplay_700Bold',
        fontSize: 45,
        color: '#E05E15',
    },

    input: {
        // backgroundColor: '#5c5e62',
        backgroundColor: '#d3d3d3',
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        width: '100%',
    },

    button: {
        marginVertical: 10,
        width: '70%'
    },

    signupText: {
        marginVertical: 50,
        color: 'gray',
    }
});

export default styles;