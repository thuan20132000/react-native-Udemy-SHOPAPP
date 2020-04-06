import React from 'react';
import {View,Text,Image,StyleSheet,Button,TouchableOpacity} from 'react-native';
import Colors from '../../constants/Colors';

const ProductItem = props =>{
    return(
        <TouchableOpacity
            onPress={props.onSelect}
        >
            <View style={styles.product}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{uri:props.image}} />
                </View>
                <View style={styles.detail}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.price}>${props.price}</Text>
                </View>
                <View style={styles.action}>
                    {props.children}
                    {/* {console.log(props.children)} */}
                </View>
            </View>
        </TouchableOpacity>
    )
}
export default ProductItem;
const styles = StyleSheet.create({
    product:{
        shadowColor:'black',
        shadowOpacity:0.26,
        shadowOffset:{width:0,height:2},
        shadowRadius:8,
        backgroundColor:'white',
        height:300,
        margin:20,
        overflow:'hidden',
        borderRadius:10

    },
    imageContainer:{
        height:'60%',
        width:'100%',
       
    },
    image:{
        width:'100%',
        height:'100%'
    },
    detail:{
        alignItems:'center',
        height:'15%',
        marginVertical:6,

    },
    title:{
        fontSize:18,
        marginVertical:4,
        fontFamily:'open-sans-bold'
    },
    price:{
        fontSize:14,
        color:'#888'
    },
    action:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:Colors.primary,
        justifyContent:'space-around',
        height:'25%'
    }
});

