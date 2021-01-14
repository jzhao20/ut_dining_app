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
        left: 20,
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

    foodName: {
        flex: 4,
        fontSize: 18
    },

    foodNameTitle: {
        fontWeight: 'bold',
        flex: 4,
        fontSize: 24,
        // borderRightWidth: 1,
        textAlign: 'center'
    },

    servingSize: {
        flex: 2,
        fontSize: 18,
    },

    servingSizeTitle: {
        fontWeight: 'bold',
        paddingLeft: 12,
        paddingRight: 12,
        flex: 2,
        fontSize: 24,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        textAlign: 'center'
    },

    quantity: {
        marginLeft: 10,
        flex: 3,
        fontSize: 18
    },

    quantityTitle: {
        fontWeight: 'bold',
        marginLeft: 10,
        flex: 3,
        fontSize: 25,
    },

    quantityButton: {
        borderColor:'#E05E15',
    },

    quantityFont: {
        color: '#E05E15',
    }
});

export default styles;