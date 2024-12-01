import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import axios from 'axios';

export default function StaffProfileScreen({ route, navigation }) {
  const { staffId } = route.params;
  const [staff, setStaff] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/staff/${staffId}`) // Replace with your backend URL
      .then(response => setStaff(response.data))
      .catch(error => console.error(error));
  }, [staffId]);

  if (!staff) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{staff.name}</Text>
      <Text>{staff.phone}</Text>
      <Text>{staff.department}</Text>
      <Text>{staff.address}</Text>
      <Button
        title="Edit Profile"
        onPress={() => navigation.navigate('AddEditStaff', { staffId })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  name: { fontSize: 24, fontWeight: 'bold' },
});
