import { StatusBar } from 'expo-status-bar';
//import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Button } from 'react-native';
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import t from 'tcomb-form-native';
import { useState } from "react";
import Constants from 'expo-constants';

function adminFunctions({ navigation }) {
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
            <View><Text style={{fontSize: 30, height: 50}}>Add new culture group</Text>
            <Text>Name of Culture Group:</Text>
            <TextInput
                  style={{height: 40}}
                  placeholder="Type here!"
                  onChange={e => setCultureGroup(e.target.value)}
                  />
                  <Text>General insight for culture group:</Text>
            <TextInput
                  style={{height: 40}}
                  placeholder="Type here!"
                  onChange={e => setGenCultureData(e.target.value)}
                  />
                  <Text>Specialized insight for culture group:</Text>
            <TextInput
                  style={{height: 40}}
                  placeholder="Type here!"
                  onChange={e => setCultureSpecData(e.target.value)}
                  />
                  <Button title="Submit" onPress={handleSubmit} />
                  
            <View><Text style={{fontSize: 30, height: 50}}>Edit Culture Group</Text>
            <Text>Name of Culture Group:</Text>
            <TextInput
                  style={{height: 40}}
                  placeholder="Type here!"
                  onChange={e => setCultureGroup(e.target.value)}
                  />
                  <Text>General insight for culture group:</Text>
            <TextInput
                  style={{height: 40}}
                  placeholder="Type here!"
                  onChange={e => setGenCultureData(e.target.value)}
                  />
                  <Text>Specialized insight for culture group:</Text>
            <TextInput
                  style={{height: 40}}
                  placeholder="Type here!"
                  onChange={e => setCultureSpecData(e.target.value)}
                  />
                  <Button title="Submit" onPress={handleSubmit} />
            </View>

            <View><Text style={{fontSize: 30, height: 50}}>Delete culture group</Text>
                  <Text>Name of culture group:</Text>
            <TextInput
                  style={{height: 40}}
                  placeholder="Type here!"
                  // value={cultureGroup}
                  onChange={e => deleteCultureGroup(e.target.value)}
                  />
                  <Button title="Delete" onPress={handleDelete} />
            </View>

            <View><Text style={{fontSize: 30, height: 50}}>New Admin Account</Text>
            <Text>Name:</Text>
            <TextInput
                  style={{height: 40}}
                  placeholder="Type here!"
                  />
                  <Text>Email:</Text>
            <TextInput
                  style={{height: 40}}
                  placeholder="Type here!"
                  />
                  <Text>Password:</Text>
            <TextInput
                  style={{height: 40}}
                  placeholder="Type here!"
                  />
                  <Text>Confirm Password:</Text>
            <TextInput
                  style={{height: 40}}
                  placeholder="Type here!"
                  />
                  <Button title="Submit" onPress={handleSubmit} />
            </View>

            <View><Text style={{fontSize: 30, height: 50}}>Show List of Admins</Text>
            <Button title="Show List" onPress={handleSubmit} />
            </View>


            <View><Text style={{fontSize: 30, height: 50}}>Invite New Admin</Text>
                  <Text>Email:</Text>
            <TextInput
                  style={{height: 40}}
                  placeholder="Type here!"
                  />
                  <Button title="Submit" onPress={handleSubmit} />
            </View>

            <View><Text style={{fontSize: 30, height: 50}}>Update Admin Account</Text>
            <Text>Name:</Text>
            <TextInput
                  style={{height: 40}}
                  placeholder="Type here!"
                  />
                  <Text>Email:</Text>
            <TextInput
                  style={{height: 40}}
                  placeholder="Type here!"
                  />
                  <Text>Password:</Text>
            <TextInput
                  style={{height: 40}}
                  placeholder="Type here!"
                  />
                  <Text>Confirm Password:</Text>
            <TextInput
                  style={{height: 40}}
                  placeholder="Type here!"
                  />
                  <TouchableOpacity
                  style = {styles.submitButton}>
                  <Text style = {styles.submitButtonText}> Submit </Text>
                  </TouchableOpacity>
            </View>

            <View style={{height: 100}} >
                  <ScrollView style={styles.scrollView}>
                        <TouchableOpacity 
                        style = {styles.scrollButton}
                        onPress={() => navigation.navigate('Manage Admins')}>
                              <Text style = {styles.submitButtonText}> Manage Admins1 </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        style = {styles.scrollButton}
                        onPress={() => navigation.navigate('Manage Admins')}>
                              <Text style = {styles.submitButtonText}> Manage Admins2 </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        style = {styles.scrollButton}
                        onPress={() => navigation.navigate('Manage Admins')}>
                              <Text style = {styles.submitButtonText}> Manage Admins3 </Text>
                        </TouchableOpacity>
                  </ScrollView>
            </View>

            <View><Text style={{fontSize: 30, height: 50}}>Delete Admin Account</Text>
                  <Text>Email:</Text>
            <TextInput
                  style={{height: 40}}
                  placeholder="Type here!"
                  />
                  <Button title="Delete" onPress={handleDelete} />
            </View>


      </View>



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

function adminManagement({ navigation }) {
      return (
            <View style={styles.container}>
                  <View><Text style={{fontSize: 30, height: 50}}>New Admin Account</Text>
                  <Text>Name:</Text>
                  <TextInput
                        style={{height: 40}}
                        placeholder="Type here!"
                        />
                        <Text>Email:</Text>
                  <TextInput
                        style={{height: 40}}
                        placeholder="Type here!"
                        />
                        <Text>Password:</Text>
                  <TextInput
                        style={{height: 40}}
                        placeholder="Type here!"
                        />
                        <Text>Confirm Password:</Text>
                  <TextInput
                        style={{height: 40}}
                        placeholder="Type here!"
                        />
                        <TouchableOpacity
                        style = {styles.submitButton}>
                        <Text style = {styles.submitButtonText}> Submit </Text>
                        </TouchableOpacity>
                  </View>

                  <View><Text style={{fontSize: 30, height: 50}}>Show List of Admins</Text>
                        <TouchableOpacity
                        style = {styles.submitButton}>
                        <Text style = {styles.submitButtonText}> Show List </Text>
                        </TouchableOpacity>
                  </View>


                  <View><Text style={{fontSize: 30, height: 50}}>Invite New Admin</Text>
                        <Text>Email:</Text>
                  <TextInput
                        style={{height: 40}}
                        placeholder="Type here!"
                        />
                        <TouchableOpacity
                        style = {styles.submitButton}>
                        <Text style = {styles.submitButtonText}> Submit </Text>
                        </TouchableOpacity>
                  </View>

                  <View><Text style={{fontSize: 30, height: 50}}>Update Admin Account</Text>
                  <Text>Name:</Text>
                  <TextInput
                        style={{height: 40}}
                        placeholder="Type here!"
                        />
                        <Text>Email:</Text>
                  <TextInput
                        style={{height: 40}}
                        placeholder="Type here!"
                        />
                        <Text>Password:</Text>
                  <TextInput
                        style={{height: 40}}
                        placeholder="Type here!"
                        />
                        <Text>Confirm Password:</Text>
                  <TextInput
                        style={{height: 40}}
                        placeholder="Type here!"
                        />
                        <TouchableOpacity
                        style = {styles.submitButton}>
                        <Text style = {styles.submitButtonText}> Submit </Text>
                        </TouchableOpacity>
                  </View>

                  <View><Text style={{fontSize: 30, height: 50}}>Delete Admin Account</Text>
                        <Text>Email:</Text>
                  <TextInput
                        style={{height: 40}}
                        placeholder="Type here!"
                        />
                        <TouchableOpacity
                        style = {styles.submitButton}>
                        <Text style = {styles.submitButtonText}> Delete </Text>
                        </TouchableOpacity>
                  </View>

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
            <Stack.Navigator initialRouteName="adminFunctions">
                  <Stack.Screen name="adminFunctions" component={adminFunctions} />
                  <Stack.Screen name="Manage Admins" component={adminManagement} />
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
