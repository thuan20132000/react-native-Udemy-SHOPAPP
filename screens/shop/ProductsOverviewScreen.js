import React, { useEffect,useState, useCallback,AsyncStorage } from 'react';
import {FlatList,Text,View,StyleSheet, Button,ActivityIndicator} from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import CustomButton from '../UI/HeaderButton';
import * as productActions from '../../store/actions/products';

const ProductsOverviewScreen = props =>{
    props.navigation.setOptions({
        // 
        headerStyle:{
            backgroundColor:Colors.primary
        },
        headerTitle:"Over View Screen",
        headerRight:()=>(
            <CustomButton
                iconName="ios-cart"
                size={26}
                productQuantity={a}
                onPress={()=>{
                    props.navigation.navigate('cartScreen')
                }}
            />
        ),
        headerLeft:()=>(
            <CustomButton
                iconName="ios-menu"
                size={26}
                onPress={()=>{
                    props.navigation.toggleDrawer();
                }}
            />
        ),
        
    })
    // End configuration Navigation Header
    
    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.availableProducts);
    const [isLoading,setIsLoading] = useState(false);
    const [error,setError] = useState();
    const [isRefreshing,setIsRefreshing] = useState(false);

    const  loadProducts = useCallback(async () =>{
               
            setError(null);
             // console.log("Sett");
            try{
                
                await dispatch(productActions.fetchProducts());
               
            }catch(err){
                setError(err.message);
            }
            setIsRefreshing(false)
    },[dispatch,setIsLoading,setError]);

               
    
    useEffect( ()=>{
        setIsLoading(true);
        loadProducts().then(()=>{
            setIsLoading(false);
        });
    },[dispatch,loadProducts]);

    useEffect(()=>{
        const unsubscribe = props.navigation.addListener('focus',loadProducts);
          return unsubscribe;
      
    },[props.navigation]);
    

    const counter = useSelector(state => state.cart.items);
    let a =0;
    for (let [key, value] of Object.entries(counter)) {
        // console.log(`${key}: ${value}`);
        a++;
       
    }
    if(error){
        return(
            <View style={{flex:1,justifyContent:'center',alignSelf:'center'}}>
                <Text>An error occurred</Text>
                <Button
                    title="Try again"
                    onPress={loadProducts}
                />
            </View>
        )
    }

    if(isLoading){
        return (
            <View style={{flex:1,justifyContent:'center'}}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }
   
    const selectItemHandler = (id)=>{
        props.navigation.navigate('detailScreen',{
            productId:id
        })
    };
   
    
    if(!isLoading && products.length === 0){
        return (
            <View style={{flex:1,justifyContent:'center',alignContent:'center',alignSelf:'center'}}>
                <Text>No Products found. Maybe start.</Text>
            </View>
        );
    }




    
    return(
        <FlatList
            onRefresh={loadProducts}
            refreshing={isRefreshing}
            data={products}  
            keyExtractor={item => item.id}
            renderItem={itemData =>
                <ProductItem 
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() =>{
                        selectItemHandler(itemData.item.id)
                    }}
                >
                    <Button
                        title="View Details"
                        color='white'
                        onPress={()=>{
                            selectItemHandler(itemData.item.id)
                        }}
                        
                    />
                    <Button
                        title="Add To Cart"
                        color='white'
                        onPress={()=>{
                            dispatch(cartActions.addToCart(itemData.item))
                        }}
                        
                    />
                </ProductItem>
            }
        />
    )
}

export default ProductsOverviewScreen;

const styles = StyleSheet.create({
    screen:{
        display:"flex",
        justifyContent:'center',
        alignItems:'center',
        height:'100%'
    }
})