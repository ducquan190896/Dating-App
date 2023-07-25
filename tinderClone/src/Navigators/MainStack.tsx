import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ChangePassword from '../screens/ChangePassword';
import BottomTabs from './BottomTabs';
import PreferenceForm from '../screens/PreferenceForm';
import ConversationScreen from '../screens/Bottoms/ConversationScreen';

export type RootStackParamList = {
    Login: undefined,
    SignUp: undefined,
    ChangePassword: undefined,
    BottomTabs: undefined,
    PreferenceForm: undefined,
    ConversationScreen: {
      chatId?: number,
      matchId?: number
  }
};

const stack = createNativeStackNavigator<RootStackParamList>();

const MainStack = () => {
  return (
   <stack.Navigator>
    <stack.Screen component={LoginScreen} options={{headerShown: false}} name="Login"></stack.Screen>
    <stack.Screen component={SignUpScreen} options={{headerShown: false}} name="SignUp"></stack.Screen>
    <stack.Screen component={PreferenceForm} options={{headerShown: false}} name="PreferenceForm"></stack.Screen>
    <stack.Screen component={ChangePassword} options={{title: "back"}} name="ChangePassword"></stack.Screen>
    <stack.Screen component={BottomTabs} options={{headerShown: false}} name="BottomTabs"></stack.Screen>
    <stack.Screen component={ConversationScreen} options={{headerShown: false }} name="ConversationScreen"></stack.Screen>
   </stack.Navigator>
  )
}

export default MainStack

const styles = StyleSheet.create({})