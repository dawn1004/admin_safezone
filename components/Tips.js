import React from 'react'
import { Avatar, Image, Icon, Button, ListItem } from 'react-native-elements';
import {  View, Text, SafeAreaView, StyleSheet, Dimensions  } from 'react-native';
// import {  } from 'native-base';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Tips({info}) {

    return (   
        <View style={styles.container}>
            <View style={styles.headings}>
            <Text style={{color: 'white', fontSize: 16}}>
                {info.title}
            </Text>
            </View>
            {
                info.listTodo.map((todo, index)=>
                    (<ListItem key={index}  
                    style={{width:290 }}>
                        <Icon name="circle" color="#fe5252"  size={12} />
                        <ListItem.Content>
                        <ListItem.Title >
                            <Text style={{fontSize: 16, color: "grey"}}>
                                {todo}
                            </Text>
                        </ListItem.Title>
                        </ListItem.Content>
                    </ListItem>)
                )
            }
        </View>
    )
}


const styles = StyleSheet.create({ 
    headings: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center',
      marginBottom: 20,
      backgroundColor: "#fe5252",
      color: "white",
      width: 310,
      padding: 16,
      borderRadius: 25
    },
    container:{
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center',
    }
  })