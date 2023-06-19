import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OtherUserProfile from '../screens/Bottoms/OtherUserProfile';
import LikingUsersScreen from '../screens/Bottoms/LikingUsersScreen';
import { USER } from '../models/index.d';

export type LikeStackParamList = {
    LikingUsersScreen: undefined,
    OtherUserProfile: {
        user: USER,
        distance: number,
        matchId: number
    }
};

const stack = createNativeStackNavigator<LikeStackParamList>();
const LikeStack = () => {
    return (
        <stack.Navigator initialRouteName='LikingUsersScreen'>
         <stack.Screen component={LikingUsersScreen} options={{headerShown: false}} name="LikingUsersScreen"></stack.Screen>
         <stack.Screen component={OtherUserProfile} name="OtherUserProfile" options={{title: ""}}></stack.Screen>
        </stack.Navigator>
       )
}

export default LikeStack

const styles = StyleSheet.create({})