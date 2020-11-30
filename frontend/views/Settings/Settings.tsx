import React, { useState } from "react";
import { ScrollView, StyleSheet, Linking } from "react-native";

import {
  Divider,
  List,
  IconButton,
  Snackbar,
  Portal,
} from "react-native-paper";
import { connect } from "react-redux";
import { StackNavigationProp } from "@react-navigation/stack";
import { bindActionCreators, Dispatch } from "redux";

import { resetUser, Store } from "../../redux";
import { Routes } from "../../routes";

import ThemeToggler from "./ThemeToggler";
import DownloadedCultures from "./DownloadedCultures";
import Feedback from "./Feedback";
import AccountSettings from "./AccountSettings";
import { disclaimerURL } from "../../constants";

// HACK: This is so that icons line up with other icons on the
// Settings page.
const Styles = StyleSheet.create({
  rightIcon: {
    right: -5,
  },

  leftIcon: {
    left: -5,
  },
});

type Props = {
  resetUser: () => void;
  navigation: StackNavigationProp<Routes, "Settings">;
  token: string;
  email: string;
};

/**
 * Settings page displays downloaded cultures, disclaimer, and dark theme toggler.
 *
 * @returns {React.ReactElement}
 */
function Settings(props: Props): React.ReactElement {
  const { token, email, resetUser, navigation } = props;

  const openLink = () => Linking.openURL(disclaimerURL);
  const [msg, setMsg] = useState("");

  return (
    <ScrollView>
      <ThemeToggler />
      <Divider />
      <List.Item
        title="Disclaimer"
        onPress={openLink}
        left={(props) => (
          <IconButton
            {...props}
            style={Styles.leftIcon}
            onPress={openLink}
            icon="file-document-outline"
          />
        )}
        right={(props) => (
          <IconButton
            {...props}
            icon="eye"
            style={Styles.rightIcon}
            onPress={openLink}
          />
        )}
      />
      <Divider />
      <AccountSettings
        email={email}
        navigation={navigation}
        token={token}
        logout={resetUser}
      />
      <Divider />
      <Feedback />
      <Divider />
      <DownloadedCultures
        onUpdateFinish={(err) => setMsg(err || "Update finished")}
      />
      <Portal>
        <Snackbar
          visible={msg !== ""}
          onDismiss={() => setMsg("")}
          action={{ label: "Ok", onPress: () => setMsg("") }}
        >
          {msg}
        </Snackbar>
      </Portal>
    </ScrollView>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      resetUser,
    },
    dispatch
  );

export default connect(
  (
    state: Store,
    ownProps: {
      navigation: StackNavigationProp<Routes, "Settings">;
    }
  ) => ({
    token: state.user.token,
    email: state.user.user.email,
    navigation: ownProps.navigation,
  }),
  mapDispatchToProps
)(Settings);
