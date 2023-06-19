import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ChangePassword from '../screens/ChangePassword';
import BottomTabs from './BottomTabs';
import PersonalProfile from '../screens/Bottoms/PersonalProfile';
import OtherUserProfile from '../screens/Bottoms/OtherUserProfile';
import AccountDetailScreen from '../screens/Bottoms/AccountDetailScreen';
import SettingScreen from '../screens/Bottoms/SettingScreen';

export type ProfileStackParamList = {
  PersonalProfile: undefined,
  AccountDetailScreen: undefined,
  SettingScreen: undefined
};

const stack = createNativeStackNavigator<ProfileStackParamList>();
const ProfileStack = () => {
    return (
        <stack.Navigator initialRouteName='PersonalProfile'>
         <stack.Screen component={PersonalProfile} options={{headerShown: false}} name="PersonalProfile"></stack.Screen>
         <stack.Screen component={AccountDetailScreen} name="AccountDetailScreen"></stack.Screen>
         <stack.Screen component={SettingScreen} name="SettingScreen"></stack.Screen>
        </stack.Navigator>
       )
}

export default ProfileStack

const styles = StyleSheet.create({})