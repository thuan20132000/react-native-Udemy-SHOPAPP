import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Ionicons} from '@expo/vector-icons';

const CartItem = props =>{
    return(
        <View style={styles.cartItem}>
            <View style={styles.itemData}>
                <Text style={styles.quantity}>{props.quantity}</Text>
                <Text style={styles.mainText}>{props.title}</Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.mainText}>${props.amount}</Text>
                {props.deletable && (
                <TouchableOpacity
                    onPress={props.onDelete}
                >
                    <Ionicons
                        name="ios-trash"
                        size={33}
                        color="red"
                    />
                </TouchableOpacity>
                )}
            </View>
            
        </View>
    )
};
export default CartItem;
const styles = StyleSheet.create({
    cartItem:{
        flexDirection:'row',
        justifyContent:"space-between",
        padding:10,
        backgroundColor:'white',
    },
    itemData:{
        flexDirection:'row',
        alignItems:'center',
        marginHorizontal:10
    },
    quanitity:{
        fontFamily:'open-sans',
        color:'#888'
    },
    mainText:{
        marginHorizontal:10
    },
    deleteButton:{
        marginLeft:30
    }
});
