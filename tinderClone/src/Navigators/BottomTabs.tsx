import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Bottoms/HomeScreen';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LikingUsersScreen from '../screens/Bottoms/LikingUsersScreen';
import MatchesScreen from '../screens/Bottoms/MatchesScreen';
import ProfileStack from './ProfileStack';
import LikeStack from './LikeStack';
import ChatList from '../screens/Bottoms/ChatList';


export type BottomTabProps = {
   HomeScreen: undefined,
   LikeStack: undefined,
   MatchesScreen: undefined,
   ProfileStack: undefined,
   ChatList: undefined,
}

const tab = createBottomTabNavigator<BottomTabProps>();

const BottomTabs = () => {
    return (
        <tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarInactiveTintColor: '#c7c9c9',
                tabBarActiveTintColor: '#6203fc'
            }}
            initialRouteName='HomeScreen'
        >
            <tab.Screen 
                options={{
                headerShown: false,
                tabBarIcon: ({color}) => (
                    <AntDesign name="home" size={28} color={color} />
                    )
                }} 
                name="HomeScreen" 
                component={HomeScreen}
            ></tab.Screen>
            <tab.Screen 
                options={{
                headerShown: false,
                tabBarIcon: ({color}) => (
                    <Entypo name="star" size={30} color={color} />
                    )
                }} 
                name="LikeStack" 
                component={LikeStack}
            ></tab.Screen>
            <tab.Screen 
                options={{
                headerShown: false,
                tabBarIcon: ({color}) => (
                    <Entypo name="heart" size={30} color={color} />
                    )
                }} 
                name="MatchesScreen" 
                component={MatchesScreen}
            ></tab.Screen>
            <tab.Screen 
                options={{
                headerShown: false,
                tabBarIcon: ({color}) => (
                    <Ionicons name="chatbox" size={30} color={color} />
                    )
                }} 
                name="ChatList" 
                component={ChatList}
            ></tab.Screen>
             <tab.Screen 
                options={{
                headerShown: false,
                tabBarIcon: ({color}) => (
                    <Ionicons name="person" size={30} color={color} />
                    )
                }} 
                name="ProfileStack" 
                component={ProfileStack}
            ></tab.Screen>
        </tab.Navigator>
    )
}

export default BottomTabs

const styles = StyleSheet.create({})
