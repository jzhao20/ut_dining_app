import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        // alignItems: 'center',
        // flex: 1,
    },

    row: {
        // left: 10,
        flexDirection: 'row',
        marginBottom: 10,
        backgroundColor: '#E05E15'
    },

    rowEntry: {
        left: 10,
        flexDirection: 'row',
        marginBottom: 5,
        borderTopWidth: 1,
        borderColor: '#d3d3d3',
    },

    buttonContainer: {
        width: '70%'
    },

    foodName: {
        flex: 4,
        fontSize: 18,
        textAlignVertical: 'center'
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
        textAlignVertical: 'center'
    },

    servingSizeTitle: {
        fontWeight: 'bold',
        paddingLeft: 10,
        paddingRight: 10,
        flex: 2,
        fontSize: 24,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        // borderColor: 'white',
        textAlign: 'center'
    },

    quantity: {
        marginLeft: 10,
        marginTop: 5,
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