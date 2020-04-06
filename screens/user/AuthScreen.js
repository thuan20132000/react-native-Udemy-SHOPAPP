import React,{useState,useEffect} from 'react';
import {ScrollView,StyleSheet,KeyboardAvoidingView,View,Text,TextInput,Button, Alert,ActivityIndicator} from 'react-native';
import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import {useDispatch} from 'react-redux';

import * as authActions from '../../store/actions/auth';


const AuthScreen = (props) =>{
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading,setIsLoading] = useState(false);
    const [isError,setIsError] = useState('');
    const [isSignup,setIsSignup] = useState(false);
    

    const authHandler = async  () =>{

        setIsError(null);
        let action;
        if(isSignup){
            action = authActions.signup(email,password);
        }else{
            action = authActions.login(email,password);
        }

        setIsLoading(true);
        try{
            await dispatch(action);
            // console.log(props);
            // props.navigation.navigate('product');
        }catch(err){
            setIsError(err.message);
        }
        setIsLoading(false);       
    }
    

    useEffect(()=>{
        if(isError){
            Alert.alert('something was occured!!','Okay',[
                {text:isError}
            ])
        }
       
    },[isError]);
    
    return (

        <KeyboardAvoidingView style={styles.screen}>
            <LinearGradient
                colors={['#4c669f', '#3b5998', '#192f6a']}
                style={styles.gradient}
            >
                <Card style={styles.formContainer}>
                    <ScrollView>
                        <Input
                            onChangeText={text => setEmail(text)}
                            id="email"
                            value={email}
                            placeholder="Email"
                            required
                            email
                        />
                        <Input
                            onChangeText={text => setPassword(text)}
                            placeholder="Password"
                            id="password"
                            value={password}
                            secureTextEntry={true}
                        />
                        <View style={styles.buttonContainer}>
                            <View style={{backgroundColor:Colors.accent,width:'50%',alignSelf:'center',borderRadius:6}}>
                                {isLoading ? (
                                    <ActivityIndicator  />):
                                    (
                                        <Button 
                                    title={isSignup ? "Signup" : "Login"}
                                    onPress={authHandler}
                                    color={Colors.primary} 
                                        />
                                    )

                                }
                            </View>
                            
                            
                            <Button 
                                    title={`Switch to ${isSignup? 'Login' :'Signup'}`}
                                    color={Colors.primary} 
                                    onPress={()=>{
                                        setIsSignup(prevState => !prevState)
                                    }} 

                            />
                        </View>
                        
                    </ScrollView>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView>

        
      
    );
};
export default AuthScreen;
const styles = StyleSheet.create({
    screen:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },  
    formContainer:{
        width:'80%',
        maxWidth:400,
        height:'50%',
        maxHeight:400,
        marginTop:50,
        justifyContent:'center'
    },
    buttonContainer:{
        justifyContent:'space-around',
    },
    gradient:{
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center'
    }
});
