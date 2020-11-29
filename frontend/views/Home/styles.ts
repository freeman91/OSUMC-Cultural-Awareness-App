import { StyleSheet } from "react-native";

import { darkTheme, lightTheme } from "../../theme";

export default StyleSheet.create({
  spinner: { top: "50%", position: "relative" },

  view: {
    flex: 1,
  },

  modalLight: {
    padding: 20,
    backgroundColor: lightTheme.colors.background,
  },

  modalDark: {
    padding: 20,
    backgroundColor: darkTheme.colors.background,
  },

  list: {
    flex: 1,
  },

  fab: {
    // TODO: Emulate Fixed for the Floating Action Button
  },
});
