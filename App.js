import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, TextInput,FlatList,Button } from 'react-native';
import WeeklyCalendar from 'react-native-weekly-calendar';
import WeekView from 'react-native-week-view';
import { Calendar } from 'react-native-big-calendar'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import firebase from "./database/firebaseDB"
import calendarScreen from './screens/calendarScreen'
import addScreen from './screens/addScreen';
import addModScreen from './screens/addModScreen';
import {YellowBox} from 'react-native';

YellowBox.ignoreWarnings([
  'Non-serializable values were found in the navigation state','YellowBox has been replaced with LogBox','Unhandled promise','Possible Unhandled Promise'
]);


const Stack = createStackNavigator();

export default function App() {

  //some text that might use later --need to change name --right now it is used to determine which module gets selected
  const [text, setText] = useState("");
  //some array that might use later --need to change name --right now it is an array that stores and displays all the classes of the selected module
  const [something, setSomething] = useState([]);

  return (
    <NavigationContainer>
      <Stack.Navigator mode="modal" headerMode="none">
        <Stack.Screen name="CalendarScreen" component={calendarScreen} options={{headerShown: false}} />
        <Stack.Screen name="Add" component={addScreen} />
        <Stack.Screen name="AddMod" component={addModScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40, 
    fontWeight: "bold",
    height: 50,
  },
  textBox: {
    borderColor: "black",
    padding: 5,
    backgroundColor: "yellow",
    marginTop: 10,
    width: "90%"
  },
});