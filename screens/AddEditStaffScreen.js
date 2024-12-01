import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

export default function AddEditStaffScreen({ route, navigation }) {
  const { staffId } = route.params || {};
  const [staff, setStaff] = useState({
    name: '',
    phone: '',
    department: '',
    address: '',
  });

  useEffect(() => {
    if (staffId) {
      axios.get(`http://localhost:3000/staff/${staffId}`) // Replace with your backend URL
        .then(response => setStaff(response.data))
        .catch(error => console.error(error));
    }
  }, [staffId]);

  const handleSubmit = () => {
    const url = staffId
      ? `http://localhost:3000/staff/${staffId}`
      : 'http://localhost:3000/staff';

    const method = staffId ? 'put' : 'post';

    axios[method](url, staff)
      .then(() => {
        navigation.goBack();
      })
      .catch(error => console.error(error));
  };

  return (
    <View style={styles.container}>
      <Text>Name:</Text>
      <TextInput
        style={styles.input}
        value={staff.name}
        onChangeText={(text) => setStaff({ ...staff, name: text })}
      />
      <Text>Phone:</Text>
      <TextInput
        style={styles.input}
        value={staff.phone}
        onChangeText={(text) => setStaff({ ...staff, phone: text })}
      />
      <Text>Department:</Text>
      <TextInput
        style={styles.input}
        value={staff.department}
        onChangeText={(text) => setStaff({ ...staff, department: text })}
      />
      <Text>Address:</Text>
      <TextInput
        style={styles.input}
        value={staff.address}
        onChangeText={(text) => setStaff({ ...staff, address: text })}
      />
      <Button title="Save" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { borderWidth: 1, marginBottom: 16, padding: 8 },
});
