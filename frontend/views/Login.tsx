import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Alert, View, StyleSheet } from "react-native";
import { CommonActions } from "@react-navigation/native";
import { Button, Card, TextInput } from "react-native-paper";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Formik } from "formik";

import { Admin } from "../api";
import { updateUser } from "../redux/UserAction";
import { Routes } from "../routes";

type Props = {
  navigation: StackNavigationProp<Routes, "Login" | "Register">;
  route: RouteProp<Routes, "Login" | "Register">;
  updateUser: Function;
};

const styles = StyleSheet.create({
  card: {
    marginTop: 100,
    marginLeft: 20,
    marginRight: 20,
  },
  container: {
    padding: 10,
    fontSize: 18,
  },
  view: {
    height: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
});

type RegistrationFields = {
  name?: string;
  email: string;
  password: string;
  passwordConfirmation?: string;
};

function Login(props: Props): React.ReactElement {
  const route = useRoute();
  const token = props.route.params ? props.route.params.token : "";
  const { navigation, updateUser } = props;

  const handleLogin = async (fields: RegistrationFields) => {
    const { email, password } = fields;
    try {
      const token = await Admin.login(email, password);
      const user = await Admin.get(email, token);
      updateUser({ user: { ...user }, token });
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: "Home" }],
        })
      );
    } catch (error) {
      console.error("Unsuccessful Login", error);
      Alert.alert(
        "Unsuccessful Login",
        "Incorrect username or password",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: true }
      );
    }
  };

  const handleRegistration = async (fields: RegistrationFields) => {
    const { name, email, password, passwordConfirmation } = fields;
    if (token) {
      try {
        await Admin.create(name, email, password, passwordConfirmation, token);
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: "Login" }],
          })
        );
      } catch (error) {
        console.error("Unsuccessful Registration", error);
        Alert.alert(
          "Unsuccessful Registration",
          "helpful error message",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: true }
        );
      }
    }
  };

  return (
    <View style={styles.view}>
      <LinearGradient colors={["#454545", "#f0f4ef"]} style={styles.gradient}>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            passwordConfirmation: "",
          }}
          onSubmit={(values) =>
            route.name === "Login"
              ? handleLogin(values)
              : handleRegistration(values)
          }
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <Card style={styles.card}>
              {route.name === "Register" && (
                <TextInput
                  style={styles.container}
                  mode="outlined"
                  label="name"
                  value={values.name}
                  onChangeText={handleChange("name")}
                />
              )}
              <TextInput
                style={styles.container}
                mode="outlined"
                label="email"
                value={values.email}
                onChangeText={handleChange("email")}
              />
              <TextInput
                style={styles.container}
                mode="outlined"
                label="password"
                secureTextEntry={true}
                value={values.password}
                onChangeText={handleChange("password")}
              />
              {route.name === "Register" && (
                <TextInput
                  style={styles.container}
                  mode="outlined"
                  label="password confirmation"
                  secureTextEntry={true}
                  value={values.passwordConfirmation}
                  onChangeText={handleChange("passwordConfirmation")}
                />
              )}
              <Button icon="login" mode="contained" onPress={handleSubmit}>
                {route.name}
              </Button>
            </Card>
          )}
        </Formik>
      </LinearGradient>
    </View>
  );
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateUser,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Login);
