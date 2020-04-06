import React,{useState} from 'react';
import {View,Text,FlatList,Button,StyleSheet,ActivityIndicator} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
// import CartItem from '../../models/cart-item';
import CartItem from '../../components/shop/CartItem';
import * as cartActions from '../../store/actions/cart';
import * as orderActions from '../../store/actions/orders';


const CartScreen = props =>{
    const dispatch = useDispatch(); 

    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const cartItems = useSelector(state => {
        const transformedCartItems = [];
        for(const key in state.cart.items){
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice : state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum:state.cart.items[key].sum
            })
        }
        return transformedCartItems;
    });
    const [isLoading,setIsLoading] = useState(false);

    const sendOrderhandler = async ()=>{
        setIsLoading(true);
        await dispatch(orderActions.addOrder(cartItems,cartTotalAmount));
        setIsLoading(false);
    }


    return(
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>Total : 
                    <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
                </Text>
                {isLoading ? <ActivityIndicator size='small' color={Colors.primary} /> :
                <Button
                    title="Order Now"
                    color={Colors.accent}
                    disabled={cartItems.length === 0 ? true: false}
                    onPress={sendOrderhandler}
                />
                }
                
            </View>
            <FlatList
                data={cartItems}
                keyExtractor={item =>item.productId} 
                renderItem={(itemData)=>
                   
                   <CartItem
                    quantity={itemData.item.quantity}
                    title={itemData.item.productTitle}
                    amount={itemData.item.sum.toFixed(2)}
                    deletable
                    onDelete={()=>{
                        dispatch(cartActions.removeFromCart(itemData.item.productId))
                    }}
                   />
                }
            />
        </View>
    )
}
const styles = StyleSheet.create({
    screen:{
        padding:10
    },
    summary:{
        flexDirection:'row',
        alignSelf:'center',
        justifyContent:'space-around',
        marginBottom:20,
        padding:10,
        shadowColor:'black',
        shadowOpacity:0.26,
        shadowOffset:{width:0,height:2},
        shadowRadius:8,
        borderRadius:10,
        backgroundColor:'white',
        width:'100%'
        
    },
    summaryText:{
        fontFamily:'open-sans-bold',
        fontSize:18
    },
    amount:{
        color: Colors.primary
    }
});
export default CartScreen;