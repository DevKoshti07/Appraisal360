import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import Toast from 'react-native-toast-message';
import RootNavigation from './src/navigation/RootNavigation';
import AuthNavigation from './src/navigation/AuthNavigation';
import SplashScreen from './src/screens/SplashScreen';
import CustomSuccessToast from './src/components/CustomSuccessToast';
import CustomErrorToast from './src/components/CustomErrorToast';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  const toastConfig: any = {
    success: ({ text1, text2, ...rest }: { text1: string, text2: string }) => (
      <CustomSuccessToast {...rest} text1={text1} text2={text2} />
    ),
    error: ({ text1, text2, ...rest }: { text1: string, text2: string }) => (
      <CustomErrorToast {...rest} text1={text1} text2={text2} />
    ),
  };

  return (
    <View style={{ flex: 1 }}>
      <RootNavigation />
      <Toast position="top" config={toastConfig} topOffset={0} />

    </View>
  );
};

export default App;
