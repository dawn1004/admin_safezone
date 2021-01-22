import * as React from 'react';
import { Alert, View, Text, Image, StyleSheet, Dimensions } from 'react-native';
const {useState, useEffect} = React
import { Icon, Button, Input } from 'react-native-elements';


import { createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import * as firebase from 'firebase'

const Stack = createStackNavigator();


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function About({ navigation }) {
    return (
      <Stack.Navigator>
        <Stack.Screen 
        name="Settings" 
        component={SettingStack} 
        options={{ 
            title: 'Settings & Nofications',
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

function SettingStack({ navigation }) {
    const [pinCode, setPinCode] = useState("")
    const [oldPass, setOldPass] =useState("")
    const [newPass, setNewPass] =useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [eyes1, setEyes1] = useState(true)
    const [eyes2, setEyes2] = useState(true)
    const [eyes3, setEyes3] = useState(true)

    const [oldPinError, setOldPinError] =useState("")
    const [newPinError, setNewPinError] =useState("")
    const [confirmPassError, setConfirmPassError]= useState("")

    const [title, setTitle] = useState("")
    const [message, setMessage] = useState("")
    const [titleError, setTitleError] = useState("")
    const [messageError, setMessageError] = useState("")

    const pinCodeRef = firebase.database().ref("/pincode");
    const tokenRef = firebase.database().ref("/token");

    useEffect(()=>{
        pinCodeRef.on('value', function(pin) {
            setPinCode(pin.val()["-MQgCArPCiIV_Ba5B_q5"].code)
        });

    },[])

    const validatePin = ()=>{
        setOldPinError("")
        setNewPinError("")
        setConfirmPassError("")
        let errorFound = false; 

        if(newPass.length != 4){
            console.log("tanigna")
            setNewPinError("length must be 4 characters")
            errorFound = true 
        }
        if(newPass != confirmPass){
            setConfirmPassError("Pincode not matched")
            errorFound = true 
        }
        if(oldPass != pinCode){
            setOldPinError("Incorrect pincode")
            errorFound = true 
        }
        if(errorFound){
            return
        }else{
            pinCodeRef.child("-MQgCArPCiIV_Ba5B_q5").update({code:newPass}) 
            setOldPass("")
            setNewPass("")
            setConfirmPass("")
            alert("Succesfully Update")
        }
    }


    const sendNotification =()=>{
      Alert.alert(
        'Are you sure?',
        'You wont able to revert it.',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          },
          { text: 'Send', onPress: () => {
              setTitleError("")
              setMessageError("")
              let errorEncounter = false

              if(title==""){
                setTitleError("Required") 
                errorEncounter=true
              }
              if(message==""){
                setMessageError("Required")
                errorEncounter=true
              }
              if(errorEncounter){
                return
              }

              const msg = {title, message}

              tokenRef.once('value', function(snapshot) {
                const tokenObject = snapshot.val()
                let tokenList = [];
          
                for(let id in tokenObject){
                  tokenList.push({ id, ...tokenObject[id]})
                }
                
                tokenList.forEach(token=>{
                  sendProcess(token.token, msg)
                  console.log("success sending on: "+token.token)
                })
              
              });

              setTitle("")
              setMessage("")
              alert("Successfully Sent")

          } }
        ],
        { cancelable: false }
      );

    }

    const sendProcess = async(token, msg)=>{
      const message = {
        to: token,
        sound: 'default',
        title: msg.title,
        body: msg.message,
      };
    
      await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });
    }

    return (
      <LinearGradient
      colors={['#ff4950', '#fa6869']}
      style={{width: windowWidth, height: windowHeight}}
      start={{x: 0, y:0.5}}
      end={{x: 0.5, y: 0.7}}
      >  
      <ScrollView>
        <View style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40 }}>

            <View style={styles.settingContainer}>
                <Text style={{fontSize: 24, color: "#383838", marginLeft: 10}}>
                    Change Pincode
                </Text>
                <Input
                placeholder='Old Pincode'
                leftIcon={{ type: 'ionicon', name: 'key' }}
                inputContainerStyle={{width: "100%", marginTop: 30}}
                defaultValue={oldPass}
                onChangeText={(text)=>{setOldPass(text)}}
                errorStyle={{ color: 'red' }}
                errorMessage={oldPinError}
                secureTextEntry={eyes1}
                rightIcon={
                    <Icon
                      name={eyes1? 'eye-off': 'eye'}
                      type="ionicon"
                      color='grey'
                      onPress={()=>{setEyes1(oldVal=>!oldVal)}}
                    />
                }
                />
                <Input
                placeholder='New Pincode'
                leftIcon={{ type: 'ionicon', name: 'key' }}
                inputContainerStyle={{width: "100%"}}
                defaultValue={newPass}
                onChangeText={(text)=>{setNewPass(text)}}
                errorMessage={newPinError}
                secureTextEntry={eyes2}
                rightIcon={
                    <Icon
                      name={eyes2? 'eye-off':'eye'}
                      type="ionicon"
                      color='grey'
                      onPress={()=>{setEyes2(oldVal=>!oldVal)}}
                    />
                }
                />
                <Input
                placeholder='Confirm Pincode'
                leftIcon={{ type: 'ionicon', name: 'key' }}
                inputContainerStyle={{width: "100%"}}
                defaultValue={confirmPass}
                onChangeText={(text)=>{setConfirmPass(text)}}
                errorMessage={confirmPassError}
                secureTextEntry={eyes3}
                rightIcon={
                    <Icon
                      name={eyes3? 'eye-off':'eye'}
                      type="ionicon"
                      color='grey'
                      onPress={()=>{setEyes3(oldVal=>!oldVal)}}
                    />
                }
                />

                <Button title="Submit" onPress={validatePin}/>
            </View>

          
          </View>

          {/* start of noti */}
          <View style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40, marginBottom: 350 }}>

            <View style={styles.settingContainer}>
                <Text style={{fontSize: 24, color: "#383838", marginLeft: 10}}>
                    Send Notification
                </Text>

                <Input
                placeholder='Title'
                leftIcon={{ type: 'ionicon', name: 'mail' }}
                inputContainerStyle={{width: "100%"}}
                errorMessage={titleError}
                onChangeText={(text)=>{setTitle(text)}}
                defaultValue={title}
                />
                <Input
                placeholder='Message'
                leftIcon={{ type: 'ionicon', name: 'mail' }}
                inputContainerStyle={{width: "100%"}}
                errorMessage={messageError}
                onChangeText={(text)=>{setMessage(text)}}
                defaultValue={message}
                />
                <Button title="Send" onPress={sendNotification}/>

            </View>

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
  settingContainer:{
      minWidth: 300,
      backgroundColor: "white",
      marginTop: 30,
      borderRadius: 10,
      paddingHorizontal: 15,
      paddingVertical: 20,
      
  }
})