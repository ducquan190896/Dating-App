import { Alert, FlatList, Image, Keyboard, KeyboardAvoidingView, ListRenderItem, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Modal, ImageBackground } from 'react-native'
import React, { useCallback, useEffect, useState, useRef, useLayoutEffect } from 'react'
import { useTailwind } from 'tailwind-rn/dist'
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { RootStackParamList } from '../../Navigators/MainStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux';
import { getViewers } from '../../store/actions/ViewAction';
import { HOST_URL, RootState } from '../../store/store';
import { BottomTabProps } from '../../Navigators/BottomTabs';
import { getLikingUsers } from '../../store/actions/LikeAction';
import { LIKE, MATCH } from '../../models/index.d';
import { getMatchesForAuthAction } from '../../store/actions/MatchAction';
import LoadingComponent from '../../components/LoadingComponent';

type LikingUsersNavigationProp = CompositeNavigationProp<
NativeStackNavigationProp<BottomTabProps, "MatchesScreen">,
NativeStackNavigationProp<RootStackParamList>
>;

const imageUrlsDefault =   "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80";



const MatchesScreen = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigation = useNavigation<LikingUsersNavigationProp>();
    const {matches, matchSuccess, matchError} = useSelector((state: RootState) => state.MATCHES)
    const {users, authUser, authError, authSuccess} = useSelector((state: RootState) => state.USERS)
    const dispatch = useDispatch();
    const tw = useTailwind();
    const today = new Date().getTime();
    console.log(authUser ?  authUser : "null")

    const getAge = (birth: string) => {
        const birthDate = new Date(birth).getTime();
        const age = (today - birthDate)/ (1000 * 60 * 60 *24 * 365);
        return age;
    }

    const loadMatches = useCallback(async () => {
        setIsLoading(true);
        await dispatch(getMatchesForAuthAction() as any);
        setIsLoading(false);
    }, [matches, matchSuccess])

    useEffect(() => {
        setIsLoading(true);
        loadMatches().then(() => setIsLoading(false));
    }, [])

    useEffect(() => {
        navigation.addListener('focus', () => {
            setIsLoading(true);
            loadMatches().then(() => setIsLoading(false));
        })
    }, [navigation])

    if(isLoading) {
        return <LoadingComponent/>
    }


    const handleRenderItem: ListRenderItem<any> = ({item}: {item: MATCH}) => {
        const matchUser = authUser && authUser?.id == item?.user1?.id ? item?.user2 : item?.user1;
        const image = matchUser.avatarUrls && matchUser.avatarUrls.length > 0 && matchUser.avatarUrls[0].startsWith("http") ? matchUser.avatarUrls[0]  : HOST_URL + "/api/images/image/" +  matchUser.avatarUrls[0];
        return (
            <TouchableOpacity onPress={() =>  navigation.navigate('ConversationScreen', {matchId: item.id})} style={[tw('bg-white rounded-md mx-2 my-2 border border-4 border-[#6203fc]'), {width: 170}]}>
                <Image source={{uri: image ? image : imageUrlsDefault}} style={[tw('w-full'), {height: 170}]}></Image>
                <View style={tw('flex items-center justify-center')}>
                    <Text style={tw('mt-4 text-lg text-zinc-700 font-bold')}>{matchUser.firstname} {matchUser.surename}</Text>
                    <Text style={tw('text-lg text-zinc-700 font-bold')}>age: {getAge(matchUser.birth).toFixed(0)}</Text>
                    <View style={tw('flex-row items-center my-2 justify-center')}>
                        <EvilIcons name='location' size={24} color="#6b7280" ></EvilIcons>
                        <Text style={tw('text-base text-gray-500 font-bold')}>{item?.distance && item.distance.toFixed(2)} km</Text>
                    </View>
                </View>
            </TouchableOpacity>
        
        )
    }

    if(matches && matches?.length < 1) {
        return (
            <SafeAreaView style={tw('flex-1 bg-gray-100')}>
                 <Text style={tw('text-2xl font-bold text-gray-500 my-2 ml-4')}>Your Matches</Text>
                 <View style={[tw('flex-1 items-center justify-center w-full h-full '), {gap: 20}]}>
                    <Text style={tw('text-2xl font-bold text-gray-500 my-2 ml-4')}>No Matches</Text>
                 </View>
            </SafeAreaView>
        )
    }

  return (
    <SafeAreaView style={tw('flex-1 bg-white')}>
      <Text style={tw('text-2xl font-bold text-[#6203fc] my-2 ml-4 mx-auto ')}>Your Matchings</Text>
      <View style={[tw('flex-1 items-center justify-center w-full h-full '), {gap: 20}]}>
        <FlatList 
            numColumns={2}
            data={ matches && matches.length > 0 && matches}
            keyExtractor={(item: any) => item.id}
            renderItem={handleRenderItem}
            showsVerticalScrollIndicator={false}
        >
        </FlatList>
      </View>
      
    </SafeAreaView>
  )
}

export default MatchesScreen

const styles = StyleSheet.create({})