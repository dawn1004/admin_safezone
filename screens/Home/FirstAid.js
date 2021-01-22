import * as React from 'react';
import { Dimensions, View, Text, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
const { useState, useEffect, useContext } = React
import { createStackNavigator } from '@react-navigation/stack';
import { Directions } from 'react-native-gesture-handler';
import { Icon, Button, ListItem, Image } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import * as firebase from 'firebase'


import FirstAidDescription from '../../components/FirstAidDescription'


const Stack = createStackNavigator();

  
export default function HomeScreen({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen 
      name="FirstAidScreen" 
      component={FirstAidScreen} 
      options={{ 
          title: 'First Aid Tips',
      }}
      />
      <Stack.Screen name="Cut / Scrape" component={FirstAidDescription} 
      options={{title: "Cut/Scrapes Tips",
      }}
      />
      <Stack.Screen name="Burn" component={FirstAidDescription} 
      options={{title: "Burn Tips",
      }}
      />
      <Stack.Screen name="Splinter" component={FirstAidDescription} 
      options={{title: "Splinter Tips",
      }}
      />
      <Stack.Screen name="Sunburn" component={FirstAidDescription} 
      options={{title: "Sunburn Tips",
      }}
      />
      <Stack.Screen name="Nosebleed" component={FirstAidDescription} 
      options={{title: "Nosebleed Tips",
      }}
      />
      <Stack.Screen name="Sprain" component={FirstAidDescription} 
      options={{title: "Sprain Tips",
      }}
      />
      <Stack.Screen name="Fracture" component={FirstAidDescription} 
      options={{title: "Fracture Tips",
      }}
      />
    </Stack.Navigator>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function FirstAidScreen({ navigation }) {
    const [classData, setClassData] = useState([])
    const [onChangeTip, setOnChangeTip] = useState(true)


    useEffect(()=>{
    
    var tutorialsRef = firebase.database().ref("/firstAid");
    
    tutorialsRef.on('value', function(snapshot) {
      var tutorials = [];
      const firstaids = snapshot.val()
      let firstAidList = [];

      for(let id in firstaids){
        firstAidList.push({ id, ...firstaids[id]})
      }
      setClassData(firstAidList)
    });

    },[])

    return (
        <LinearGradient
        colors={['#f99ca4', '#ff4f4f']}
        style={{width: windowWidth, height: windowHeight}}
        start={{x: 0, y:0.5}}
        end={{x: 0.5, y: 0.7}}
        >  
        <SafeAreaView 
        style={{ 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
        }}>

          {classData.length==0?
            <View  style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}> 
              <Text style={{color: "white"}}>Loading . . .</Text> 
            </View>:
            <View style={styles.container}>
              {
                classData.map((data,index)=>(
                  (
                    <Button 
                    key={index}
                    buttonStyle={{
                      backgroundColor: '#f89a9d', 
                      borderRadius: 30,
                      width: 280,
                      padding: 13,
                      marginBottom: 10,
                      elevation: 1,
                    }}
                    title={data.name} 
                    onPress={()=>{navigation.navigate(data.name, data)}}
                    />
                  )
                ))
              }
            </View>
          
          }

            <View
                style={{ width: windowWidth, minHeight: 220, position: "relative" }}
                >
                    {/* <Text>{imgLogo}</Text> */}
                    <Image
                    source={require('../../assets/FIT_BG.png')}
                    style={{ width: windowWidth, minHeight: 240 }}
                    resizeMode="cover"
                    />            
                </View>  
        </SafeAreaView>
        </LinearGradient>      

    );
  }



  const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        // flexDirection: 'row',
        // flexWrap: 'wrap',
        // justifyContent: "space-around",
        marginTop: 30
    }
  })