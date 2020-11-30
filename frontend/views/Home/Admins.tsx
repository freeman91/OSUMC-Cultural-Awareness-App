import React, { useState, useRef } from "react";
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
  // FAB,
  // HelperText,
} from "react-native-paper";
import { useFormik } from "formik";

import { Store } from "../../redux";
import { Admin } from "../../lib";
import styles from "./styles";
import { EmailNameValidation } from "./validation";

/**
 * Invite Email screen fields for Formik.
 */
type EditFields = {
  email: string;
  name: string;
};

/**
 * Initial values for email field for Formik.
 */
const initialValues: EditFields = {
  // This field could be updated with useEffect to enter the user's saved email address.
  email: "",
  name: "",
};

/**
 * Properties for {@link Admins}
 */
type AdminProps = {
  token: string;
  admins: Admin[];
  theme: string;
  user: Admin;
  onRefresh: () => void;
};

/**
 * Component that displays a list of components of {@link Admin}
 *
 * @param {AdminProps} props
 * @returns {React.ReactElement} React component
 */
function Admins(props: AdminProps): React.ReactElement {
  const { user, theme, token, admins, onRefresh } = props;
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(admins[0]);

  const name = useRef();

  const {
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    handleSubmit,
    validateField,
    setFieldValue,
  } = useFormik({
    validationSchema: EmailNameValidation,
    initialValues: initialValues,
    onSubmit: (values) => onEdit(values),
  });

  const onDelete = async () => {
    try {
      await Admin.delete(selectedItem.email, token);
    } catch {
      // show error message
    }
    onRefresh();
  };

  const onEdit = async (fields: EditFields) => {
    const { name, email } = fields
    try {
      Admin.update(email, name, props.token)
      setEditModal(false)
      onRefresh();
    } catch {
      // TODO: show error message
    }
  };

  const superUserDeleteCheck = (item: any) => {
    if (!item.superUser && item.email != user.email)
      return (
        <IconButton
          icon="delete"
          onPress={() => {
            setDeleteModal(!deleteModal);
            setSelectedItem(item);
          }}
        />
      );
  };

  const handleEditClick = (admin: Admin) => {
    setFieldValue("name", admin.name);
    setFieldValue("email", admin.email);
    setEditModal(!editModal);
  }

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
                      onPress={() => handleEditClick(item)}
                    />
                    {superUserDeleteCheck(item)}
                  </View>
                )
              }
            />
            <Portal>
              <Modal
                visible={deleteModal}
                contentContainerStyle={
                  theme === "Dark" ? styles.modalDark : styles.modalLight
                }
                onDismiss={() => setDeleteModal(false)}
              >
                {/*TODO: update style for text */}
                <Text>
                  Are you sure you want to delete {selectedItem.email}?
                </Text>
                <Button
                  mode="contained"
                  onPress={() => {
                    onDelete();
                    setDeleteModal(false);
                  }}
                  style={{ backgroundColor: "red" }}
                >
                  Delete
                </Button>
              </Modal>
            </Portal>
            <Portal>
              <Modal
                visible={editModal}
                contentContainerStyle={
                  theme === "Dark" ? styles.modalDark : styles.modalLight
                }
                onDismiss={() => setEditModal(false)}
              >
                {/*TODO: update style for text */}
                <Text>Edit admin Account</Text>
                <TextInput
                  mode="outlined"
                  left={<TextInput.Icon name="email" />}
                  label="email"
                  value={values.email}
                  disabled={true}
                />
                <TextInput
                  autoFocus={true}
                  textContentType="name"
                  mode="outlined"
                  left={<TextInput.Icon name="account-badge" />}
                  error={errors.name && touched.name}
                  label="name"
                  value={values.name}
                  ref={name}
                  onBlur={handleBlur("name")}
                  onChangeText={handleChange("name")}
                />
                <div style={{ margin: "5px" }} />
                <Button mode="contained" onPress={handleSubmit}>
                  Save
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
  (state: Store) => ({
    user: state.user.user,
    theme: state.theme,
  }),
  null
)(Admins);
