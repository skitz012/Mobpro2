import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StaffListScreen from './screens/StaffListScreen';
import StaffProfileScreen from './screens/StaffProfileScreen';
import AddEditStaffScreen from './screens/AddEditStaffScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StaffList">
        <Stack.Screen name="StaffList" component={StaffListScreen} />
        <Stack.Screen name="StaffProfile" component={StaffProfileScreen} />
        <Stack.Screen name="AddEditStaff" component={AddEditStaffScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
