import { StatusBar } from 'expo-status-bar';
//import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Button, FlatList, SafeAreaView, Image } from 'react-native';
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useState } from "react";
import Constants from 'expo-constants';
import {homePage} from './frontend/views/homePage';



function cultureGeneral({ navigation }) {
      return (
            <View style={styles.container}>
                  

                  <Button
                  title="Manage Culture Data"
                  onPress={() => navigation.navigate('homePage')}
                  />


            <View style={styles.container}>
            </View>
                  <StatusBar style="auto" />
            </View>
      );
}

function cultureSpecialized({ navigation }) {
      return (
            <View style={styles.container}>
                  

                  <Button
                  title="Manage Culture Data"
                  onPress={() => navigation.navigate('homePage')}
                  />


            <View style={styles.container}>
            </View>
                  <StatusBar style="auto" />
            </View>
      );
}

function adminLogin({ navigation }) {

      // const getItem = (item) => {
      //       // Function for click on an item
      //       alert('Id : ' + item.id + ' Title : ' + item.title);
      // };

      return (
            <View style={styles.container}>
                  
                  <Text>Login</Text>
                  <TextInput placeholder="Email Address"></TextInput>
                  <TextInput placeholder="Password"></TextInput>

                  <Button
                  title="Login"
                  onPress={() => navigation.navigate('homePage')}
                  />


            <View style={styles.container}>
            </View>
                  <StatusBar style="auto" />
            </View>
      );
}
function adminRegistration({ navigation }) {
      return (
            <View style={styles.container}>
                  

                  <Button
                  title="Manage Culture Data"
                  onPress={() => navigation.navigate('homePage')}
                  />


            <View style={styles.container}>
            </View>
                  <StatusBar style="auto" />
            </View>
      );
}

function adminDashboard({ navigation }) {
      return (
            <View style={styles.container}>
                  

                  <Button
                  title="Manage Culture Data"
                  onPress={() => navigation.navigate('homePage')}
                  />


            <View style={styles.container}>
            </View>
                  <StatusBar style="auto" />
            </View>
      );
}

function cultureEdit({ navigation }) {
      return (
            <View style={styles.container}>
                  

                  <Button
                  title="Manage Culture Data"
                  onPress={() => navigation.navigate('homePage')}
                  />


            <View style={styles.container}>
            </View>
                  <StatusBar style="auto" />
            </View>
      );
}

function editInsight({ navigation }) {
      return (
            <View style={styles.container}>
                  

                  <Button
                  title="Manage Culture Data"
                  onPress={() => navigation.navigate('homePage')}
                  />


            <View style={styles.container}>
            </View>
                  <StatusBar style="auto" />
            </View>
      );
}

const Stack = createStackNavigator();

export default function App() {
  return (
      <NavigationContainer>{
            <Stack.Navigator initialRouteName="Home Page">
                  <Stack.Screen name="Home Page" component={homePage} />
                  <Stack.Screen name="General Insights" component={cultureGeneral} />
                  <Stack.Screen name="Specialized Insights" component={cultureSpecialized} />
                  <Stack.Screen name="Edit Culture" component={cultureEdit} />
                  <Stack.Screen name="Admin Dashboard" component={adminDashboard} />
                  <Stack.Screen name="Admin Login" component={adminLogin} />
                  <Stack.Screen name="Admin Registration" component={adminRegistration} />
                  <Stack.Screen name="Edit Insights" component={editInsight} />
            </Stack.Navigator>
    }</NavigationContainer>
  );
}

const styles = StyleSheet.create({
      emptyListStyle: {
        padding: 10,
        fontSize: 18,
        textAlign: 'center',
      },
      itemStyle: {
        padding: 10,
      },
      img: {
        padding: 35,
        height: 70,
        width: '25%'
      },
      headerFooterStyle: {
        width: '100%',
        height: 45,
        backgroundColor: '#606070',
      },
      bottomFooterStyle: {
       flex: 1,
       flexDirection: 'row',
       justifyContent: 'space-between',
        width: '100%',
        height: 80,
        backgroundColor: '#606070',
      },
      textStyle: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 18,
        padding: 7,
      },
});
