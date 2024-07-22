import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';
import Home from '../screens/Home';
import DrawerNavigator from './DrawerNavigator';
import ManagerDetails from '../screens/ManagerDetails';
import StaffDetails from '../screens/StaffDetails';
import AuthNavigation from './AuthNavigation';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../screens/SplashScreen';
import EmpList from '../screens/EmpList';
import ManagerList from '../screens/ManagerList';

const Stack = createNativeStackNavigator();

const RootNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">

        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />


        <Stack.Screen
          name="AuthNavigation"
          component={AuthNavigation}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name='DrawerNavigator'
          component={DrawerNavigator}
          options={{ headerShown: false }} />


        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ManagerDetails"
          component={ManagerDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StaffDetails"
          component={StaffDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EmpList"
          component={EmpList}
          options={{ headerTitle: 'Employee List' }}
        />

        <Stack.Screen
          name="ManagerList"
          component={ManagerList}
          options={{ headerTitle: 'Manager List' }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
