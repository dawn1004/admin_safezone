import { LinearGradient } from 'expo-linear-gradient';
import React from 'react'
import { Alert, Dimensions, View, Text, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity, TouchableOpacityBase } from 'react-native';
import {Icon, Input, ListItem, Button} from 'react-native-elements'
const {useState, useEffect} = React
import firebase from 'firebase'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Burn({ route, navigation }) {
    const {name, tips, id} = route.params
    const [toggleForm, setToggleForm] = useState(false)
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [titleError, setTittleError] = useState("")
    const [bodyError, setBoddyError] = useState("")

    const [theTips, setTips] = useState(()=>{
      if(tips!=undefined){
        return(tips)
      }else{
        return([])
      }
    })

    const firstAidRef = firebase.database().ref("/firstAid");


    const actualDelete = (index)=>{
      let newTips = [] 

      theTips.forEach((tip, i)=>{
        if(i != index){
          newTips.push(tip)
        }
      })
      setTips(newTips)
      console.log(theTips)

      firstAidRef.child(id).update({name, tips: newTips})
    }

    const deleteTip = (index)=>{
      Alert.alert(
        'Confirm',
        'Are you sure you want to delete it?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          },
          { 
            text: 'Delete', onPress: () => { actualDelete(index) } 
          }
        ],
        { cancelable: false }
      );
    }

    const addTip = ()=>{
      let encounteredError = false
      setTittleError('')
      setBoddyError('')

      if(title==""){
        setTittleError('Required')
        encounteredError=true
      }
      if(body==""){
        setBoddyError('Required')
        encounteredError=true
      }
      if(encounteredError){
        return
      }

      setTips(oldVal=>{
        firstAidRef.child(id).update({name, tips: oldVal.concat([{body,title}])})
        return(oldVal.concat([{body,title}]))
      })
      setTitle("")
      setBody("")
      setToggleForm(false)
      
      console.log("work")
    }


    return (

      <LinearGradient
      colors={['#fef9f9', '#f9cbcb']}
      style={{width: windowWidth, height: windowHeight}}
      start={{x: 0, y:0.5}}
      end={{x: 0.5, y: 0.7}}
      >  
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ScrollView>
              <View style={styles.container}>     

                {
                  theTips.map((tip, index)=>(
                    <ListItem 
                    key={index}  
                    style={{width:"100%", paddingLeft: 20, paddingRight: 20,}}
                    containerStyle={{backgroundColor: "transparent"}}
                    >
                        
                        <ListItem.Content style={{flexDirection: "row", justifyContent: "space-between", }}>
                          <Icon name="circle" color="#fe5252"  size={10} style={{marginTop: 5}} />

                          <View style={{width: "88%", maxWidth: 240}}>
                            <Text style={{fontWeight: "bold", color: "#707070", fontSize:16}}>
                              {tip.title+". "}
                              <Text style={{fontWeight: "normal", color: "grey", fontSize:16}}>
                                {tip.body} 
                              </Text>
                            </Text>
                          </View>


                          <View>
                            <TouchableOpacity>
                              <Icon
                                reverse
                                name='trash-outline'
                                type='ionicon'
                                color='white'
                                iconStyle={{color:"red"}}
                                size={20}
                                onPress={()=>{deleteTip(index)}}
                              />                           
                            </TouchableOpacity>
                        
                          </View>
                        </ListItem.Content>
                    </ListItem>

                  ))
                }
                <View style={styles.form}>
                  <TouchableOpacity
                  onPress={()=>{setToggleForm(oldVal=>!oldVal)}}
                  >
                    <Icon
                    reverse
                    name={toggleForm?'close-outline':'add-outline'}
                    type='ionicon'
                    color={toggleForm? 'red' : '#28a745'}
                    size={16}
                    />
                  </TouchableOpacity>

                  {
                    toggleForm?
                    (<View
                     style={{backgroundColor: "white", width: "100%", paddingHorizontal: 20, paddingVertical: 15, borderRadius: 10}}
                     >
                        <Input
                        placeholder='Title'
                        onChangeText={(text)=>setTitle(text)}
                        defaultValue={title}
                        errorStyle={{ color: 'red' }}
                        errorMessage={titleError}
                        />
                        <Input
                        placeholder='Body'
                        onChangeText={(text)=>setBody(text)}
                        defaultValue={body}
                        errorStyle={{ color: 'red' }}
                        errorMessage={bodyError}
                        />
                        <Button 
                        title="Add"
                        buttonStyle={{backgroundColor:"#28a745" }}
                        onPress={addTip}
                        />
                    </View>):
                    (<></>)
                  }
                </View>
              </View>
              
            </ScrollView>

        </SafeAreaView>
        </LinearGradient>

    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
        marginBottom: 300,
        minWidth: 300
        
    },
    form:{
      // flexDirection: "row",
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 60,
      width: 300

    }
  })