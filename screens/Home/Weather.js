import { LinearGradient } from 'expo-linear-gradient';
import * as React from 'react';
const {useState, useEffect} = React
import { Button, View, Text, SafeAreaView, Dimensions, StyleSheet, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment'
import { Icon } from 'react-native-elements';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Weather({ navigation }) {

    const [weatherData, setWeatherData] = useState({
      weather: [{main:""}],
      main: {temp: 0}
    })
    const [date, setDate] = useState("")
    const [day, setDay] = useState("")
    const [iconWeather, setIconWeather] = useState("partly-sunny")

    const [locations, setLocations]= useState(["Guiguinto", "Meycauayan", "Hagonoy", "Paombong", "Calumpit", "Plaridel"])

    useEffect(()=>{
      setDate(moment().format("MMM Do YYYY"))
      setDay(moment().format('dddd'))

      fetch('https://api.openweathermap.org/data/2.5/weather?q=malolos&units=metric&appid=2186b8f1a0353edc7f8c6e97f111185f',
      {
        method: "GET",
        headers: {"Content-type": "application/json"}
      })
      .then(response => response.json())
      .then(data => {
        setWeatherData(data)
        
        switch(weatherData.weather[0].main){
          case 'Clouds':
            setIconWeather("cloud")
            break;
          case 'Clear':
            setIconWeather("sunny")
            break;
          case 'Thunderstorm':
            setIconWeather("thunderstorm")
            break;
          case 'Rain':
          case 'Rains':
            setIconWeather("rainy")
            break;
          default:
            setIconWeather("partly-sunny")

        }

      })
      .catch(function(error) {
        console.log(error);
      });

    },[])
  
    return (
      <LinearGradient
      colors={['#ff4f4f', '#fc6060']}
      style={{width: windowWidth, height: windowHeight}}
      start={{x: 0, y:0.3}}
      end={{x: 0.5, y: 0.7}}
      >  
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ScrollView style={{width: windowWidth}}> 
            <View style={styles.container}>
              <Text style={styles.location}>Malolos, Bulacan</Text>
              

              <View style={styles.midDetails}>
                <Text style={styles.temp}>{Math.round(weatherData.main.temp)}°C</Text>
                <View style={{alignItems: "center"}}>
                  
                  <Icon
                    reverse
                    name={iconWeather}
                    type='ionicon'
                    color='#d8363d'
                    size={22}
                  />
                  <Text style={{color: "white"}}>
                  {weatherData.weather[0].main}
                  </Text>
                </View>
              </View>

              <View style={{alignItems: "center", backgroundColor: "white", paddingVertical:6, paddingHorizontal: 35, borderRadius: 25}}>
                  <Text style={{color:"white", fontSize: 18,color: '#fc5f5f'}}>
                    Today: {day}
                  </Text>
                  <Text style={{color:"white", color: '#fc5f5f'}}> {date}</Text>
              </View>
            </View>

            {
              locations.map((loc, index)=>(
                <View style={styles.container2} key={index}>
                  <Text style={styles.temp2}>{Math.round(weatherData.main.temp)}°C</Text>

                  <View style={{alignItems: "center"}}>
                    <Text style={{fontSize: 16, color: "#767676"}}>
                      {loc}
                    </Text>
                    <Text style={styles.date2}>
                      {date}
                    </Text>
                  </View>

                  <View style={{alignItems: "center"}}>
                    <Icon
                    reverse
                    name={iconWeather}
                    type='ionicon'
                    color='#fb6363'
                    size={14}
                    />
                    <Text style={{color: "grey", fontSize: 12}}>
                    {weatherData.weather[0].main}
                    </Text>
                  </View>


                </View>                
              ))
            }
            <View style={{height: 150}}></View>

          </ScrollView>

        </SafeAreaView>
      </LinearGradient>
    );
}

const styles = StyleSheet.create({
  container:{ 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginHorizontal: 25,
    backgroundColor: "#fb8282",
    borderRadius: 20,
    marginTop: 20, 
  },
  container2:{
    // flex: 1,
    marginHorizontal: 25,
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-around',
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: "white",
    borderRadius: 15,
    marginTop: 10,
  },
  location:{
    fontSize: 18,
    color: 'white',
    fontStyle: "italic",
    padding: 10
  },
  temp:{
    fontSize: 80,
    color: 'white',
    fontWeight: "bold",

  },
  temp2:{
    fontSize: 35,
    color: '#fb6363',
    fontWeight: "bold",
  },
  midDetails:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: 280,
    // backgroundColor: "red"
  },
  date2: {
    borderColor: "rgba(196, 196, 196, 0.70)",
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
    color: "#ff6275",
    paddingVertical: 7
  }
})