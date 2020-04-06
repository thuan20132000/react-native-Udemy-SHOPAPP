
import React,{useState, useEffect,AsyncStorage} from 'react';

import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Colors from '../constants/Colors';
import CustomButton from '../screens/UI/HeaderButton'
import {Ionicons} from '@expo/vector-icons';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrderScreen from '../screens/shop/OrdersScreen';
import UserScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/user/StartupScreen';


import {useSelector,useDispatch} from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text,View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import * as authActions from '../store/actions/auth';

const ProductsStack = createStackNavigator();
function OverviewStackScreen(props){
   
    return(
            <ProductsStack.Navigator
              
            >
                <ProductsStack.Screen
                    name="overviewScreen" 
                    component={ProductsOverviewScreen}
                />
                <ProductsStack.Screen
                    name="detailScreen"
                    component={ProductDetailScreen}
                />
                <ProductsStack.Screen
                    name="cartScreen"
                    component={CartScreen}
                />
               
            </ProductsStack.Navigator>
    )
}

const OrderStack = createStackNavigator();
function OrderStackScreen(props){
    return(
        <OrderStack.Navigator>
            <OrderStack.Screen name="orderScreen" component={OrderScreen} />
        </OrderStack.Navigator>
    )
}

const AdminStack = createStackNavigator();
function AdminStackScreen(props){
    return(
        <AdminStack.Navigator>
            <AdminStack.Screen name="User Screen" component={UserScreen} />
            <AdminStack.Screen name="editProductScreen" component={EditProductScreen} />
        </AdminStack.Navigator>
    )
}





const ProductDrawer = createDrawerNavigator();
function ProductDrawerScreen(props){

    const dispatch = useDispatch();
    const [isLogin,setIsLogin] = useState(false);
    const authS = useSelector(state => state.auth.token);
    useEffect(()=>{
        
        if(authS !== null){
            setIsLogin(true);
        }else{
            setIsLogin(false);
        }

        
    });

    // useEffect(()=>{
    //     const tryLogin = async ()=>{
    //         const userData = await AsyncStorage.getItem('userData');
    //         console.log(userData);
    //         if(!userData){
    //             props.navigation.navigate('auth');
    //             return;
    //         }

    //         const transformedData = JSON.parse(userData);
    //         const {token,userId,expiryDate} = transformedData;
    //         const expirationdate = new Date(expiryDate);
    //         if(expirationdate <= new Date() || !token || !userId){
    //             props.navigation.navigate('auth');
    //             return;
    //         }

    //         props.navigation.navigate('product');
    //         dispatch(authActions.authenticate(userId,token));

    //     }

    //     tryLogin();
    // },[dispatch]);

    return(
        <NavigationContainer>
           
            <ProductDrawer.Navigator
                screenOptions={{
                    contentComponent: (props)=>{
                        return (
                            <ScrollView>
                                <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
                                <DrawerItems {...props} />
                                </SafeAreaView>
                            </ScrollView>
                        )
                    }
                }}
            >
                
                {
                !isLogin ?(
                    <>
                        <ProductDrawer.Screen
                        name="auth"
                        component={AuthStackScreen}
                        options={{
                            drawerLabel:()=>(
                                <View>
                                   
                                        <Text style={{textAlign:'center',color:'red'}}>Log In</Text>
                                </View>
                            )
                        }}
                        />
                    </>
                )
                :(
                    <>
                    <ProductDrawer.Screen
                    name="Product"
                    component={OverviewStackScreen}
                    options={{
                        drawerIcon:()=>(
                            <Ionicons
                                name="ios-cart"
                                size={34}
                                color={Colors.primary}
                            />
                        )
                           
                        
                    }}
                    />
                    <ProductDrawer.Screen
                    name="Order"
                    component={OrderStackScreen}
                    options={{
                        drawerIcon:()=>(
                            <Ionicons
                                name="ios-list"
                                size={34}
                                color={Colors.primary}
                            />
                        )
                    }}
                />
                <ProductDrawer.Screen
                    name="Admin"
                    component={AdminStackScreen}
                    options={{
                        drawerIcon:()=>(
                            <Ionicons
                                name="ios-people"
                                size={34}
                                color={Colors.primary}
                            />
                        )
                    }}
                />
                <ProductDrawer.Screen
                    name="Logout"
                    component={AdminStackScreen}
                    options={{
                        
                        drawerLabel:()=>(

                                <View style={{flex:1}}>
                                    <SafeAreaView forceInset={{horizontal:'never'}}>
                                    <TouchableOpacity onPress={()=>{
                                        dispatch(authActions.logout());
                                    }}
                                        style={{margin:10,backgroundColor:'red',width:200,textAlign:'center',padding:16,justifyContent:'center',display:'flex'}}
                                    >
                                        <View style={{}}>
                                        <Text style={{textAlign:'center'}}>Log Out</Text>

                                        </View>
                                    </TouchableOpacity>
                                    </SafeAreaView>

                                </View>
                                
                        ),
                    
                        
                        
                    }}
                    
                   
                    
                    
                />
                
                
                    </>
                )
                
            }


                
            </ProductDrawer.Navigator>
        </NavigationContainer>
    )
}


const AuthStack = createStackNavigator();

function AuthStackScreen(){
    return(
       <AuthStack.Navigator>
           <AuthStack.Screen name="authScreen" component={AuthScreen} />
       </AuthStack.Navigator>
    )
}



export default ProductDrawerScreen;
