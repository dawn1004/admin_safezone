import * as React from 'react';
const {useState} = React;
import {  View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, Image, Icon, Button } from 'react-native-elements';
import Tips from '../../components/Tips'
import Bottom from '../../components/bottom'

export default function Earthquake({ navigation }) {

    const [info, setInfo] = useState({
      title: "SAFETY TIPS DURING A EARTHQUAKE",
      listTodo:[
        "Drop and look for cover",
        "Cover under a steady surface",
        "Hold onto it until shaking stops",
        "Evacuate to an open area",
        "Be cautious of the aftershocks",
        "Go to the nearest evacuation area",
        'If outside, stay away from buildings, walls, and power poles',
        'Check for injuries and damages'
      ],
      imgURL: "walapa"
    })

    return (
      <SafeAreaView>
        <ScrollView>
          <Tips info={info}/>
          <Bottom logo={{ url: require("../../assets/earthquake.png") }} />
        </ScrollView>
      </SafeAreaView>

    );
  }

const styles = StyleSheet.create({ 
})