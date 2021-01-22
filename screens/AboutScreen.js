import * as React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
const {useState} = React
import { Icon, Button } from 'react-native-elements';


import { createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';


const Stack = createStackNavigator();


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function About({ navigation }) {
    return (
      <Stack.Navigator>
        <Stack.Screen 
        name="Emergency" 
        component={AboutStack} 
        options={{ 
            title: 'About Us',
            headerTitleAlign: 'center',
            headerLeft: () => (
              <Button
              onPress={() => {navigation.openDrawer()}}
              color="#fff"
              buttonStyle={{backgroundColor: "transparent"}}
              icon={{
                name: "menu",
                size: 30,
                color: "grey"
              }}
            />
            ),
        }}
        />
      </Stack.Navigator>
    );
  }

function AboutStack({ navigation }) {
    return (
      <LinearGradient
      colors={['#ff4950', '#fa6869']}
      style={{width: windowWidth, height: windowHeight}}
      start={{x: 0, y:0.5}}
      end={{x: 0.5, y: 0.7}}
      >  
      <ScrollView>
        <View style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40 }}>

          <Image 
          style={styles.safeLogo}
          source={require("../assets/safeZoneLogo.png")} />

          <Text style={styles.textStylu}>SafeZone is a mobile application created by</Text>

          <Image 
          style={styles.paraLogo}
          source={require("../assets/paraLogo.png")} />

          <Text style={styles.textStylu}>for</Text>

          <Image 
          style={styles.BulSU}
          source={require("../assets/BulSU.png")} />

          <Text style={styles.textStylu}>
            community, and to help in times of calamities, accident, emergency, and natural calamities. 
          </Text>

          
          </View>
        </ScrollView>
      </LinearGradient>
    );
}

const styles = StyleSheet.create({
  safeLogo: {
    width: 140,
    height: 140,
    backgroundColor: 'white',
    borderRadius: 100,
    marginTop: 25,
    marginBottom: 15,
  },
  paraLogo: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
    marginTop: 25,
    marginBottom: 15
  },
  BulSU:{
    width: 100,
    height: 100,
    marginTop: 25,
    marginBottom: 15
  },
  textStylu:{
    textAlign: "center",
    color: "white"
  }
})