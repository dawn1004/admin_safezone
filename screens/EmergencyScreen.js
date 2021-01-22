import * as React from 'react';
import { Dimensions, View, Text, SafeAreaView, StyleSheet, Alert } from 'react-native';
const {useState, useEffect, useContext} = React
import { Icon, Button, Image, Input } from 'react-native-elements';

import { createStackNavigator } from '@react-navigation/stack';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import * as firebase from 'firebase'
import { TouchableOpacityBase } from 'react-native';
import { Modal } from 'react-native';


const Stack = createStackNavigator();


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ModalContext = React.createContext()

export default function Emergency({ navigation }) {
  const [modalOpen, setModalOpen] = useState(false)

    return (
      <ModalContext.Provider value={{modalOpen, setModalOpen}}>
        <Stack.Navigator>
          <Stack.Screen 
          name="Emergency" 
          component={EmergencyStack} 
          options={{ 
              title: 'Emergency Hotlines',
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
              headerRight: () => (
                <Button
                onPress={() => {setModalOpen(true)}}
                color="#fff"
                buttonStyle={{backgroundColor: "transparent"}}
                icon={{
                  name: "add",
                  size: 30,
                  color: "grey"
                }}
              />
            ),
          }}
          />
        </Stack.Navigator>
      </ModalContext.Provider>
    );
  }

function EmergencyStack({ navigation }) {
    let contactsRef = firebase.database().ref("/contacts")
    const [contacts, setContacts] =useState([])
    const {modalOpen, setModalOpen} = useContext(ModalContext)
    const [contactName, setContactName] = useState("")
    const [contactNum, setContactNum] = useState("")
    const [numberError, setNumberError]= useState("")
    const [nameError, setNameError]= useState("")


    useEffect(() => {
      getContacts()
    }, [])


    const getContacts = ()=>{
      contactsRef.once('value', function(snapshot) {
        const contactsObject = snapshot.val()
        let contactsList = [];
  
        for(let id in contactsObject){
          contactsList.push({ id, ...contactsObject[id]})
        }
        setContacts(contactsList)
        console.log(contacts)
      });
    }

    const deleteContact = (id)=>{
      Alert.alert(
        'Confirm',
        'Are you sure you want to delete it?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          },
          { text: 'Delete', onPress: () => {
            contactsRef.child(id).remove() 
            getContacts()
          } }
        ],
        { cancelable: false }
      );
    }
    
    const addContact = ()=>{
      let encounteredError = false
      setNumberError('')
      setNameError('')

      if(contactNum==""){
        setNumberError('Required')
        encounteredError=true
      }
      if(contactName==""){
        setNameError('Required')
        encounteredError=true
      }
      if(encounteredError){
        return
      }
      
      contactsRef.push({contact: contactNum, name: contactName}, error=>{
        console.log(error)
        if(error){
          alert(error)
        }
      })
      getContacts()
      setModalOpen(false)
      setContactName("")
      setContactNum("")
    }



    return (
      <LinearGradient
      colors={['#ff4950', '#fa6869']}
      style={{width: windowWidth, height: windowHeight}}
      start={{x: 0, y:0.5}}
      end={{x: 0.5, y: 0.7}}
      >  
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ScrollView>

          <Modal
          animationType="slide"
          transparent={true}
          visible={modalOpen}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
          >
            
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor: 'white'}}>
              <Text style={{color: "grey", fontSize: 26, marginBottom: 30}}>ADD CONTACT</Text>

              <View>
                <Input
                placeholder='Contact name'
                style={{width: 200}}
                containerStyle={{width: 230}}
                onChangeText={(text)=>setContactName(text)}
                defaultValue={contactName}
                errorStyle={{ color: 'red' }}
                errorMessage={nameError}
                leftIcon={{ type: 'ionicons', name: 'person-add' }}
                />
                <Input
                placeholder='Contact number'
                style={{width: 200}}
                containerStyle={{width: 230}}
                onChangeText={(text)=>setContactNum(text)}
                defaultValue={contactNum}
                errorStyle={{ color: 'red' }}
                errorMessage={numberError}
                leftIcon={{ type: 'ionicons', name: 'call' }}
                />

                <View style={{flexDirection: "row"}}>
                  <Button title="Add" buttonStyle={{backgroundColor: "#28a745", paddingHorizontal: 20, paddingVertical: 8}}
                  onPress={addContact}
                  />
                  <Button title="Cancel" buttonStyle={{backgroundColor: "#dc3545", marginLeft: 10, paddingHorizontal: 20, paddingVertical: 8}} 
                  onPress={()=>{setModalOpen(false)}}
                  />
                </View>
              </View> 

            </View>
          </Modal>


            <View style={{width: windowWidth, alignItems: 'center'}}>
              {
                contacts.map(contact=>(
                  <View style={styles.cardu} key={contact.id}>
                    <View style={{marginLeft: 50, maxWidth: 190}}>
                      <Text style={{...styles.defaulText, fontWeight: "bold",}}>{contact.name}: </Text>
                      <Text style={styles.defaulText}>{contact.contact}</Text>
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
                          onPress={()=>{deleteContact(contact.id)}}
                        />                           
                      </TouchableOpacity>
                   
                    </View>
                  </View>
                ))
              }
            </View>
          </ScrollView>
          <Image 
          source={require('../assets/whiteBottom.png')}
          style={{width: windowWidth, height: 200,}}
          />
        </SafeAreaView>
      </LinearGradient>
    );
}


const styles = StyleSheet.create({
  cardu:{
    flexDirection: 'row',
    position: "relative",
    justifyContent: "space-between",
    backgroundColor: "#fd8585",
    width: 300,
    paddingVertical: 10,
    borderRadius: 40,
    marginTop: 20
  },
  defaulText:{
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  }
})