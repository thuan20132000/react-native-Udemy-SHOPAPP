import React,{useEffect, useState} from 'react';
import {View,FlatList,Text,ActivityIndicator} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import CustomButton from '../UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';
import * as orderActions from '../../store/actions/orders';

const OrderScreen = props =>{
    const [isLoading,setIsLoading] = useState(false);
    

    const orders = useSelector(state => state.orders.orders);
    const dispatch = useDispatch();


    useEffect(()=>{
        setIsLoading(true);
        dispatch(orderActions.fetchOrders()).then(()=>{
            setIsLoading(false);
        })
    },[dispatch]);

    if(isLoading){
        return(
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <ActivityIndicator
                    size='large' color={Colors.primary}
                />
            </View>
        )
    }


    


    props.navigation.setOptions({
        headerStyle:{
            backgroundColor:Colors.primary
        },
        headerTitle:"Order Screen",
        headerLeft:()=>(
            <CustomButton
                iconName="ios-menu"
                size={26}
                onPress={()=>{
                    props.navigation.toggleDrawer();
                }}
            />
        ),
    });
    if(orders.length === 0 ){
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text>No order founf, maybe start create some?</Text>
            </View>
        )
    }
    return (
        <FlatList
            data={orders}
            keyExtractor={item=>item.id}
            renderItem={itemData =>(
                <OrderItem 
                  amount={itemData.item.totalAmount}
                  date={itemData.item.date}
                  items={itemData.item.items}
                />
            )}
        />
    )
};
export default OrderScreen;