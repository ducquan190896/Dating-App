import { Alert, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import React, { useCallback, useEffect, useState, useRef, useLayoutEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTailwind } from 'tailwind-rn';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabProps } from '../../Navigators/BottomTabs';
import { FlatList } from 'react-native';
import { getChatsByAuthUserAction } from '../../store/actions/ChatAction';
import { ListRenderItem } from 'react-native';
import ChatCard from '../../components/ChatCard';
import { CHAT } from '../../models/index.d';
import { RootStackParamList } from '../../Navigators/MainStack';
import LoadingComponent from '../../components/LoadingComponent';

type ChatListNavigationProp = CompositeNavigationProp<
NativeStackNavigationProp<BottomTabProps, "ChatList">,
NativeStackNavigationProp<RootStackParamList>
>;

const ChatList = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const {users, authUser, authError, authSuccess} = useSelector((state: RootState) => state.USERS);
    const {chats, chat, chatError, chatSuccess} = useSelector((state: RootState) => state.CHATS);
    const tw = useTailwind();
    const windownWith = useWindowDimensions().width;
    const dispatch = useDispatch();
    const navigation = useNavigation<ChatListNavigationProp>();

    const loadChats = useCallback(async () => {
        if(authUser) {
            setIsRefreshing(true);
            await dispatch(getChatsByAuthUserAction() as any)
            setIsRefreshing(false)
        }
    }, [authUser, dispatch])

    const handleRenderItem: ListRenderItem<any> = ({item}: {item: CHAT}) => (
        <ChatCard navigation={navigation} chat={item} authUser={authUser}></ChatCard>
    )

    useEffect(() => {
        navigation.addListener('focus', () => {
            setIsLoading(true);
            loadChats().then(() => setIsLoading(false));
        })
    }, [navigation])

    useEffect(() => {
        setIsLoading(true);
        loadChats().then(() => setIsLoading(false));
    }, [authUser, dispatch])

    if(isLoading) {
        return <LoadingComponent/>
    }

    return (
    <View style={tw('bg-white flex-1 px-2')}>
        <FlatList
            refreshing={isRefreshing}
            onRefresh={loadChats}
            data={chats}
            keyExtractor={(item: any) => item.id}
            renderItem={handleRenderItem}
            showsVerticalScrollIndicator={false}
        >
        </FlatList>
    </View>
    )
}

export default ChatList

const styles = StyleSheet.create({})