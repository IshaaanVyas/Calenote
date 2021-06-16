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
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const calendarStack = createStackNavigator();


function actualcalendarScreen({ route, navigation }) {
    const [events, setEvents] = useState([]);
    const [show, setShow] = useState(false);
    const [currTitle, setcurrTitle] = useState("");
    const [currStart, setcurrStart] = useState(new Date());
    const [currEnd, setcurrEnd] = useState(new Date());
    const [currColor, setcurrColor] = useState('black');
    const [currID, setcurrID] = useState();

      useEffect(() => {
          const unsubscribe = firebase
          .firestore()
          .collection("events")
          .onSnapshot((collection) => {
              var updatedEvents = collection.docs.map((doc) => {return {
                  id: doc.id,
                  ...doc.data(),
              }});
              updatedEvents = updatedEvents.map((doc) => {
                  return {title: `${doc.title}`, start: new Date(doc.start.toDate()), end: new Date(doc.end.toDate()), color: doc.color, id: doc.id,}
                  })
              setEvents(updatedEvents);
          });

          return () => {
              unsubscribe();
          };
      }, [])

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
      useEffect(() => {
          if (route.params?.send) {
            firebase.firestore().collection("events").add(route.params.send);
          }
      },[route.params?.send])

      useEffect(() => {
        if (route.params?.sendMod) {
          var lesgo = route.params.sendMod;
          for (var i = 0; i < lesgo.length; i++){
            firebase.firestore().collection("events").add(lesgo[i]);
          }
        }
      },[route.params?.sendMod] )
     
      function eventInfo(event) {
            setShow(true);
            setcurrTitle(event.title);
            setcurrStart(event.start);
            setcurrEnd(event.end);
            setcurrColor(event.color);
            setcurrID(event.id);
      }

    return (
        <View style={styles.container}> 
            <Calendar events={events} height={600} style={{width: "100%", marginRight: 10,}} swipeEnabled={true} eventCellStyle={(event) => {
                return {backgroundColor: `${event.color}`}
            }} onPressEvent={eventInfo} scrollOffsetMinutes={480} date={new Date(2021, 0, 11, 0, 0)}/>
            {show && 
                <View style={[styles.moreStuff, {backgroundColor: `${currColor}`}]}>
                    <TouchableOpacity onPress={() => setShow(false)}><Entypo name="cross" size={24} color="white" /></TouchableOpacity>
                    <Text style={{fontSize: 18, marginLeft: 30, borderBottomWidth: 1, borderBottomColor: 'white', color: 'white'}}>{currTitle}</Text>
                    <View style={{flexDirection: 'row'}}>
                    <Entypo name="dot-single" size={24} color="white" style={{justifyContent: 'flex-start'}} />
                    <Text style={styles.timestuff}>{((currStart.getMonth() == currEnd.getMonth()) && (currStart.getDate() == currEnd.getDate()))? '' : `${currStart.getDate()}/${currStart.getMonth()} to ${currEnd.getDate()}/${currEnd.getMonth()}, `}
                     from {currStart.getHours()}:{(currStart.getMinutes()<10?'0':'') + currStart.getMinutes()} to {currEnd.getHours()}:{(currEnd.getMinutes()<10?'0':'') + currEnd.getMinutes()}</Text>
                     </View>
                     <View style={{flexDirection: 'row', marginTop: 40}}>
                     <Ionicons name="alarm-outline" size={24} color="white" style={{marginLeft: 10}}/>
                     <Text style={[styles.timestuff, {marginLeft: 1, marginTop: 3}]}>:    On</Text>
                     </View>
                     <TouchableOpacity onPress={() => {
                         firebase.firestore().collection("events").doc(currID).delete();
                         setShow(false);
                     }}><Feather name="trash" size={24} color="white"  style={{marginLeft: 85, marginTop: 120}}/></TouchableOpacity>

                </View>
            }
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
    test: {
        backgroundColor: 'red'
    },
    moreStuff: {
        height: 350, 
        width: 200, 
        position: 'absolute', 
        top: 150, elevation: 5, 
        marginBottom: 200, 
        borderRadius: 10,
    },
    timestuff: {
        fontSize: 15,
        color: "white",
        paddingRight: 25,
    }
});