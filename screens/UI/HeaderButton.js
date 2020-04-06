import React from 'react';
import {StyleSheet,Text,View,TouchableOpacity, Button,badgeCount} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';
const CustomButton = props =>{
    const badgeCount = 4;

    return(
        <TouchableOpacity style={styles.button} onPress={props.onPress}>
            <View>
                <Ionicons name={props.iconName} size={26} color={Colors.accent} />
                {props.productQuantity > 0 && (
                <View
                style={{
                    // On React Native < 0.57 overflow outside of parent will not work on Android, see https://git.io/fhLJ8
                    position: 'absolute',
                    right: -6,
                    top: -3,
                    backgroundColor: 'red',
                    borderRadius: 6,
                    width: 12,
                    height: 12,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                >
                <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                    {props.productQuantity}
                </Text>
                </View>
            )}
            </View>
        </TouchableOpacity>
    )
}

export default CustomButton;

const styles=StyleSheet.create({
    button:{
        marginHorizontal:16,
    }
})