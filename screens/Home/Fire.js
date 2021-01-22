import * as React from 'react';
const {useState} = React;
import {  View, Text, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, Image, Icon, Button } from 'react-native-elements';
import Tips from '../../components/Tips'
import Bottom from '../../components/bottom'


export default function Fire({ navigation }) {

    const [info, setInfo] = useState({
      title: "SAFETY TIPS DURING A FIRE",
      listTodo:["Don't panic", "Stop working immediately", "Alert other people nearby",
        "Know your way out", "Stay low and cover your nose with a wet fabric",
        "Leave immediately", "Call for help if you cannot get out", "Go to the nearest evacuation center"  
      ],
      imgURL: "walapa"
    })

    return (
      <SafeAreaView>
        <ScrollView>
          <Tips info={info}/>
          <Bottom logo={{ url: require("../../assets/fire.png") }}/>
        </ScrollView>
      </SafeAreaView>

    );
  }

const styles = StyleSheet.create({ 
})