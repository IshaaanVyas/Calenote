import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, TextInput,FlatList,Button } from 'react-native';
import WeeklyCalendar from 'react-native-weekly-calendar';
import WeekView from 'react-native-week-view';
import { Calendar } from 'react-native-big-calendar'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import firebase from "../database/firebaseDB"

export default function addScreen() {
    return (
        <View><Text>Events</Text></View>
    );
}