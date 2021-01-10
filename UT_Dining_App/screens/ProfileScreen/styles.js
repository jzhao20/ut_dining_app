import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        // alignItems: 'center',
        // flex: 1,
    },

    profilePicture: {
        // alignItems: 'center',
        // paddingHorizontal: 30,
        alignItems: 'center',
        // justifyContent: 'center',
        marginBottom: 40
    },

    userInfoSection: {
        alignItems: 'flex-start',
        paddingHorizontal: 30,
        marginBottom: 25
    },

    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },

    iconText: {
        color:'gray', 
        marginLeft: 20,
        marginRight: 20,
        fontSize: 18,
    },

    descriptionBox: {
        color:'gray', 
        marginLeft: 20,
        marginRight: 20,
        width: '80%',
        height: '100%',
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#f2f2f2'
    },

    input: {
        // backgroundColor: '#5c5e62',
        // backgroundColor: '#d3d3d3',
        padding: 8,
        borderRadius: 10,
        marginVertical: 5,
        width: '80%',

        marginLeft: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#f2f2f2',
    },

    passChange: {
        backgroundColor: '#d3d3d3',
        padding: 8,
        borderRadius: 10,
        marginVertical: 5,
        width: '80%',
    },

    buttonContainer : {
        width: '70%'
    },
    
    // headerRect: {
    //     marginTop: '-30%',
    //     width: '100%',
    //     backgroundColor: '#E05E15',
    //     height: '70%',
    //     borderRadius: 76,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },

    // titles: {
    //     position: 'absolute',
    //     marginTop: '0%',
    //     width: '100%',
    // },
    
    // title: {
    //     textAlign: 'center',
    //     // fontFamily: 'BigShouldersDisplay_700Bold',
    //     // fontSize: 45,

    //     // color: '#E05E15',
    //     color: 'black',
    //     // fontWeight: 'bold',
    // },
    
    // buttons: {
    //     position: 'absolute',
    //     marginTop: '80%',
    //     width: '100%',
    // }

});

export default styles;