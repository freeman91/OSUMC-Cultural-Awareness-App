import React, { useState } from "react";
import { FlatList, Alert, View, Platform } from "react-native";
import { connect } from "react-redux";
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

import { Store } from "../../redux";
import { Admin } from "../../lib";
import styles from "./styles";

/**
 * Properties for {@link Admins}
 */
type AdminProps = {
  token: string;
  admins: Admin[];
  theme: string;
  onRefresh: () => void;
};

/**
 * Component that displays a list of components of {@link Admin}
 *
 * @param {AdminProps} props
 * @returns {React.ReactElement} React component
 */
function Admins(props: AdminProps): React.ReactElement {
  const { theme, token, admins, onRefresh } = props;
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const [editName, setEditName] = React.useState("");
  const [editEmail, setEditEmail] = React.useState("");

  const onDelete = async (email: string) => {
    try {
      await Admin.delete(email, token);
    } catch {
      // show error message
    }
    onRefresh();
  };

  const onEdit = (user: {
    email: string;
    name: string;
    superUser: boolean;
  }) => {
    //TODO: update Admin.update() perams
    //    Doesn't send any requests
    try {
      //Admin.update(editName, editEmail, props.token)
      onRefresh();
    } catch {
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

  console.log(theme)

  return (
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
                contentContainerStyle={theme === 'Dark' ? styles.modalDark : styles.modalLight}
                onDismiss={() => setDeleteModal(false)}
              >
                <Text>Are you sure you want to delete {item.email}?</Text>
            {/* TODO: Currently opens modal for every item. Very bad*/}
                <Button
                  mode="contained"
                  onPress={() => {
                      onDelete(item.email); 
                      setDeleteModal(false)}
                  }
                >
                  Delete {item.email}
                </Button>

                <Button mode="contained" onPress={() => setDeleteModal(false)}>
                  Cancel
                </Button>
              </Modal>
            </Portal>
            <Portal>
              <Modal
                visible={editModal}
                contentContainerStyle={theme === 'Dark' ? styles.modalDark : styles.modalLight}
                onDismiss={() => setEditModal(false)}
              > {/* TODO: Currently opens modal for every item. Very bad*/}
                <Text>Enter the new name for {item.name}:</Text>
                <TextInput
                  label="Name"
                  value={editName}
                  onChangeText={(newName) => setEditName(newName)}
                />
                <Text>Enter the new Email for {item.email}:</Text>
                <TextInput
                  label="Email"
                  value={editEmail}
                  onChangeText={(newEmail) => setEditEmail(newEmail)}
                />
                <Button
                  mode="contained"
                  onPress={() => {
                    onEdit(item);
                    setEditModal(false);
                  }}
                >
                  Save
                </Button>
                <Button mode="contained" onPress={() => setEditModal(false)}>
                  Cancel
                </Button>
              </Modal>
            </Portal>
          </View>
        );
      }}
    />
  );
}

 
export default connect(
  (
    state: Store,
  ) => ({
    theme: state.theme,
  }),
  null
)(Admins);