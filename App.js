import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, TextInput,FlatList,Button, TouchableOpacity } from 'react-native';
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
import AddScreen from "./screens/AddScreene";
import NotesStack from "./screens/NotesStack";
import { AntDesign } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';

YellowBox.ignoreWarnings([
  'Non-serializable values were found in the navigation state','YellowBox has been replaced with LogBox','Unhandled promise','Possible Unhandled Promise',"Can't perform a React state"
]);


const Stack = createStackNavigator();

export default function App() {

  //some text that might use later --need to change name --right now it is used to determine which module gets selected
  const [text, setText] = useState("");
  //some array that might use later --need to change name --right now it is an array that stores and displays all the classes of the selected module
  const [something, setSomething] = useState([]);

  function home({navigation}) {
    return(
    <View style={styles.container}>
      <Text style={styles.title}>CaleNote</Text>
      <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={() => navigation.navigate("CalendarScreen")}>
        <AntDesign name="calendar" size={48} color="dodgerblue" style={{paddingTop: 100, marginRight: 180}} />
        </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Notes Stack")} title>
      <Foundation name="clipboard-notes" size={48} color="dodgerblue" style={{paddingTop: 100, marginRight: 20}} />
      </TouchableOpacity>
      </View>
    </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator mode="modal" headerMode="none">
        <Stack.Screen name = "home" component={home} options={{headerShown: false}} />
        <Stack.Screen name="CalendarScreen" component={calendarScreen} options={{headerShown: false}} />
        <Stack.Screen name="Add" component={addScreen} />
        <Stack.Screen name="AddMod" component={addModScreen} />
        <Stack.Screen name="Notes Stack" component={NotesStack} />
        <Stack.Screen name="Add Screen" component={AddScreen} />
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
    color: "dodgerblue",
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