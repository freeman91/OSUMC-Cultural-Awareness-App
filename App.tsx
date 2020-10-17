import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View><Text style={{fontSize: 30, height: 50}}>Add new culture group</Text>
      <Text>Name of Culture Group:</Text>
      <TextInput
            style={{height: 40}}
            placeholder="Type here!"
            />
            <Text>General insight for culture group:</Text>
      <TextInput
            style={{height: 40}}
            placeholder="Type here!"
            />
            <Text>Specialized insight for culture group:</Text>
      <TextInput
            style={{height: 40}}
            placeholder="Type here!"
            />
            <TouchableOpacity
               style = {styles.submitButton}>
               <Text style = {styles.submitButtonText}> Submit </Text>
            </TouchableOpacity>
            
      <View><Text style={{fontSize: 30, height: 50}}>Edit Culture Group</Text>
      <Text>Name of Culture Group:</Text>
      <TextInput
            style={{height: 40}}
            placeholder="Type here!"
            />
            <Text>General insight for culture group:</Text>
      <TextInput
            style={{height: 40}}
            placeholder="Type here!"
            />
            <Text>Specialized insight for culture group:</Text>
      <TextInput
            style={{height: 40}}
            placeholder="Type here!"
            />
            <TouchableOpacity
               style = {styles.submitButton}>
               <Text style = {styles.submitButtonText}> Submit </Text>
            </TouchableOpacity>
      </View>

      <View><Text style={{fontSize: 30, height: 50}}>Delete culture group</Text>
            <Text>Name of culture group:</Text>
      <TextInput
            style={{height: 40}}
            placeholder="Type here!"
            />
            <TouchableOpacity
               style = {styles.submitButton}>
               <Text style = {styles.submitButtonText}> Delete </Text>
            </TouchableOpacity>
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



    </View>



    <View style={styles.container}>
    </View>
      <StatusBar style="auto" />
    </View>
    
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
 }
});
