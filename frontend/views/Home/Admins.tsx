import React, { useState } from "react";
import { FlatList, Alert, View, Platform } from "react-native";

import {
  List,
  IconButton,
  Modal,
  Portal,
  Text,
  Button,
  TextInput,
  FAB,
} from "react-native-paper";

import { Admin } from "../../lib";

import styles from "./styles";

/**
 * Properties for {@link Admins}
 */
type AdminProps = {
  token: string;
  admins: Admin[];
  // Refresh admins
  onRefresh: () => void;
};

/**
 * Component that displays a list of components of {@link Admin}
 *
 * @param {AdminProps} props
 * @returns {React.ReactElement} React component
 */
export default function Admins(props: AdminProps): React.ReactElement {
  const { token, admins, onRefresh } = props;
  const [users, setUsers] = useState(null);
  const [visible, setVisible] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const [editText, setEditText] = React.useState("");
  const [inviteText, setInviteText] = React.useState("");

  const onDelete = async (email: string) => {
    try {
      await Admin.delete(email, token);
    } catch {
      // show error message
    }
    onRefresh();
  };

  // HACK: In order to get the FAB to be positioned properly on both Web and Mobile.
  //
  // Web: use position: fixed.
  // Mobile: useWindowDimensions hook, this doesn't work on Web.
  const fabStyles = {
    margin: 16,
    right: 0,
    position: Platform.OS === "web" ? "fixed" : "absolute",
  };

  const onEdit = (user: {
    email: string;
    name: string;
    superUser: boolean;
  }) => {
    //TODO: update Admin.update() perams
    //    Don't send any requests
    try {
      //Admin.update(email, props.token)
      onRefresh();
    } catch {
      // show error message
    }
  };

  const onInvite = async () => {
    try {
      await Admin.invite(inviteText, props.token);
    } catch (err) {
      // show error message
    }
  };

  const superUserDeleteCheck = (item: any) => {
    if (!item.superUser)
      return (
        <IconButton
          icon="delete"
          onPress={() => setDeleteModal(!deleteModal)}
        />
      );
  };

  // if (!users) {
  //   return (
  //     <ActivityIndicator animating={true} size="large" style={styles.spinner} />
  //   );
  // }

  return (
    <View>
      <FlatList
        style={{ flex: 1 }}
        data={admins}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <View>
              <List.Item
                title={item.email}
                onPress={() => {}}
                right={() =>
                  props.token !== "" && (
                    <View style={{ flexDirection: "row" }}>
                      <IconButton
                        icon="pencil"
                        onPress={() => setEditModal(!editModal)}
                      />
                      {superUserDeleteCheck(item)}
                    </View>
                  )
                }
              />
              <Portal>
                <Modal
                  visible={deleteModal}
                  contentContainerStyle={styles.modal}
                  onDismiss={() => setDeleteModal(false)}
                >
                  <Text>Are you sure you want to delete {item.email}</Text>
                  <IconButton
                    icon="delete"
                    onPress={() => onDelete(item.email)}
                  />

                  <Button mode="outlined" onPress={() => setDeleteModal(false)}>
                    Cancle
                  </Button>
                </Modal>
              </Portal>
              <Portal>
                <Modal
                  visible={editModal}
                  contentContainerStyle={styles.modal}
                  onDismiss={() => setEditModal(false)}
                >
                  <Text>Enter the new Email:{item.email}</Text>
                  <TextInput
                    label="Email"
                    value={editText}
                    onChangeText={(editText) => setEditText(editText)}
                  />
                  <Button
                    mode="outlined"
                    onPress={() => {
                      onEdit(item);
                      setEditModal(false);
                    }}
                  >
                    Save
                  </Button>
                  <Button mode="outlined" onPress={() => setEditModal(false)}>
                    Cancle
                  </Button>
                </Modal>
              </Portal>
            </View>
          );
        }}
      />
      <FAB
        icon="plus"
        style={fabStyles as any}
        onPress={() => setVisible(!visible)}
      />
      <Portal>
        <Modal
          visible={visible}
          contentContainerStyle={styles.modal}
          onDismiss={() => setVisible(false)}
        >
          <TextInput
            label="Email"
            value={inviteText}
            onChangeText={(inviteText) => setInviteText(inviteText)}
          />
          <Button
            mode="outlined"
            onPress={() => {
              /*onInvite(); */ setVisible(false);
            }}
          >
            Send Invite
          </Button>
        </Modal>
      </Portal>
    </View>
  );
}
