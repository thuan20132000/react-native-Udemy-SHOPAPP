import React,{useState, useEffect,useReducer} from 'react';
import {View,Text,StyleSheet,TextInput,ScrollView, Alert,ActivityIndicator} from 'react-native';
import CustomButton from '../UI/HeaderButton';
import { useSelector,useDispatch } from 'react-redux';

import * as productsAction from '../../store/actions/products';
import Colors from '../../constants/Colors';
// const REDUCER_UPDATE = 'UPDATE';
// const fromReducer = (state,action) =>{
//     if(action.type === 'UPDATE'){

//     }
// }

const EditProductScreen = (props) =>{
    const prodId = props.route.params?.productId;
    const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId));
    const dispatch = useDispatch();
    const [title,setTitle] = useState(editedProduct ? editedProduct.title : '');
    const [imageUrl,setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '');
    const [price,setPrice] = useState(editedProduct ? editedProduct.price : '');
    const [description,setDescription] = useState(editedProduct? editedProduct.description : '');
   
    const [titleIsValid,setTitleIsValid] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
    const [error,setError] = useState();
    



    useEffect(()=>{
        if(error){
            Alert.alert("An error  occured",error,[
                {text:'Okay'}
            ]);
        }
    },[error]);

    const submitHandler = async ()=>{
        if(!title){
            Alert.alert('Wrong input', 'please check the errors in the form',[
                {text:'Okay'}
            ]);
            return;
        }

        setError(null),
        setIsLoading(true);
        try {
            if(editedProduct){
                await dispatch(productsAction.updateProduct(prodId,title,description,imageUrl,price))
            }else{
                await dispatch(productsAction.createProduct(title,description,imageUrl,price))
            }
            props.navigation.goBack();
        } catch (err) {
            setError(err.message);
        }
       

       setIsLoading(false);
    }
    const titleChangeHandler = (text) =>{
        if(text.trim().length === 0){
            setTitleIsValid(false);
        }else{
            setTitleIsValid(true);
        }
        setTitle(text);
    };

    if(isLoading){
        return (
            <View>
                <ActivityIndicator
                    size="large"
                    color={Colors.primary}
                />
            </View>
        )
    }


    props.navigation.setOptions({
       title:props.route.params?.productId?'Edit Product' : 'Add Product',
       headerRight:()=>(
        <CustomButton
            iconName="ios-save"
            size={26}
            name="save"
            onPress={submitHandler}
        />
       )
    });
    return(

        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>The Title </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={titleChangeHandler}
                        value={title}
                        keyboardType='default'
                        autoCapitalize='sentences'
                        returnKeyType='next'
                        onEndEditing = {()=>console.log(title.trim())}
                        onSubmitEditing={()=>console.log('submit')}
                    />
                    {!titleIsValid && <Text>Please enter a valid title!</Text> }
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setImageUrl(text)}
                        value={imageUrl}
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Price </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setPrice(text)}
                        value={price}
                        keyboardType="numeric"

                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Descriptions </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setDescription(text)}
                        value={description}
                    />
                </View>
            </View>
        </ScrollView>
       
    )
};
export default EditProductScreen;
const styles = StyleSheet.create({
    form:{
        margin:20
    },
    formControl:{
       width:'100%'
    },
    label:{
        fontFamily:'open-sans-bold',
        marginVertical:8
    },
    input:{
        paddingHorizontal:2,
        paddingVertical:5,
        borderBottomColor:'#ccc',
        borderBottomWidth:1
    }

});
