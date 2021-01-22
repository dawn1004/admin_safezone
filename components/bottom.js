import React from 'react'
const {useState} = React
import {  StyleSheet, Dimensions, View, Text } from 'react-native';
import { Image } from 'react-native-elements';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Bottom({logo}) {
    // const [imgLogo, setImgLogo] = useState({url: require(logo)})
    
    return (
        <View
        style={{ width: windowWidth, minHeight: 220, position: "relative" }}
        >
            {/* <Text>{imgLogo}</Text> */}
            <Image
            source={logo.url}
            style={{ width: windowWidth, minHeight: 240 }}
            resizeMode="cover"
            />            
        </View>

    )
}
