import React from 'react';
import {Image, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {SPACING, DIMENSIONS, COLOR, FONT_SIZE} from '../constants';
import {Routes} from './routes';

//screens
import SplashScreen from '../screens/splash';
import LoginScreen from '../screens/login';
import RegisterScreen from '../screens/register';
import GetStartedScreen from '../screens/get-started';
import HomeScreen from '../screens/home';
import ForgotPasswordScreen from '../screens/forgot-password';
import OtpScreen from '../screens/otp';
import ResetPasswordScreen from '../screens/reset-password';

//common files
import {STYLE} from '../common';
const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={Routes.Splash}
          screenOptions={{headerShown: false}}>
          <Stack.Screen name={Routes.Splash} component={SplashScreen} />
          <Stack.Screen name={Routes.Login} component={LoginScreen} />
          <Stack.Screen name={Routes.Register} component={RegisterScreen} />
          <Stack.Screen name={Routes.GetStarted} component={GetStartedScreen} />
          <Stack.Screen name={Routes.Otp} component={OtpScreen} />
          <Stack.Screen
            name={Routes.ForgotPassword}
            component={ForgotPasswordScreen}
          />
          <Stack.Screen
            name={Routes.ResetPass}
            component={ResetPasswordScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default AppNavigator;
