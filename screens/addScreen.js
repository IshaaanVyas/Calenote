import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, TextInput,FlatList,Button,TouchableOpacity } from 'react-native';
import WeeklyCalendar from 'react-native-weekly-calendar';
import WeekView from 'react-native-week-view';
import { Calendar } from 'react-native-big-calendar'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import firebase from "../database/firebaseDB"
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


export default function addScreen( {navigation} ) {
    const [date, setDate] = useState(new Date())
    const [mode, setMode] = useState('date')
    const [show, setShow] = useState(false);
//////////////////////////////////////////////////////////
    const [enddate, endsetDate] = useState(new Date())
    const [endmode, endsetMode] = useState('date')
    const [endshow, endsetShow] = useState(false);
/////////////////////////////////////////////// -- all the returns
    const [send, setSend] = useState();
    const [title, setTitle] = useState("");
//////////////////////////////////////////////
    const onChange = (event, selectedDate) => {
        const currentDate = (selectedDate || date);
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        console.log(currentDate.getMinutes());
      };
    
      const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
      };
    
      const showDatepicker = () => {
        showMode('date');
      };
    
      const showTimepicker = () => {
        showMode('time');
      };
      ////////////////////////////////////////////////

      const endonChange = (event, selectedDate) => {
        const endcurrentDate = (selectedDate || enddate);
        endsetShow(Platform.OS === 'ios');
        endsetDate(endcurrentDate);
      };
    
      const endshowMode = (currentMode) => {
        endsetShow(true);
        endsetMode(currentMode);
      };
    
      const endshowDatepicker = () => {
        endshowMode('date');
      };
    
      const endshowTimepicker = () => {
        endshowMode('time');
      };
      useEffect(() => {setSend({title: `${title}`, start: date, end: enddate, color: `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},1.0)`,});}, [title,date,enddate])

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="chevron-back-circle-sharp" size={48} color="dodgerblue" style={{marginLeft: 20, marginTop: 25}}/></TouchableOpacity>
            <TextInput placeholder="Add Title" style={styles.textInput} multiline={true} onChangeText={(text) => {setTitle(text)}}></TextInput>
            <Text style={styles.Text}>Start:</Text>
            <TouchableOpacity onPress={showDatepicker}><Text style={styles.datetime}>{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</Text></TouchableOpacity>
            <TouchableOpacity onPress={showTimepicker}><Text style={styles.datetime}>{date.getHours()}:{(date.getMinutes()<10?'0':'') + date.getMinutes()}</Text></TouchableOpacity>
            {show && <DateTimePicker
                 testID="dateTimePicker"
                 value={date}
                 mode={mode}
                is24Hour={false}
                display="default"
                onChange={onChange}
            />}
            <Text style={styles.Text}>End:</Text>
            <TouchableOpacity onPress={endshowDatepicker}><Text style={styles.datetime}>{enddate.getDate()}/{enddate.getMonth() + 1}/{enddate.getFullYear()}</Text></TouchableOpacity>
            <TouchableOpacity onPress={endshowTimepicker}><Text style={styles.datetime}>{enddate.getHours()}:{(enddate.getMinutes()<10?'0':'') + enddate.getMinutes()}</Text></TouchableOpacity>
            {endshow && <DateTimePicker
                 testID="enddateTimePicker"
                 value={enddate}
                 mode={endmode}
                is24Hour={false}
                display="default"
                onChange={endonChange}
            />}
        <TouchableOpacity onPress={() => {
            console.log(send);
            navigation.navigate("Calendar", {send})
            }}><AntDesign name="checkcircleo" size={56} color="dodgerblue" style={{marginLeft: 140, marginTop: 40}} /></TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      //marginTop: 65
    },
    Text: {
        marginTop: 45,
        marginLeft: 15,
        padding: 10,
        fontSize: 20,
    },
    textInput: {
    marginLeft: 20,
    padding: 10,
    fontSize: 25,
    borderBottomWidth: 1,
    borderColor: "black",
    padding: 5,
    backgroundColor: "white",
    marginTop: 10,
    width: "90%",
    },
    datetime: {
        marginTop: 5,
        marginLeft: 100,
        fontSize: 20,
        padding: 20,
        backgroundColor: 'dodgerblue',
        borderRadius: 10,
        width: 150,
        color: 'white',
    }
});