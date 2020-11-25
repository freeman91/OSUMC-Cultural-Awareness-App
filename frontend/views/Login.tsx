import React, { useState, useRef, useEffect } from "react";

import { View, StyleSheet } from "react-native";
import {
  Button,
  TextInput,
  HelperText,
  Snackbar,
  Checkbox,
} from "react-native-paper";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { StackNavigationProp } from "@react-navigation/stack";
import { CommonActions } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import { useFormik } from "formik";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Admin, AuthPayload } from "../api";
import { updateUser, Store } from "../redux";
import { Routes } from "../routes";
import { LoginValidationSchema } from "../constants";

type Props = {
  navigation: StackNavigationProp<Routes, "Login">;
  route: RouteProp<Routes, "Login">;
  updateUser: (user: Store["user"]) => void;
};

/**
 * Login screen fields for Formik.
 */
type LoginFields = {
  email: string;
  password: string;
};

/**
 * Initial values for Login fields for Formik.
 */
const initialValues: LoginFields = {
  // This field could be updated with useEffect to enter the user's saved email address.
  email: "",
  password: "",
};

// Used for {@link AsyncStorage} to store a user's email
// locally on their device.
const RememberedEmail = "@rememberedEmail";

const Styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "space-evenly",
    margin: 15,
    overflow: "hidden",
  },

  recover: {
    position: "absolute",
    bottom: 5,
  },
});

/**
 * Screen for logging in an Admin
 *
 * @param {Props} props - properties for Login screen
 *
 * @returns {React.ReactElement} React Component
 */
function Login(props: Props): React.ReactElement {
  const [remember, setRemember] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [err, setErr] = useState("");
  const [obscurePass, SetObscurePass] = useState(true);

  // useRefs for Formik Validation
  const email = useRef();
  const password = useRef();

  const {
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    handleSubmit,
    setFieldValue,
    validateField,
  } = useFormik({
    validationSchema: LoginValidationSchema,
    initialValues: initialValues,
    onSubmit: (values) => login(values),
  });

  useEffect(() => {
    const getEmail = async () => {
      const email = await AsyncStorage.getItem(RememberedEmail);
      if (email) {
        setFieldValue("email", email);
        setRemember(true);
      }
    };

    getEmail();
  }, []);

  /**
   * login performs Api Login operation.
   *
   * Response:
   *   valid credentials:
   *     1. login
   *     2. get token
   *     3. Save Email if user selected "Remember Me"
   *     4. redirect to "Home"
   *   invalid: display Snackbar
   *
   * @param {LoginFields} values currently stored in the form
   */
  const login = async (fields: LoginFields) => {
    const { email, password } = fields;
    const { navigation, updateUser } = props;

    let res: AuthPayload;
    try {
      res = await Admin.login(email, password);
    } catch (err) {
      setSnackbar(true);
      setErr(err.toString());
      return;
    }

    try {
      if (remember) {
        await AsyncStorage.setItem(RememberedEmail, email);
      } else {
        await AsyncStorage.removeItem(RememberedEmail);
      }
    } catch (err) {
      console.error("Failed to set Remembered Email", err);
    }

    updateUser(res);

    navigation.dispatch(
      CommonActions.reset({ index: 1, routes: [{ name: "Home" }] })
    );
  };

  /**
   * recoverAccount checks to see if the provided Email is valid
   * if it is send recovery email. Otherwise, display Snackbar.
   */
  const recoverAccount = async () => {
    await validateField("email");
    if (errors.email === undefined) {
      console.log(`Send recovery email to ${values.email}`);
    } else {
      setSnackbar(true);
      setErr("Account recovery requires a valid Email");
    }
  };

  return (
    <View style={Styles.view}>
      <View>
        <TextInput
          autoFocus={true}
          textContentType="emailAddress"
          mode="outlined"
          error={errors.email && touched.email}
          left={<TextInput.Icon name="email" />}
          label="email"
          ref={email}
          value={values.email}
          onBlur={handleBlur("email")}
          onChangeText={handleChange("email")}
        />
        {errors.email && touched.email && (
          <HelperText type="error">{errors.email}</HelperText>
        )}
      </View>
      <View>
        <TextInput
          mode="outlined"
          label="password"
          ref={password}
          left={<TextInput.Icon name="lock" />}
          secureTextEntry={obscurePass}
          error={errors.password && touched.password}
          onBlur={handleBlur("password")}
          value={values.password}
          onChangeText={handleChange("password")}
          right={
            <TextInput.Icon
              name={obscurePass ? "eye" : "eye-off"}
              onPress={() => SetObscurePass(!obscurePass)}
            />
          }
        />
        {errors.password && touched.password && (
          <HelperText type="error">{errors.password}</HelperText>
        )}
      </View>
      <Checkbox.Item
        label="Remember me"
        status={remember ? "checked" : "unchecked"}
        onPress={() => setRemember(!remember)}
      />
      <Button mode="contained" onPress={handleSubmit}>
        Log In
      </Button>
      <Button
        style={Styles.recover}
        mode="text"
        onPress={recoverAccount}
        uppercase={false}
      >
        Trouble logging in?
      </Button>
      <Snackbar
        visible={snackbar}
        onDismiss={() => setSnackbar(false)}
        action={{ label: "Ok", onPress: () => setSnackbar(false) }}
      >
        {err}
      </Snackbar>
    </View>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      updateUser,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Login);
