import * as React from 'react';
const {useState} = React;
import {  View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, Image, Icon, Button } from 'react-native-elements';
import Tips from '../../components/Tips'
import Bottom from '../../components/bottom'

export default function Typhoon({ navigation }) {

    const [info, setInfo] = useState({
      title: "SAFETY TIPS DURING A TYPHOON",
      listTodo:["Always bring umbrella and raincoat", "Wear closed shoes or bring an extra footware such as slippers", 
      "Avoid floodwater especially if you have wounds", "Stay away from power lines",
      "Keep updated on weather reports", "Keep a copy of emergency numbers",
      "Prepare a typhoon kit containing food, water, first aid kit, light source, ect"],
      imgURL: "walapa"
    })

    return (
      <SafeAreaView>
        <ScrollView>
          <Tips info={info}/>
          <Bottom logo={{ url: require("../../assets/typhoon.png") }} />
          
        </ScrollView>
      </SafeAreaView>

    );
  }

const styles = StyleSheet.create({ 
})