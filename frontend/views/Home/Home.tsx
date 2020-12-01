import React, { useState, useEffect, useRef } from "react";
import { View, useWindowDimensions, Platform } from "react-native";

import { connect } from "react-redux";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Portal,
  Modal,
  Text,
  ActivityIndicator,
  TextInput,
  Button,
  FAB,
  Snackbar,
} from "react-native-paper";
import { useFormik } from "formik";

import { Store } from "../../redux";
import { Admin, Culture } from "../../lib";
import { Routes } from "../../routes";

import Cultures from "./Cultures";
import Admins from "./Admins";
import styles from "./styles";
import { EmailValidation } from "./validation";

type Props = {
  navigation: StackNavigationProp<Routes, "Home">;
  route: RouteProp<Routes, "Home">;
  user: Admin;
  token: string;
  theme: string;
};

type TabProps = {
  Cultures: { cultures: Culture[] };
  Admins: { admins: Admin[] };
};

/**
 * Invite Email screen fields for Formik.
 */
type EmailField = {
  email: string;
};

/**
 * Initial values for email field for Formik.
 */
const initialValues: EmailField = {
  // This field could be updated with useEffect to enter the user's saved email address.
  email: "",
};

const Tab = createMaterialTopTabNavigator<TabProps>();

function Home(props: Props): React.ReactElement {
  const { token, route, navigation, user, theme } = props;

  const [cultures, setCultures] = useState(null);
  const [admins, setAdmins] = useState(null);
  const [inviteModal, setInviteModal] = React.useState(false);
  const [msg, setMsg] = useState<string>("");

  const email = useRef();

  const {
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    handleSubmit,
    validateField,
  } = useFormik({
    validationSchema: EmailValidation,
    initialValues: initialValues,
    onSubmit: (values) => invite(values),
  });

  const window = useWindowDimensions();
  const safeArea = useSafeAreaInsets();

  const fetchCultures = async () => {
    let cultureNames = await Culture.list();
    setCultures(cultureNames);
  };

  useEffect(() => {
    fetchCultures();
  }, []);

  const fetchAdmins = async () => {
    if (!props.token) {
      return;
    }

    const admins = user.superUser ? await Admin.list(token) : [user];
    setAdmins(admins);
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  if (!token) {
    return (
      <Cultures
        navigation={props.navigation}
        token={""}
        cultures={cultures}
        onRefresh={() => fetchCultures()}
      />
    );
  }

  const onAdd = () => {
    switch (getFocusedRouteNameFromRoute(route) ?? "Cultures") {
      case "Cultures":
        setCultures([
          ...cultures,
          { name: "New Culture", modified: Date.now() },
        ]);
        break;
      case "Admins":
        setInviteModal(true);
    }
  };

  const invite = async (field: EmailField) => {
    const { email } = field;
    await validateField("email");
    try {
      await Admin.invite(email, token);
      setInviteModal(false);
    } catch (err) {
      setMsg(err.toString());
    }
  };

  const hideSnackbar = () => setMsg("");

  //Sets position of the FAB depending on the platform
  let styleFAB = {
    right: 16,
    position: Platform.OS === "web" ? "fixed" : "relative",
  };

  if (Platform.OS !== "web") {
    styleFAB["top"] = window.height - safeArea.bottom;
  } else {
    styleFAB["bottom"] = 16;
  }

  if (!admins) {
    return (
      <ActivityIndicator animating={true} size="large" style={styles.spinner} />
    );
  }

  return (
    <View style={styles.view}>
      <Tab.Navigator initialRouteName="Cultures">
        <Tab.Screen name="Cultures">
          {() => (
            <Cultures
              navigation={navigation}
              token={token}
              cultures={cultures}
              onRefresh={() => fetchCultures()}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Admins">
          {() => (
            <Admins
              token={token}
              admins={admins}
              onRefresh={() => fetchAdmins()}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
      <FAB style={styleFAB as any} icon="plus" onPress={onAdd} />
      <Portal>
        <Modal
          visible={inviteModal}
          contentContainerStyle={
            theme === "Dark" ? styles.modalDark : styles.modalLight
          }
          onDismiss={() => setInviteModal(false)}
        >
          <Text>Invite a new admin</Text>
          <TextInput
            autoFocus={true}
            textContentType="emailAddress"
            mode="outlined"
            left={<TextInput.Icon name="email" />}
            error={errors.email && touched.email}
            label="email"
            value={values.email}
            ref={email}
            onBlur={handleBlur("email")}
            onChangeText={handleChange("email")}
          />
          <View style={styles.div} />
          <Button mode="contained" onPress={handleSubmit}>
            Send Invite
          </Button>
        </Modal>
      </Portal>
      <Portal>
        <Snackbar
          visible={msg !== ""}
          onDismiss={hideSnackbar}
          action={{
            label: "Ok",
            onPress: hideSnackbar,
          }}
        >
          {msg}
        </Snackbar>
      </Portal>
    </View>
  );
}

export default connect(
  (
    state: Store,
    ownProps: {
      navigation: StackNavigationProp<Routes, "Home">;
      route: RouteProp<Routes, "Home">;
    }
  ) => ({
    navigation: ownProps.navigation,
    route: ownProps.route,
    user: state.user.user,
    token: state.user.token,
    theme: state.theme,
  }),
  null
)(Home);
