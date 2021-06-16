import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import firebase from "../database/firebaseDB"



export default function NotesScreen({ navigation, route }) {
  const [currTime, setTime] = useState('');
  const [notes, setNotes] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');


  // This is to set up the top right button
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={addNote}>
          <Ionicons
            name="ios-create-outline"
            size={30}
            color="black"
            style={{
              color: "black",
              marginRight: 15,
            }}
          />
        </TouchableOpacity>
      ),
    });
  });

  // Monitor route.params for changes and add items to the database
  useEffect(() => {
    if (route.params?.text) {
      const newNote = {
        title: route.params.text,
        done: false,
        id: notes.length.toString(),
        timestamp: currTime,
      };
      firebase.firestore().collection("NoteApp").add(newNote);
      setNotes([...notes, newNote]);
    }
  }, [route.params?.text]);

  useEffect(() => {
    firebase
    .firestore()
    .collection("NoteApp")
    .onSnapshot((collection) => {
      const updatedNotes = collection.docs.map(doc => doc.data());
      setNotes(updatedNotes);
    });
  }, []);

  function addNote() {
    navigation.navigate("Add Screen");
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    setTime(
      date + '/' + month + '/' + year 
      + ' ' + hours + ':' + min + ':' + sec
    );
  }

  // This deletes an individual note
  function deleteNote(id) {

    firebase
    .firestore()
    .collection("NoteApp")
    .where('id', '==' ,id)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => doc.ref.delete());
    });
    // To delete that item, we filter out the item we don't want
    setNotes(notes.filter((item) => item.id !== id));
  }

  // The function to render each row in our FlatList
  function renderItem({ item, navigation}) {
    return (
      <View
        style={{
          padding: 10,
          paddingTop: 20,
          paddingBottom: 20,
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        
        <Text>{item.title}</Text>
        <Text>{item.timestamp}</Text>
        <TouchableOpacity onPress={() => deleteNote(item.id)}>
          <Ionicons name="trash" size={16} color="#944" />
        </TouchableOpacity>
      </View>
    );
  }



  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        renderItem={renderItem}
        style={{ width: "100%" }}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style = {{flexDirection: 'row'}}>
        <Text style = {{marginRight: 10}}>{startTime}</Text>
      <TouchableOpacity onPress = {() => {var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    setStartTime(
      date + '/' + month + '/' + year 
      + ' ' + hours + ':' + min + ':' + sec
    ); }}
      style = {{width: 40, height: 30, backgroundColor: 'dodgerblue', borderRadius: 5, marginRight: 30}}>
        <Text style = {{textAlign: 'center'}}>Start</Text></TouchableOpacity>
      <TouchableOpacity onPress = {() => {var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    setEndTime(
      date + '/' + month + '/' + year 
      + ' ' + hours + ':' + min + ':' + sec
    ); }}
      style = {{width: 40, height: 30, backgroundColor: 'dodgerblue', borderRadius: 5}}>
        <Text 
      style = {{textAlign: 'center'}}>Stop</Text></TouchableOpacity>
      <Text style = {{marginLeft: 10}}>{endTime}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});