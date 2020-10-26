import { StatusBar } from 'expo-status-bar';
//import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Button } from 'react-native';
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useState } from "react";
import Constants from 'expo-constants';

function homePage({ navigation }) {
      const [cultureGroup, setCultureGroup] = useState("");
      const [delCultureGroup, deleteCultureGroup] = useState("");
      const [cultureGenData, setGenCultureData] = useState("");
      const [cultureSpecData, setCultureSpecData] = useState("");
  
      const handleSubmit = (evt) => {
            evt.preventDefault();
            fetch('http://localhost:5000').then(response => response.json()).then(data => console.log(cultureGroup));
            alert(`Info Submitted ${cultureGroup}`)
      }

      const handleDelete = (evt) => {
            evt.preventDefault();
            fetch('http://localhost:5000').then(response => response.json()).then(data => console.log("hello"));
            alert(`Culture Group Data for ${delCultureGroup} has been deleted!`)
      }

      return (
            <View style={styles.container}>
            
      <Button
                  title="Manage Culture Data"
                  onPress={() => navigation.navigate('adminFunctions')}
      />

      <View style={styles.container}>
      </View>
            <StatusBar style="auto" />
      </View>
      );
}

function cultureGeneral({ navigation }) {
      return (
            <View style={styles.container}>
                  

                  <Button
                  title="Manage Culture Data"
                  onPress={() => navigation.navigate('adminFunctions')}
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
                  onPress={() => navigation.navigate('adminFunctions')}
                  />


            <View style={styles.container}>
            </View>
                  <StatusBar style="auto" />
            </View>
      );
}

function adminLogin({ navigation }) {
      return (
            <View style={styles.container}>
                  

                  <Button
                  title="Manage Culture Data"
                  onPress={() => navigation.navigate('adminFunctions')}
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
                  onPress={() => navigation.navigate('adminFunctions')}
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
                  onPress={() => navigation.navigate('adminFunctions')}
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
                  onPress={() => navigation.navigate('adminFunctions')}
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
                  onPress={() => navigation.navigate('adminFunctions')}
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1
 },
 submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
 },
 submitButtonText:{
    color: 'white'
 },
 scrollView: {
      backgroundColor: 'gray',
      marginHorizontal: 20
},
scrollButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      margin: 5,
      height: 40,
   },

});
