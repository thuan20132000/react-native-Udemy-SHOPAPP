import React from 'react';
import { Text,View,Image,Button,StyleSheet } from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart';
import CustomButton from '../UI/HeaderButton';


const ProductDetaiScreen = props =>{
    const {productId} = props.route.params;
    const selectedProduct = useSelector(state =>
        state.products.availableProducts.find(product =>product.id === productId)
        );

        const counter = useSelector(state => state.cart.items);
    
        let i =0;
        for (let [key, value] of Object.entries(counter)) {
            console.log(`${key}: ${value}`);
            i++;
           
        }
       

    props.navigation.setOptions({
        title:selectedProduct.title,
        headerStyle:{backgroundColor:Colors.primary},
        headerBackTitleStyle:{
            color:'white'
        },
        headerBackTitle:'All Products ',
        headerRight:()=>(
            <CustomButton
                iconName="ios-cart"
                size={26}
                productQuantity={i}
                onPress={()=>{
                    props.navigation.navigate('cartScreen')
                }}
            />
        )
    })
    const dispatch = useDispatch();
    return(
        <ScrollView>
            <Image
                style={styles.image} 
                source={{uri:selectedProduct.imageUrl}}
            />
            <View style={styles.actions}>
                <Button
                    title="Add to Cart"
                    onPress={()=>{
                        dispatch(cartActions.addToCart(selectedProduct))
                        
                    }}
                    color='white'
                />
            </View>
           
            <Text style={styles.price}>${selectedProduct.price}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    )
}

export default ProductDetaiScreen
const styles = StyleSheet.create({
        image:{
            width:'100%',
            height:300
        },
        price:{
            fontSize:20,
            color:'#888',
            textAlign:'center',
            marginVertical:20,
            fontFamily:'open-sans-bold'
        },
        description:{
            fontSize:14,
            textAlign:'center',
            fontFamily:'open-sans'
        },
        actions:{
            backgroundColor:Colors.primary,
            marginVertical:10,
            justifyContent:'center',
            alignSelf:'center',
            borderRadius:10,
            padding:6
        }
})