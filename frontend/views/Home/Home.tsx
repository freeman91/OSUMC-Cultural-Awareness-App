import React, { useState, useEffect, useRef } from "react";
import { View, Platform, useWindowDimensions } from "react-native";

import { connect } from "react-redux";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  FAB,
  Portal,
  Modal,
  Text,
  ActivityIndicator,
  TextInput,
  Button,
  HelperText,
} from "react-native-paper";
import { useFormik } from "formik";

import { Store } from "../../redux";
import { Admin, Culture } from "../../lib";
import { Routes } from "../../routes";

import Cultures from "./Cultures";
import Admins from "./Admins";
import styles from "./styles";
import InviteFAB from "./InviteFAB";
import Validation from "./validation";

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
 * Initial values for Login fields for Formik.
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

  const email = useRef();

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
    validationSchema: Validation,
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
      // show error message
    }
  };

  if (!admins) {
    return (
      <ActivityIndicator animating={true} size="large" style={styles.spinner} />
    );
  }

  // HACK: In order to get the FAB to be positioned properly on both Web and Mobile.
  //
  // Web: use position: fixed.
  // Mobile: useWindowDimensions hook, this doesn't work on Web.
  // const fabStyles = {
  //   margin: 16,
  //   right: 0,
  //   position: Platform.OS === "web" ? "fixed" : "absolute",
  // };

  // if (Platform.OS !== "web") {
  //   fabStyles["top"] = window.height - safeArea.bottom;
  // } else {
  //   fabStyles["bottom"] = 0;
  // }

  return (
    <View>
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
      <InviteFAB // TODO: make visible only on admins tab. Check what tab is selected?; Get theme to work correctly.
        onPress={() => setInviteModal(!inviteModal)}
      />
      <Portal>
        <Modal
          visible={inviteModal}
          contentContainerStyle={
            theme === "Dark"
              ? styles.modalDark
              : styles.modalLight /*doesn't know what theme is active*/
          }
          onDismiss={() => setInviteModal(false)}
        >
          {/* update style for text */}
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
          {errors.email && touched.email && (
            <HelperText type="error">{errors.email}</HelperText>
          )}
          <div style={{ margin: "5px" }} />
          <Button mode="contained" onPress={handleSubmit}>
            Send Invite
          </Button>
        </Modal>
      </Portal>
      {/*<FAB icon="plus" style={fabStyles as any} onPress={onAdd} />
      <Portal>
        <Modal visible={inviteModal} onDismiss={() => setInviteModal(false)}>
          <Text>Example Modal. Click outside this area to dismiss.</Text>
        </Modal>
          </Portal> */}
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
