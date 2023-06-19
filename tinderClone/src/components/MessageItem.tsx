import { StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CHAT, CHATMESSAGE, PARTICIPANT, USER } from '../models/index.d'
import { useDispatch, useSelector } from 'react-redux'
import { useTailwind } from 'tailwind-rn/dist'
import { Button, Image } from '@rneui/base'
import { HOST_URL, RootState } from '../store/store'
import { TouchableOpacity } from 'react-native'


const imageUrlsDefault =   "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80";


const MessageItem = ({message}: {message: CHATMESSAGE}) => {
    const tw = useTailwind()
    const {authUser} = useSelector((state: RootState) => state.USERS)
    const [isAuthUser, setIsAuthUser] =  useState<boolean>(message?.participant?.user?.id == authUser.id ? true: false)

  return (
    <>
        {isAuthUser ? (
            <View style={tw('w-full')}>
                <View style={[tw('w-2/3 my-2  flex flex-row items-center justify-end'), {alignSelf: 'flex-end'}]}>
                    <View style={tw('p-2 rounded-lg bg-gray-300')}>
                        <Text style={tw('text-base text-black')}>{message?.content}</Text>
                    </View>
                    <Image source={{uri: message?.participant?.user?.avatarUrls && message?.participant?.user?.avatarUrls?.length > 0 ? HOST_URL + "/api/images/image/" + message?.participant?.user?.avatarUrls[0] : imageUrlsDefault}} style={[tw('rounded-full ml-2 mr-2'), {width: 40, height: 40, resizeMode: 'cover'}]}></Image>  
                </View>
            </View>
        ) : (
            <View style={tw('w-full')}>
                <View style={[tw('w-2/3 my-2 flex flex-row items-center justify-start'), {alignSelf: 'flex-start'}]}>
                    <Image  source={{uri: message?.participant?.user?.avatarUrls && message?.participant?.user?.avatarUrls?.length > 0 ? HOST_URL + "/api/images/image/" + message?.participant?.user?.avatarUrls[0] : imageUrlsDefault}} style={[tw('rounded-full ml-2 mr-2'), {width: 40, height: 40, resizeMode: 'cover'}]}></Image>  
                    <View style={tw('p-2 rounded-lg bg-gray-300')}>
                        <Text style={tw('text-base text-black')}>{message?.content}</Text>
                    </View>
                </View>
            </View>
        )}
    </>
  )
}

export default MessageItem

const styles = StyleSheet.create({})