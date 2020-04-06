import React from 'react';
import {FlatList,Button, Alert,View,Text} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import Colors from '../../constants/Colors';
import CustomButton from '../UI/HeaderButton';

import * as productsAction from '../../store/actions/products';



const UserProductsScreen  = props =>{
    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    const deleteHandler = (prodId) =>{
        Alert.alert('Are you sure?','Do you really want to delete this item?',[
            {text:'No',style:'default'},
            {text:'Yes',style:'destructive',onPress:()=>{
                dispatch(productsAction.deleteProduct(prodId))
            }}
        ]);
    }

   
    
    props.navigation.setOptions({
        headerStyle:{
            backgroundColor:Colors.primary
        },
        headerTitle:"Your Product",
        headerLeft:()=>(
            <CustomButton
                iconName="ios-menu"
                size={26}
                onPress={()=>{
                    props.navigation.toggleDrawer();
                }}
            />
        ),
        headerRight:()=>(
            <CustomButton
                iconName="ios-create"
                size={26}
                onPress={()=>{
                    props.navigation.navigate('editProductScreen');
                }}
            />
        )
    });


    if(userProducts.length === 0){
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text>No product found, create some product?</Text>
            </View>
        )
    }
    return(
        <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData =>(
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    
                    onSelect={()=>props.navigation.navigate('detailScreen',{productId:itemData.item.id})}
                    
                >
                    <Button
                        title="Edit"
                        color="white"
                        onPress={()=>{
                            props.navigation.navigate('editProductScreen',{productId:itemData.item.id})
                        }}
                    />
                    <Button
                        title="Delete"
                        color="white"
                        onPress={deleteHandler.bind(this,itemData.item.id)}
                    />

                </ProductItem>
            )}
        />
    )
}

export default UserProductsScreen;