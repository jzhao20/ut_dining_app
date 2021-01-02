import { StyleSheet } from 'react-native';

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
        height: '70%',
        borderRadius: 76,
        alignItems: 'center',
        justifyContent: 'center',
    },

    titles: {
        position: 'absolute',
        marginTop: '0%',
        width: '100%',
    },
    
    title: {
        textAlign: 'center',
        fontFamily: 'BigShouldersDisplay_700Bold',
        fontSize: 45,
        // color: '#E05E15',
        color: 'white',
        // fontWeight: 'bold',
    },
    
    buttons: {
        position: 'absolute',
        marginTop: '80%',
        width: '100%',
    }

});

export default styles;