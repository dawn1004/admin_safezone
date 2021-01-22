import * as React from 'react';
import { TouchableOpacity, Dimensions, View, Text, SafeAreaView, StyleSheet, ScrollViewBase } from 'react-native';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import { ScrollView } from 'react-native-gesture-handler';
import { Icon, Image, Button } from 'react-native-elements';
const {useState, useEffect} = React
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as firebase from 'firebase'
import 'firebase/storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Emergency({ navigation }) {
    const [image, setImage] = useState(null);
    const [realImage, setRealImage] = useState(null)
    let imageLocRef = firebase.database().ref("/imageloc")
    const [uploadingValue, setUploadingValue] = useState(0)
    const [onUpload, setOnUpload] = useState(false)

    useEffect(() => {
      imageLocRef.once('value', function(snapshot) {
        const imageObject = snapshot.val()
        for(let id in imageObject){
          setImage(null)
          setRealImage(imageObject[id].url)
        }
      });

      (async () => {
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      })();
    }, []);

    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        aspect: [4, 3],
        quality: 1,
      });

      console.log(result);

      if (!result.cancelled) {
        setImage(result.uri);
        // handleUpload(result.uri)
      }
    };


    const handleUpload = async()=>{
      setOnUpload(true)
      console.log("uploadAsFile", image)
      const response = await fetch(image);
      const blob = await response.blob();

      var metadata = {
        contentType: 'image/jpeg',
      };

      let name = "bulsumap"
      const ref = firebase
        .storage()
        .ref()
        .child('assets/' + name)
    
      const task = ref.put(blob, metadata);

      return new Promise((resolve, reject) => {
        task.on(
          'state_changed',
          (snapshot) => {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            setUploadingValue(progress)
          },
          (error) => reject(error), /* this is where you would put an error callback! */
          () => {
            firebase.storage()
            .ref("assets")
            .child(name)
            .getDownloadURL()
            .then(url=>{
                imageLocRef.child('-MQmC3dmnoSBEoyE0dBS').update({url}) 
                console.log(url)
                setRealImage(url)
                setImage(null)
                setOnUpload(false)
              })
          }
        );
      });

    }

    return (
      <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>


          <View style={{width: windowWidth, height: windowHeight, position: "relative"}}>
            <ReactNativeZoomableView
            maxZoom={3}
            minZoom={1}
            zoomStep={0.5}
            initialZoom={1}
            bindToBorders={true}
            captureEvent={true}
            style={{
                // backgroundColor: 'red',
            }}
            >
            {/* <Image 
            style={{width: windowWidth, height:windowWidth}}
            source={require("../../assets/Map.png")} /> */}

            {
              image==null?
              (<Image 
                style={{width: windowWidth, height:windowWidth}}
                source={{uri: realImage}} 
              />):
              (
                <View style={{position: "relative"}}>
                  { onUpload?
                    (<View style={{zIndex: 10, justifyContent: 'space-around', alignItems:'center'}}>
                    <Text style={{color: "white"}}>Uploading {uploadingValue}%...</Text>
                    </View>):
                  <View style={{zIndex: 5, flexDirection: "row", justifyContent: "space-around", position:"absolute", bottom: 20, width: "100%"}}>
                    <Button title="Upload" 
                    onPress={handleUpload}
                    />
                    <Button title="Cancel" 
                    buttonStyle={{backgroundColor: "red"}} 
                    onPress={()=>{setImage(null)}}
                    />
                  </View>
                  }
                  <View style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "black", zIndex: 3, opacity: 0.5}}></View>

                  <Image 
                  style={{width: windowWidth, height:windowWidth}}
                  source={{uri: image}} 
                  />
                </View>
              )
            }


            </ReactNativeZoomableView>
          </View> 

          <View style={styles.boxInfo}>
            <TouchableOpacity
            onPress={pickImage}
            >
              <Icon
              reverse
              name='add'
              type='ionicon'
              color="red"
              iconStyle={{color: "white"}}
              size={26}
              />
            </TouchableOpacity>
            
          </View>
      </SafeAreaView>
      
    );
}

const styles = StyleSheet.create({
  boxInfo:{
    // width: 170,
    // height: 65,
    position: "absolute",
    bottom: 20,
    right: 15,
    borderRadius: 30,
    opacity: 0.7
  }
})