import React, {useEffect, useState} from 'react'
import {View, StyleSheet,Dimensions, Alert } from 'react-native'
import { Text, Button, Input, ListItem } from 'react-native-elements'
import * as firebase from 'firebase'
import Textarea from 'react-native-textarea'
import { LinearGradient } from 'expo-linear-gradient'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function AddNotiTemplate() {
    const [title, setTitle] = useState("")
    const [message, setMessage] = useState("")
    const [templates, setTemplates] = useState([])


    useEffect(()=>{
        const templatesRefs = firebase.database().ref("/templates");
 
        templatesRefs.on('value', function(snapshot) {
           let templateList = [];
           let Templates = snapshot.val()
 
           for(id in Templates){
             templateList.push({id,...Templates[id]})
           }
 
           setTemplates(templateList)
           
       });
 
     },[])


    const addTemplateHandler = ()=>{
        if(title==""){
            alert("Title must not be empty")
            return
        }
        const templatesRefs = firebase.database().ref("/templates");

        templatesRefs.push({
            title,
            message
        }, ()=>{alert("Template successfully created")})

        setTitle("")
        setMessage("")   
    }

    const deleteTemplete = (id)=>{
        Alert.alert(
            'Confirm',
            'Are you sure you want to delete this template?',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
              },
              { text: 'Delete', onPress: () => {
                    const templatesRefs = firebase.database().ref("/templates");
                    templatesRefs.child(id).remove() 
              } }
            ],
            { cancelable: false }
          );
    }

    return (

        
        <ScrollView>
            <LinearGradient
            colors={['white', 'white']}
            style={styles.background}
            start={{x: 0, y:0.5}}
            end={{x: 0.5, y: 0.7}}
            >  
            </LinearGradient>

            <Text h4 h4Style={{marginLeft: 20, marginVertical: 25,}}>Templates List</Text>
            {templates.map((template)=>(
            <ListItem  
            containerStyle={{paddingHorizontal: 30}}
            key={template.id} bottomDivider>
                <ListItem.Content>
                    <ListItem.Title >
                        {template.title}
                    </ListItem.Title>
                    <ListItem.Subtitle>
                        {template.message}
                    </ListItem.Subtitle>
                </ListItem.Content>
                <TouchableOpacity onPress={()=>{deleteTemplete(template.id)}}>
                    <ListItem.Chevron  
                    name="delete" size={30} color="#de3e44" />                    
                </TouchableOpacity>

            </ListItem>
            ))}


            <View style={styles.container}>
            <Text h4 h4Style={{marginLeft:10, marginBottom: 20 }}>Create Template</Text>

                <Input 
                leftIcon={{ type: 'font-awesome', name: 'bell', color: "grey" }}
                placeholder="Notification title"
                label="Title"
                containerStyle={styles.textField}
                defaultValue={title}
                onChangeText={(text)=>{setTitle(text)}}
                />

                <Textarea
                containerStyle={styles.textareaContainer}
                style={styles.textarea}
                onChangeText={(text)=>{setMessage(text)}}
                defaultValue={message}
                minWidth="100%"
                placeholder={'Write your announcement...'}
                placeholderTextColor={'#c7c7c7'}
                underlineColorAndroid={'transparent'}
                />

                <Button 
                title="Add"
                onPress={addTemplateHandler}
                containerStyle={{alignSelf: 'stretch'}}
                />
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    background:{
        width: windowWidth, 
        height: "100%",
        position: "absolute",
    },
    container:{
        flex: 1,
        marginTop: 50,
        paddingHorizontal: 30,
        minHeight: windowHeight
    },  
    textareaContainer: {
        height: 180,
        padding: 12,
        backgroundColor: '#F5FCFF',
        borderColor: 'grey',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15
    },
    textarea: {
        textAlignVertical: 'top',  // hack android
        height: 170,
        fontSize: 16,
        color: '#333',
    },
})
