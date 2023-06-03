import { StyleSheet, Text, View } from 'react-native';

import HomePage from './screens/homePage';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import UserProfile from './screens/userProfile';
import UserSettings from './screens/settings';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home Page' 
        component={HomePage}  
        options={{title: "User Feed"}}
        />
        <Stack.Screen name='User Profile' 
        component={UserProfile}  
        options={{title: "User Profile"}}
        />
        <Stack.Screen name='User Settings' 
        component={UserSettings}  
        options={{title: "User Settings"}}
        />
        </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
