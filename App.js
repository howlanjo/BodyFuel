import { StyleSheet, Text, View } from 'react-native';

import { FirebaseProvider } from './context/firebaseContext';
import HomePage from './screens/homePage';
import LoginScreen from './screens/loginScreen'
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import UserProfile from './screens/userProfile';
import UserSettings from './screens/settings';
import { WorkoutDataProvider } from './context/workoutContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <FirebaseProvider>
      <WorkoutDataProvider>
        <NavigationContainer>
          <Stack.Navigator>
          <Stack.Screen name='Login Screen' 
            component={LoginScreen}  
            />
            
            <Stack.Screen name='Home Page' 
            component={HomePage}  
            options={{title: "User Home"}}
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
      </WorkoutDataProvider>
    </FirebaseProvider>
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
