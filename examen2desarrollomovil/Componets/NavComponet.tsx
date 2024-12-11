import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Acelerometro from '../Page/Acelerometro';
import Logs from '../Page/Logs';

export default function NavComponet() {
    const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Acelerometro">
        <Tab.Screen name="Acelerometro" component={Acelerometro}></Tab.Screen>
        <Tab.Screen name="Logs" component={Logs}></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  )
}