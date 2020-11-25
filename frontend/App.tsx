import React, { useState, useEffect } from "react";

import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { createStore } from "redux";
import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";

import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { registerRootComponent } from "expo";

import {
  Home,
  Login,
  CultureView,
  EditInsight,
  Register,
  Settings,
  Header,
} from "./views";

import { Routes } from "./routes";
import { colors, ThemeStorage, ThemeType } from "./constants";
import { Reducer, updateTheme, Store } from "./redux";

const store = createStore(Reducer);

function App() {
  useEffect(() => {
    const getTheme = async () => {
      let theme: ThemeType;
      try {
        theme = (await AsyncStorage.getItem(ThemeStorage)) as ThemeType;
      } catch (err) {
        theme = "Light";
      }

      if (!theme) {
        theme = "Light";
      }

      store.dispatch(updateTheme(theme));
    };

    getTheme();
  }, []);

  return (
    <Provider store={store}>
      <NavigatorScreen />
    </Provider>
  );
}

type NavigatorProps = {
  theme: ThemeType;
};

/**
 * Navigator contained inside of {@link App} manages navigation and theming.
 *
 * @remark This component isn't just inside of {@link App} because it needs to connect
 * to the Redux store in order to properly re-render when a change to the theme is done.
 *
 * @param {NavigatorProps} props
 * @returns {React.ReactElement}
 */
function Navigator(props: NavigatorProps): React.ReactElement {
  const { theme } = props;

  const Stack = createStackNavigator<Routes>();
  const linking = {
    prefixes: ["/"],
  };

  const paperThemeMode = theme === "Dark" ? PaperDarkTheme : PaperDefaultTheme;

  const paperTheme = {
    ...paperThemeMode,
    ...colors,
  };

  return (
    <NavigationContainer
      linking={linking}
      theme={theme === "Dark" ? DarkTheme : DefaultTheme}
    >
      <PaperProvider theme={paperTheme}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Culture"
            component={CultureView}
            options={Header}
          />
          <Stack.Screen name="Home" component={Home} options={Header} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="EditInsight" component={EditInsight} />
          <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
}

const NavigatorScreen = connect(
  (state: Store) => ({
    theme: state.theme,
  }),
  null
)(Navigator);

export default registerRootComponent(App);
