import { StatusBar } from 'expo-status-bar';
//import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Button, FlatList, SafeAreaView, Image } from 'react-native';
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
  
      const handleDisclaimer = (evt) => {
            alert('Pressed!');
        }
      
        const handleAdminLogin = (evt) => {
            alert('Pressed!')
      }

      const EmptyListMessage = ({ item }) => {
            return (
              // Flat List Item
              <Text style={styles.emptyListStyle} onPress={() => getItem(item)}>
                No Data Found
              </Text>
            );
          };
        
          const ItemView = ({ item }) => {
            return (
              // Flat List Item
              <Text style={styles.itemStyle} onPress={() => getItem(item)}>
                {item.id}
                {'.'}
                {item.title.toUpperCase()}
              </Text>
            );
          };
        
          const ItemSeparatorView = () => {
            return (
              // Flat List Item Separator
              <View
                style={{
                  height: 0.5,
                  width: '100%',
                  backgroundColor: '#C8C8C8',
                }}
              />
            );
          };
        
          const ListHeader = () => {
            //View to set in Header
            return (
              <View style={styles.headerFooterStyle}>
                <Text style={styles.textStyle}>Cultural Awareness Home Page</Text>
              </View>
            );
          };
        
          const ListFooter = () => {
            //View to set in Footer
            return (
              <View style={styles.bottomFooterStyle}>
                <Button title="General Disclaimer" style="margin:50%" onPress={handleDisclaimer} />
                <TouchableOpacity style={styles.btn} onPress={handleAdminLogin}>
                <Image source={require('./assets/admin_login.png')}  style={styles.img}/>
                </TouchableOpacity>
              </View>
            );
          };
        
          const getItem = (item) => {
            // Function for click on an item
            alert('Id : ' + item.id + ' Title : ' + item.title);
          };

          const [dataSource, setDataSource] = useState([
            { id: 1, title: 'Button' },
            { id: 2, title: 'Card' },
            { id: 3, title: 'Input' },
            { id: 4, title: 'Avatar' },
            { id: 5, title: 'CheckBox' },
            { id: 6, title: 'Header' },
            { id: 7, title: 'Icon' },
            { id: 8, title: 'Lists' },
            { id: 9, title: 'Rating' },
            { id: 10, title: 'Pricing' },
            { id: 11, title: 'Avatar' },
            { id: 12, title: 'CheckBox' },
            { id: 13, title: 'Header' },
            { id: 14, title: 'Icon' },
            { id: 15, title: 'Lists' },
            { id: 16, title: 'Rating' },
            { id: 17, title: 'Pricing' },
          ]);

      return (
            <SafeAreaView style={{ flex: 1 }}>
              <FlatList
                data={dataSource} 
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={ItemSeparatorView}
                //Header to show above listview
                ListHeaderComponent={ListHeader}
                //Footer to show below listview
                ListFooterComponent={ListFooter}
                renderItem={ItemView}
                ListEmptyComponent={EmptyListMessage}
              />
            </SafeAreaView>
        
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
