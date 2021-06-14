import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, TextInput,FlatList } from 'react-native';
export default function App() {
  const [text, setText] = useState("");
  var NUSmods_URL = `https://api.nusmods.com/v2/2020-2021/modules/${text}.json`;


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
    <View style={styles.container}>
      <Text style={styles.title}>NUS MODS</Text>
      <TextInput style={styles.textBox} onChangeText={(text) => setText(text)} />
      <FlatList style={{width: '100%'}} data={something} renderItem={renderItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
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