import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, TextInput,FlatList,Button, TouchableOpacity } from 'react-native';
import WeeklyCalendar from 'react-native-weekly-calendar';
import WeekView from 'react-native-week-view';
import { Calendar } from 'react-native-big-calendar'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import firebase from "../database/firebaseDB"
import { Ionicons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function addModScreen( {navigation} ) {

    //Need to change these every year once :(  --dates for start of each semester for 2020-2021
        const firstweekoneone = new Date(2020, 7, 10, 0, 0);
        const firstweektwo = new Date(2021, 0, 11, 0, 0);
    //

    const [moduleCode, setModuleCode] = useState("");
    const [acadYear, setAcadYear] = useState("2020-2021");
    const [sem, setSem] = useState(0);
    const [search, setSearch] = useState(false);
    const [loading, setLoading] = useState(false);
    const [elements, setElements] = useState([]);

    const[sendMod, setSendMod] = useState([]);

    var NUSmods_URL = `https://api.nusmods.com/v2/${acadYear}/modules/${moduleCode}.json`;

    //// -- some code for basically useless aesthetics
    const [oneSelected, setOneSelected] = useState(false);
    const [twoSelected, setTwoSelected] = useState(false);
    //// --end

    /// - spent 3hrs on this just so that the screen looks abit better
    const [highlightMod,setHighlightMod] = useState([]);
    ///

    useEffect(() => {
        var firstweekone = firstweekoneone;
        if (sem == 2) firstweekone = firstweektwo;
        var temp = []
        var i;
        for (i = 0; i < highlightMod.length; i++) {
            var adday = 0;
            var day = highlightMod[i].content.day;
            var initialTime = highlightMod[i].content.startTime;
            var finalTime = highlightMod[i].content.endTime;
            if (day == "Tuesday") adday = 1;
            else if (day == 'Wednesday') adday = 2;
            else if (day == 'Thursday') adday = 3;
            else if (day == 'Friday') adday = 4;
            else if (day == 'Saturday') adday = 5;
            var lessonColor = 'blue';
            if ((highlightMod[i].content.lessonType == 'Lecture') || (highlightMod[i].content.lessonType == 'Sectional Teaching')) lessonColor = 'black';
            else if ((highlightMod[i].content.lessonType == 'Tutorial')) lessonColor = 'dodgerblue';
            else if ((highlightMod[i].content.lessonType == 'Laboratory')) lessonColor = 'red';
            for (var j = 0; j < highlightMod[i].content.weeks.length; j++) {
                var week = highlightMod[i].content.weeks[j] - 1;
                if (week > 5) week++;
                var send = {
                    title: `${moduleCode + ' ' + highlightMod[i].content.lessonType}`,
                    start: new Date(firstweekone.getFullYear(), firstweekone.getMonth(), firstweekone.getDate() + (7* week) + adday, Number(initialTime.substring(0,2)), Number(initialTime.substring(2,4))),
                    end: new Date(firstweekone.getFullYear(), firstweekone.getMonth(), firstweekone.getDate() + (7* week) + adday, Number(finalTime.substring(0,2)), Number(finalTime.substring(2,4))),
                    color: lessonColor,
                }
            temp = [...temp, send];
        }
        }
        
        setSendMod(temp)

    }, [highlightMod])

    useEffect(() => {
        loadNUSmodsData();
    }, [search])

    async function loadNUSmodsData()  {
        if(search) {
        setSearch(false);
        const response = await fetch(NUSmods_URL);
        const responseData = await response?.json();
        const semData = responseData?.semesterData?.filter((item) => item?.semester == sem)[0]?.timetable
        if (semData) setElements(semData);
        }
      }
      function renderItem({item, index}) {
        function selectMod() {
            setHighlightMod([...highlightMod, {number: index, content: item}])
            if (highlightMod.filter((item) => item?.number == index)[0]?.number === index) setHighlightMod(highlightMod.filter((item) => item?.number != index));
        }

        return (
        <View style={{flexDirection: 'row', borderWidth: 1, marginRight: 25, borderRadius: 18, 
            backgroundColor: `${(highlightMod.filter((item) => item?.number == index)[0]?.number === index)? 'dodgerblue' : 'white'}`,
            borderColor: 'dodgerblue'
        }}>
        <TouchableOpacity onPress={selectMod} style={{flexDirection: 'row'}}>
        <Text style={{marginBottom: 10,padding: 10,
            color: `${(highlightMod.filter((item) => item?.number == index)[0]?.number === index)? 'white' : 'dodgerblue'}`
        }}>{item.lessonType.substring(0,3)}({item.classNo})</Text>
        <Text style={{color: `${(highlightMod.filter((item) => item?.number == index)[0]?.number === index)? 'white' : 'dodgerblue'}`,
        marginLeft: 10, marginTop: 11,
        }}>{item?.day}</Text>
        <Text style={{color: `${(highlightMod.filter((item) => item?.number == index)[0]?.number === index)? 'white' : 'dodgerblue'}`,
        marginLeft: 10, marginTop: 12,
        }}>{item.startTime}-{item.endTime}</Text>
        <Text style={{color: `${(highlightMod.filter((item) => item?.number == index)[0]?.number === index)? 'white' : 'dodgerblue'}`,
        marginLeft: 10, marginTop: 12, marginLeft: 25
        }}>{item.venue}</Text>
        </TouchableOpacity>
        </View>
        );
        
      }
    
    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="chevron-back-circle-sharp" size={48} color="dodgerblue" style={{marginLeft: 20, marginTop: 25,marginBottom: 10}}/></TouchableOpacity>
            <TouchableOpacity onPress={() => {
                navigation.navigate("Calendar", {sendMod})
            }}><AntDesign name="checkcircleo" size={36} color="dodgerblue" style={{marginLeft: 230, marginTop: 35}} /></TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row'}}>
             <Text style={{marginTop: 20, marginLeft: 6,backgroundColor: 'dodgerblue', borderRadius: 5, padding: 5,
            color: 'white'
            }}>Module Code:</Text>   
            <TextInput placeholder="eg. CS1010" style={styles.textInput} multiline={false} autoCapitalize={'characters'} onChangeText={(text) => setModuleCode(text)}></TextInput>
            </View>
            <View style={{flexDirection: 'row'}}>
             <Text style={{marginTop: 16, marginLeft: 6,backgroundColor: 'dodgerblue', borderRadius: 5, padding: 5,
            color: 'white'
            }}>Academic Year:</Text>   
            <TextInput selectTextOnFocus={true} value={acadYear} placeholder="eg. 2020-2021" style={[styles.textInput,{marginLeft: 10}]} multiline={false} keyboardType={'numeric'} onChangeText={(text) => setAcadYear(text)}></TextInput>
            </View>
            <View style={{flexDirection: 'row'}}>
             <Text style={{marginTop: 17, marginLeft: 6,backgroundColor: 'dodgerblue', borderRadius: 5, padding: 5,
            color: 'white', paddingTop: 8,
            }}>Semester:</Text>
            <TouchableOpacity onPress={() => {
                setOneSelected(true);
                setTwoSelected(false);
                setSem(1);
            }}><Text style={[styles.semesterSelector, {
                color: `${oneSelected? 'white' : 'dodgerblue'}`,
                borderColor: 'dodgerblue',
                backgroundColor: `${oneSelected? 'dodgerblue' : 'white'}`
            }]}>1</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => {
                setOneSelected(false);
                setTwoSelected(true);
                setSem(2);
            }}><Text style={[styles.semesterSelector, {color: `${twoSelected? 'white' : 'dodgerblue'}`, 
            borderColor: 'dodgerblue',
            backgroundColor: `${twoSelected? 'dodgerblue' : 'white'}`
            }]}>2</Text></TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => setSearch(true)}><EvilIcons name="search" size={42} color="white" style={{
                marginTop: 30,
                marginLeft: 150,
                borderWidth: 1,
                borderRadius: 50,
                paddingTop: 3,
                paddingBottom: 3,
                backgroundColor: 'dodgerblue',
                borderColor: 'dodgerblue',
                elevation: 8,
            }}/></TouchableOpacity></View>
            <View>
                <FlatList data={elements} renderItem={renderItem} style={{width: '100%', marginTop: 30, borderColor: 'dodgerblue', borderRadius: 10,
                marginLeft: 10, marginRight: 10,
            }} keyExtractor={(item,index) => item.classNo + item.startTime + index} contentContainerStyle={{paddingBottom: 320}}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    textInput: {
        marginLeft: 20,
        //padding: 10,
        fontSize: 14,
        borderBottomWidth: 1,
        borderColor: "black",
        backgroundColor: "white",
        marginTop: 15,
        width: "90%",
        },
    semesterSelector: {
        marginTop: 16, 
        marginLeft: 50,
        borderRadius: 50, 
        padding: 8,
        paddingLeft: 13,
        paddingRight: 13,
        borderWidth: 1,
        },
});