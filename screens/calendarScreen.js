import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, TextInput,FlatList,Button, TouchableOpacity} from 'react-native';
import WeeklyCalendar from 'react-native-weekly-calendar';
import WeekView from 'react-native-week-view';
import { Calendar } from 'react-native-big-calendar'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import firebase from "../database/firebaseDB"
import { AntDesign } from '@expo/vector-icons';

const calendarStack = createStackNavigator();

function actualcalendarScreen({ route, navigation }) {
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
      useEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Add")}>
              <Text style={{marginRight: 20, color: "white", backgroundColor: "dodgerblue", borderRadius: 5, padding: 5}}>Add Event</Text>
            </TouchableOpacity>
          ),
        });
      });
      useEffect(() => {
        navigation.setOptions({
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate("AddMod")}>
              <Text style={{marginLeft: 20, color: "white", backgroundColor: "dodgerblue", borderRadius: 5, padding: 5}}>Add Module</Text>
            </TouchableOpacity>
          ),
        });
      });
     
    return (
        <View style={styles.container}> 
            <Calendar events={events} height={600} style={{width: "100%", marginRight: 10,}}/>
        </View>
    );
}

export default function calendarScreen() {
    return (
        <calendarStack.Navigator>
            <calendarStack.Screen name="Calendar" component={actualcalendarScreen} options={{ headerTitle: "Calendar", headerTitleStyle: { alignItems: 'center', justifyContent: 'center', margin: 65,} }} />
        </calendarStack.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});