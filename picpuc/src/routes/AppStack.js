import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import HomeScreen from '../screen/home/Home';
import MapScreeen from '../screen/map/map';
import LoginScreen from '../screen/login/login';

const Tab = createMaterialBottomTabNavigator();
// const Stack = createNativeStackNavigator();

function AppStack() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Map" component={MapScreeen} />
      <Tab.Screen name="LoginScreen" component={LoginScreen} />
    </Tab.Navigator>
  );
}

export default AppStack;
