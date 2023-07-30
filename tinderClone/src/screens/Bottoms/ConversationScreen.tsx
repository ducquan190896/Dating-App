import { Alert, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, useWindowDimensions, View, Modal } from 'react-native'
import React, { useCallback, useEffect, useState, useRef, useLayoutEffect, } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { HOST_URL, RootState } from '../../store/store';
import { RootStackParamList } from '../../Navigators/MainStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useNavigation, useRoute, CompositeNavigationProp, useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { ListRenderItem, FlatList } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist'
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CHAT, CHATMESSAGE, MESSAGEFORM, USER } from '../../models/index.d';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import MessageItem from '../../components/MessageItem';
import { KeyboardAvoidingView } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import { Keyboard } from 'react-native';
import { TextInput } from 'react-native';
import { Image } from 'react-native';
import { getChatByAuthUserAndReceiverAction, getChatByIdAction, getChatByMatchAction } from '../../store/actions/ChatAction';
import { BottomTabProps } from '../../Navigators/BottomTabs';
import LoadingComponent from '../../components/LoadingComponent';
import SockJS from "sockjs-client";
import {Client, over} from "stompjs"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addReportAction, checkReportByReportedUserIdAction } from '../../store/actions/ReportAction';
import { addBlockAction, checkBlockExistByBlockedUserAndAuthAction } from '../../store/actions/BlockAction';
import { createShareKey, decrypt, encrypt } from '../../Utils/EndToEndEcryption';
import { addMessageAction, getAllMessagesByChatIDAction, messageResetAction, receiveMessageFromSocket } from '../../store/actions/MessageAction';

type ConversationScreenNavigationProp = CompositeNavigationProp<
NativeStackNavigationProp<RootStackParamList, "ConversationScreen">,
NativeStackNavigationProp<BottomTabProps>
>;
type ConversationScreenRouteProp = RouteProp<RootStackParamList, "ConversationScreen">;


const ConversationScreen = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const {authUser} = useSelector((state: RootState) => state.USERS);
    const {chats, chat, chatError, chatSuccess} = useSelector((state: RootState) => state.CHATS);
    const {chatMessages, chatMessage} = useSelector((state: RootState) => state.MESSAGES);
    const {report, isReported} = useSelector((state: RootState) => state.REPORTS);
    const {block, isblocked} = useSelector((state: RootState) => state.BLOCKS);
    const tw = useTailwind();
    const dispatch = useDispatch();
    const navigation = useNavigation<ConversationScreenNavigationProp>();
    const {params} = useRoute<ConversationScreenRouteProp>();
    const {chatId, matchId} = params;
    const scrollRef = useRef<FlatList>(null)
    const height: number = useWindowDimensions().height
    const [receiver, setReceiver] = useState<USER | null>(null)
    const [messageInput, setMessageInput] = useState<string>("")
    const [stompClient, setStompClient] = useState<any | null>(null);
    const [visible, setVisible] = useState<boolean>(false);
  
    const loadChatMessages = useCallback(async () => {
        if (chat && receiver && authUser) {
            setIsRefreshing(true)
            dispatch(getAllMessagesByChatIDAction(chat?.id, receiver) as any);
            setIsRefreshing(false)
        }
    }, [chat, chatMessages, receiver, authUser])

    const loadChat = useCallback(async () => {
        if(authUser && chatId) {
            setIsRefreshing(true);
            await dispatch(getChatByIdAction(chatId) as any);
            setIsRefreshing(false);
        }
        if(authUser && matchId) {
            setIsRefreshing(true);
            await dispatch(getChatByMatchAction(matchId) as any);
            setIsRefreshing(false);
        }
    }, [authUser, dispatch, chatId, matchId])

    const loadCheckReport = useCallback( async () => {
       if(receiver) {
        dispatch(checkReportByReportedUserIdAction(receiver?.id) as any)
       }
    }, [receiver, authUser, chat])

    const loadCheckBlock = useCallback( async () => {
        if(receiver) {
         dispatch(checkBlockExistByBlockedUserAndAuthAction(receiver?.id) as any)
        }
     }, [receiver, authUser, chat])
  
    const handleRenderItem: ListRenderItem<any> = ({item}: {item: CHATMESSAGE}) => (
        <MessageItem message={item}></MessageItem>
    )

    useEffect(() => {
        dispatch(messageResetAction() as any);
        setIsLoading(true);
        loadChat()
    }, [authUser, dispatch, chatId, matchId])

    useEffect(() => {
        loadChatMessages().then(() => setIsLoading(false));
        if(chat && chat.participants) {
            const receiver = chat?.participants[0].user?.id == authUser.id ? chat.participants[1].user : chat.participants[0].user;
            dispatch(checkReportByReportedUserIdAction(receiver?.id) as any);
            dispatch(checkBlockExistByBlockedUserAndAuthAction(receiver?.id) as any);
            setReceiver(receiver);
        }
    }, [authUser, dispatch, chat])

    useEffect(() => {
        loadCheckReport();
        loadCheckBlock();
    }, [receiver])

    useEffect(() => {
        scrollRef?.current?.scrollToEnd()
    }, [chatMessages])


    const connect = async () => {
        if(!chat) {
            return;
        } else {
            const token = await AsyncStorage.getItem("token");
            let sock = SockJS(HOST_URL + "/socket");
            let stompClient : any = over(sock);
            setStompClient(stompClient);
            if(stompClient.status !== "CONNECTED") {
                stompClient.connect({username: authUser?.username, token: token}, (frame: any) => {
                    stompClient.subscribe("/chatroom/" + chat.id, messageReceived)
                }, notConnected)
            }
        }
    }
    const messageReceived =  (payload: any) => {
        const taker = chat?.participants[0].user?.id == authUser.id ? chat.participants[1].user : chat.participants[0].user;
        const message : CHATMESSAGE = JSON.parse(payload.body);
        dispatch(receiveMessageFromSocket(message, taker) as any);
    }
  
    const notConnected = () => {
        console.log("not connected");
    }

    useEffect(() => {
        if(stompClient == null) {
          connect();
        }
    }, [stompClient])

    const addMessageFunction = async () => {
        if(stompClient && chat && messageInput && authUser && receiver) {
            const token = await AsyncStorage.getItem("token") ?? "";
            const messageForm : MESSAGEFORM = {
                content: messageInput,
                chatId: chat.id,
                token: token
            }
            dispatch(addMessageAction(messageForm, receiver) as any);
            // stompClient.send("/app/message", {}, JSON.stringify(messageForm));
            setMessageInput("")
        }
    }

    const reportFunction = async () => {
        if(receiver && !isReported) {
            await dispatch(addReportAction(receiver?.id) as any);
            setVisible(false);
        }  
    }
    const blockFunction = async () => {
        if(receiver && !isblocked) {
            await dispatch(addBlockAction(receiver?.id) as any);
            setVisible(false);
        }  
    }
    
    if(isLoading || !chat ||  (chatMessages.length > 0 && chatMessages?.[0].chatId != chat?.id)) {
        return <LoadingComponent/>
    }

    const goback = async () => {
        dispatch(messageResetAction() as any);
        navigation.goBack();
    }

  return (
    <SafeAreaView style={tw('flex-1')}>
        <View style={tw('flex-row items-center w-full border-b-2 border-gray-300 py-2 px-4')}>  
            <TouchableOpacity onPress={goback} style={tw('ml-2 mr-6')}>
                <Ionicons name="arrow-back" size={34} color="#6203fc" /> 
            </TouchableOpacity>
            <Image source={{uri: receiver?.avatarUrls && receiver?.avatarUrls?.length > 0 && receiver?.avatarUrls[0].startsWith("http") ?  receiver?.avatarUrls[0] :  HOST_URL + "/api/images/image/" + receiver?.avatarUrls[0]}} style={[tw('rounded-full mr-2'), {width: 40, height: 40, resizeMode: 'cover'}]}></Image>
            <Text style={tw('text-2xl text-black')}>{receiver?.username}</Text>
            <View style={tw('flex-1 items-end')}>
                <TouchableOpacity onPress={() => setVisible(prev => !prev)} style={[tw('w-6 h-6 rounded-full bg-[#6203fc] items-center justify-center'), {padding: 2}]}>
                    <Entypo name="dots-three-vertical" size={16} color="white" /> 
                </TouchableOpacity>
            </View>
        </View>
        <View style={tw('bg-white flex-1 px-2')}>
            <FlatList
                refreshing={isRefreshing}
                onRefresh={loadChatMessages}
                data={chatMessages}
                keyExtractor={(item: any) => item.id}
                renderItem={handleRenderItem}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={30}
                initialScrollIndex={0}
                onContentSizeChange={() => scrollRef?.current?.scrollToEnd()}
                style={[{height: height - 90}]}
                // inverted
            >
            </FlatList>
            <KeyboardAvoidingView >
                <TouchableWithoutFeedback  onPress={Keyboard.dismiss}>         
                    <>
                        <View style={[tw('w-full py-2 flex-row items-center justify-center'), {}]}>
                            {authUser && <Image style={[tw('w-10 h-10 rounded-full bg-white ml-2 mr-2'), {resizeMode: 'contain'}]} source={{uri: authUser?.avatarUrls && authUser?.avatarUrls?.length > 0 && authUser?.avatarUrls[0].startsWith("http") ?  authUser?.avatarUrls[0] : HOST_URL + "/api/images/image/" + authUser?.avatarUrls[0]}}></Image>}
                            <TextInput editable={isblocked ? false : true} value={messageInput} onChangeText={(text: string) => setMessageInput(text)} placeholder='your comment'  style={tw('flex-1  text-base bg-gray-300 rounded-full py-2 px-6')} ></TextInput>
                            <TouchableOpacity disabled={isblocked} onPress={addMessageFunction}  style={tw('mx-2')}>
                                <Ionicons name="send-sharp" size={24} color="#6203fc" />
                            </TouchableOpacity>
                        </View>
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </View>  
        <Modal animationType='slide' visible={visible} transparent={true} >
            <View style={[tw(' rounded-lg items-center justify-center flex px-4 relative'), {height: "25%", top: "77%",  width: "100%", borderTopColor: "#b7b5ba", borderTopWidth: 2, backgroundColor: "#F0F0F0"}, styles.shadow]}>  
                <TouchableOpacity disabled={isReported} onPress={reportFunction} style={[tw(` mx-auto px-4 rounded-full my-2 ${isReported ? "bg-gray-500" : "bg-red-500"} mx-auto py-2`), {width: 120}]} >
                  <Text style={tw('mx-auto text-white text-lg')}>{isReported ? "Reported" : "Report"}</Text>
                </TouchableOpacity> 
                <TouchableOpacity disabled={isblocked} onPress={blockFunction}  style={[tw(` mx-auto px-4 rounded-full my-2 ${isblocked ? "bg-gray-500" : "bg-red-500"} mx-auto py-2`), {width: 120}]}>
                  <Text style={tw('mx-auto text-white text-lg')}>{isblocked ? "Blocked": "Block"}</Text>
                </TouchableOpacity>  
                <TouchableOpacity onPress={() => setVisible(false)} style={[tw('mx-auto px-2 rounded-full my-2 bg-[#6203fc] mx-auto py-2 absolute'), {top: 0, right: 6}]}>
                  {/* <Text style={tw('mx-auto text-white text-lg')}>Cancel</Text> */}
                  <AntDesign name="close" size={24} color="white" />
                </TouchableOpacity>            
            </View>
        </Modal>
    </SafeAreaView>
  )
}

export default ConversationScreen

const styles = StyleSheet.create({
    shadow: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.00,
      
      elevation: 24,
    }
  })