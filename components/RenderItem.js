import * as React from 'react';
const {useState, useEffect} = React
import {  View, Text, LogBox, StyleSheet, Dimensions, Image } from 'react-native';
// import {  } from 'react-native-elements';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function RendererItem({ item }){
    return (
      <View style={styles.slide}>

        <View style={{height: windowHeight/2, justifyContent: "space-around", alignItems: "center"}}>
            <Image 
            style={{
            width: 200,
            height: 200
            }}
            source={item.illustration} />
        </View>

        <View
        style={{
        position: "relative",
        bottom: 0,
        height: windowHeight/2
        }}
        >
            <Image 
            style={{
            width: windowWidth,
            height: windowHeight/2
            }}
            source={item.background} />

            <View style={{position: "absolute", width: windowWidth, justifyContent: 'space-around', alignItems: "center", top: "30%"}}>
                <Text style={{color: "white", fontSize: 20}}>{item.title}</Text>
                <Text style={{color: "white", fontSize: 16, marginTop: 20, maxWidth: 300, textAlign: "center" }}>{item.text}</Text>
            </View>
        </View>
      </View>
    );
  }


const styles = StyleSheet.create({
slide:{
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
}
})