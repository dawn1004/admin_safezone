import React from 'react'
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'
import { Avatar, Image, Icon, Button } from 'react-native-elements';
import { BackHandler, View, Text, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import {Container, Header, Footer, Content, Right, Left, Thumbnail, ListItem} from 'native-base'

export default function Sidebar({...props}){
    return (
    <Container>
        <Header
        style={{
            backgroundColor: "#fe5151", 
            borderBottomWidth: 0,
            height: 130,
        }}
        >
            <Left>
                <Image
                source={require("../assets/safeZoneLogo.png")}
                style={{ width: 115, height: 115, }}
                resizeMode='cover'
                />
            </Left>
            
            <Right>
                <Button
                  onPress={() => {props.navigation.closeDrawer()}}
                  color="#fff"
                  buttonStyle={{backgroundColor: "transparent"}}
                  icon={{
                    name: "close",
                    size: 30,
                    color: "white"
                  }}
                />
            </Right>

        </Header>
        <Content>
            {/* <ListItem thumbnail style=>
                  <View>

                  </View>
            </ListItem> */}
            <DrawerContentScrollView {...props}>
                <DrawerItem label="">
                </DrawerItem>

                <DrawerItemList {...props} />
                <DrawerItem label="Exit" 
                onPress={()=>{BackHandler.exitApp()}}
                icon={(color, size)=>(
                    <Icon name="login" style={{fontSize: size, color: color}}/>
                )}>

                </DrawerItem>
            </DrawerContentScrollView>  
        </Content>
    </Container>

    )
}