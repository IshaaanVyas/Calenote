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


const Stack = createStackNavigator();

export default function App() {

  //some text that might use later --need to change name --right now it is used to determine which module gets selected
  const [text, setText] = useState("");
  //some array that might use later --need to change name --right now it is an array that stores and displays all the classes of the selected module
  const [something, setSomething] = useState([]);
  //array to store all events
  //const [events, setEvents] = useState([]);


  var NUSmods_URL = `https://api.nusmods.com/v2/2020-2021/modules/${text}.json`;

  /**  -- template in which events have to be in 
  const events = [
    {
      title: 'Meeting',
      start: new Date(2021, 5, 14, 10, 0),
      end: new Date(2021, 5, 15, 10, 30),
    },
    {
      title: 'Coffee break',
      start: new Date(2021, 5, 6, 15, 45),
      end: new Date(2021, 5, 6, 16, 30),
    },
  ]

  const events = [
    {
      title: 'Meeting',
      start: new Date(2021, 5, 14, 10, 0),
      end: new Date(2021, 5, 15, 10, 30),
    },
    {
      title: 'Coffee break',
      start: new Date(2021, 5, 6, 15, 45),
      end: new Date(2021, 5, 6, 16, 30),
    },
  ]

// every time text changes this useEffect is triggered
  useEffect(() => {
    console.log("Begin to fetch data");
    loadNUSmodsData();
  },[text]);

  // gets details of a specific module from the API, rn its only made for testing so theres some weird stuff happening
  async function loadNUSmodsData()  {
    const response = await fetch(NUSmods_URL);
    const responseData = await response?.json();
    console.log(responseData)
    const somethingelse = responseData?.semesterData?.filter((item) => item?.semester == 1)[0]?.timetable;
    console.log(somethingelse)
  }
//renderItem function for flatlist
  function renderItem({item}) {
    return <Text>{item.classNo}</Text>
  }*/

  
  return (
    /**<View style={styles.container}>
      <Text style={styles.title}>NUS MODS</Text>
      <TextInput style={styles.textBox} onChangeText={(text) => setText(text)} />
      <FlatList style={{width: '100%'}} data={something} renderItem={renderItem} />
    </View>*/
    /**
    <View style={styles.container}>
      <Calendar events={events} height={600} style={{marginTop: 30, width: "100%", marginRight: 10,}}/>
    </View>*/
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