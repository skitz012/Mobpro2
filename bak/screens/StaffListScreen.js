import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import axios from 'axios';

export default function StaffListScreen({ navigation }) {
  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/staff') //update url
      .then(response => setStaffList(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={staffList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
            <Button
              title="View Profile"
              onPress={() => navigation.navigate('StaffProfile', { staffId: item.id })}
            />
          </View>
        )}
      />
      <Button
        title="Add New Staff"
        onPress={() => navigation.navigate('AddEditStaff')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: { marginBottom: 16, padding: 16, backgroundColor: '#f9f9f9' },
});