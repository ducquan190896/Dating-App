import { StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CHAT, PARTICIPANT, USER } from '../models/index.d'
import { useDispatch } from 'react-redux'
import { useTailwind } from 'tailwind-rn/dist'
import { Button, Image } from '@rneui/base'
import { HOST_URL } from '../store/store'
import { Pressable } from 'react-native'
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { TouchableOpacity } from 'react-native'
import { updateReadStatusOfChatAction } from '../store/actions/ChatAction'

const imageUrlsDefault =   "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80";

const ChatCard = ({authUser, chat, navigation}: {authUser: USER, chat: CHAT, navigation: any}) => {
  const tw = useTailwind();
  const dispatch = useDispatch();
  const [receiver, setReceiver] =  useState<PARTICIPANT | null>(null);
  const [authParticipant, setAuthParticipant] =  useState<PARTICIPANT | null>(null);
  const image = receiver?.user?.avatarUrls && receiver?.user?.avatarUrls?.length > 0 && receiver?.user?.avatarUrls[0].startsWith("http") ? receiver?.user?.avatarUrls[0] : HOST_URL + "/api/images/image/" + receiver?.user?.avatarUrls[0];
  // const navigation = useNavigation<ChatListNavigationProp>();

  useEffect(() => {
    if(chat) {
      let participant1: PARTICIPANT = chat?.participants[0];
      let participant2: PARTICIPANT = chat?.participants[1];
      if(authUser?.id == participant1?.user?.id) {
        setReceiver(participant2);
        setAuthParticipant(participant1);
      }else {
        setReceiver(participant1);
        setAuthParticipant(participant2);
      }
    }
  }, [chat])

  const navigateToConversationScreen = () => {
    if(authParticipant?.read == false) {
      dispatch(updateReadStatusOfChatAction(chat?.id) as any);
    }
    navigation.navigate("ConversationScreen", {chatId: chat?.id});
  }

return (
  <TouchableOpacity onPress={navigateToConversationScreen} activeOpacity={0.3} style={tw('w-full border-b border-gray-300 flex-row items-center justify-between px-6 py-2')}>
      <Image source={{uri: image ? image : imageUrlsDefault}} style={[tw('rounded-full mr-4'), {width: 70, height: 70, resizeMode: 'cover'}]}></Image>   
    
        <View style={tw('flex-1 items-start justify-start')}>
          <Text style={tw('text-lg font-bold')}>{receiver?.user?.username}</Text>
          {chat?.lastMessage ? (
            <Text style={tw(`text-base ${authParticipant?.read ? "text-gray-400" : "text-black font-bold"}`)}>{chat?.lastMessage?.participant?.id == authParticipant?.id ? "You: " : ""}{chat?.lastMessage?.content}  - {chat?.lastMessage && new Date(chat?.lastMessage?.dateCreated ).toLocaleString('en-us',{ day: 'numeric', month:'short'})} </Text>
          ): (
            <Text></Text>
          )}   
        </View>
</TouchableOpacity>
)
}

export default ChatCard

const styles = StyleSheet.create({})