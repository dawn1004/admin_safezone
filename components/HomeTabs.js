import * as React from 'react';
import { Button, View, Text } from 'react-native';


export default function HomeTabs(props,{ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title={props.title} />
      </View>
    );
  }