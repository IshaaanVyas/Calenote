import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, TextInput,FlatList } from 'react-native';
import WeeklyCalendar from 'react-native-weekly-calendar';
import WeekView from 'react-native-week-view';
import { Calendar } from 'react-native-big-calendar'
export default function App() {
  const [text, setText] = useState("");
  var NUSmods_URL = `https://api.nusmods.com/v2/2020-2021/modules/${text}.json`;

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
    console.log("Begin to fetch data");
    loadNUSmodsData();
  },[text]);
  const [something, setSomething] = useState([]);
  async function loadNUSmodsData()  {
    const response = await fetch(NUSmods_URL);
    const responseData = await response?.json();
    console.log(responseData)
    const somethingelse = responseData?.semesterData?.filter((item) => item?.semester == 1)[0]?.timetable;
    console.log(somethingelse)
    setSomething(somethingelse);
  }

  function renderItem({item}) {
    return <Text>{item.classNo}</Text>
  }
  return (

    /**<View style={styles.container}>
      <Text style={styles.title}>NUS MODS</Text>
      <TextInput style={styles.textBox} onChangeText={(text) => setText(text)} />
      <FlatList style={{width: '100%'}} data={something} renderItem={renderItem} />
    </View>*/
      <Calendar events={events} height={600} style={{marginTop: 50, width: "100%", marginRight: 100,}}/>
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