import React, { useState } from "react";
import { Platform, useWindowDimensions } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { FAB } from "react-native-paper";

import Styles from "./styles";
import { accessibilityProps } from "react-native-paper/lib/typescript/src/components/MaterialCommunityIcon";

/**
 * Properties for {@link ToolsFAB}
 */
type InviteFABProps = {
    onPress: () => void;
  };

/**
 * ToolsFAB displays a {@link FAB.Group} that has two sub {@link FAB} one for editing and one for saving.
 *
 * @param {InviteFABProps} props
 * @returns {React.ReactElement} React component
 */
export default function ToolsFAB(props: InviteFABProps): React.ReactElement {
  const window = useWindowDimensions();
  const safeArea = useSafeAreaInsets();

  // HACK: In order to get the FAB to be positioned properly on both Web and Mobile.
  //
  // Web: use position: fixed.
  // Mobile: useWindowDimensions hook, this doesn't work on Web.
  let styles = {
    ...Styles.fab,
    right: 16,
    position: Platform.OS === "web" ? "fixed" : "relative",
  };

  if (Platform.OS !== "web") {
    styles["top"] = window.height - safeArea.bottom;
  } else {
    styles["bottom"] = 0;
  }

  return (
    <FAB
      style={styles as any}
      icon="plus"
      onPress={() => props.onPress()}
    />
  );
}