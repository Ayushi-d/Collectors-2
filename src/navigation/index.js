import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
import UploadScreen from '../screens/upload';
import UserProfileScreen from '../screens/user-profile';
import PostDetailScreen from '../screens/post-detail';
import EditProfileScreen from '../screens/edit-profile';

//common files
import {COLOR, FONT_SIZE, SPACING} from '../constants';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: COLOR.yellow,
        inactiveTintColor: COLOR.light_grey,
        activeBackgroundColor: COLOR.black,
        inactiveBackgroundColor: 'rgba(0,0,0,0.7)',
        labelStyle: {
          fontSize: FONT_SIZE.f13,
          paddingBottom: SPACING.v5,
        },
        tabStyle: {
          height: SPACING.v70,
          paddingBottom: SPACING.v20,
        },
      }}>
      <Tab.Screen
        name={Routes.Home}
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused, color, style}) => {
            return <Icon name="home" size={30} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name={Routes.Upload}
        component={UploadScreen}
        options={{
          tabBarLabel: 'Upload',
          tabBarIcon: ({focused, color, style}) => {
            return <Icon name="plus-box-multiple" size={25} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name={Routes.UserProfile}
        component={UserProfileScreen}
        options={{
          tabBarLabel: 'User',
          tabBarIcon: ({focused, color, style}) => {
            return <Icon name="account-box" size={25} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

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
          <Stack.Screen name={Routes.Home} component={MyTabs} />
          <Stack.Screen name={Routes.PostDetail} component={PostDetailScreen} />
          <Stack.Screen
            name={Routes.EditProfile}
            component={EditProfileScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default AppNavigator;
