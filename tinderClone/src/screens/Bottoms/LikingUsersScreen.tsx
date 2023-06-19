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
import { LIKE, USER } from '../../models/index.d';
import { LikeStackParamList } from '../../Navigators/LikeStack';
import LoadingComponent from '../../components/LoadingComponent';

type LikingUsersNavigationProp = CompositeNavigationProp<
NativeStackNavigationProp<LikeStackParamList, "LikingUsersScreen">,
NativeStackNavigationProp<BottomTabProps>
>;

const imageUrlsDefault =   "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80";



const LikingUsersScreen = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigation = useNavigation<LikingUsersNavigationProp>();
    const {likes, likeSuccess, likeError} = useSelector((state: RootState) => state.LIKES)
    const dispatch = useDispatch();
    const tw = useTailwind();
    const today = new Date().getTime();

    const getAge = (birth: string) => {
        const birthDate = new Date(birth).getTime();
        const age = (today - birthDate)/ (1000 * 60 * 60 *24 * 365);
        return age;
    }

    const loadLikingUsers = useCallback(async () => {
        setIsLoading(true);
        await dispatch(getLikingUsers() as any);
        setIsLoading(false);
    }, [likes, likeSuccess])

    useEffect(() => {
      navigation.addListener('focus', () => {
          setIsLoading(true);
          loadLikingUsers().then(() => setIsLoading(false));
      })
  }, [navigation])

    useEffect(() => {
        loadLikingUsers();
    }, [])

    const navigateToLikingUserProfile = (like: LIKE) => {
        // navigate to the profile of the liking User
        navigation.navigate("OtherUserProfile", {user: like.likingUser, distance: like.distance, matchId: like.matchId});
    }

    if(isLoading) {
      return <LoadingComponent/>
    }

    const handleRenderItem: ListRenderItem<any> = ({item}: {item: LIKE}) => (
        <TouchableOpacity onPress={() => navigateToLikingUserProfile(item)} style={[tw(`bg-white rounded-md mx-2 my-2 ${item?.matchId != 0 ? "border border-2 border-[#6203fc]" :  "border border-2 border-red-500"}`), {width: 170}]}>
             <Image source={{uri: item.likingUser.avatarUrls && item.likingUser.avatarUrls.length > 0 ? HOST_URL + "/api/images/image/" +  item.likingUser.avatarUrls[0] : imageUrlsDefault}} style={[tw('w-full rounded-md'), {height: 170}]}></Image>
             <View style={tw('flex items-center justify-center')}>
                <Text style={tw('mt-4 text-lg text-zinc-700 font-bold')}>{item?.likingUser?.firstname} {item?.likingUser?.surename}</Text>
                <Text style={tw('text-lg text-zinc-700 font-bold')}>age: {getAge(item?.likingUser?.birth).toFixed(0)}</Text>
                <View style={tw('flex-row items-center my-2 justify-center')}>
                    <EvilIcons name='location' size={24} color="#6b7280" ></EvilIcons>
                    <Text style={tw('text-base text-gray-500 font-bold')}>{item.distance.toFixed(2)} km</Text>
                </View>
             </View>
        </TouchableOpacity>
    )

    if(likes && likes?.length < 1) {
      return (
          <SafeAreaView style={tw('flex-1 bg-gray-100')}>
               <Text style={tw('text-2xl font-bold text-gray-500 my-2 ml-4')}>People Liked You</Text>
               <View style={[tw('flex-1 items-center justify-center w-full h-full '), {gap: 20}]}>
                  <Text style={tw('text-2xl font-bold text-gray-500 my-2 ml-4')}>No like</Text>
               </View>
          </SafeAreaView>
      )
    }


  return (
    <SafeAreaView style={tw('flex-1 bg-gray-100')}>
      <Text style={tw('text-2xl font-bold text-gray-500 my-2 ml-4')}>People Liked You</Text>
      <View style={[tw('flex-1 items-center justify-center w-full h-full '), {gap: 20}]}>
        <FlatList 
            numColumns={2}
            data={ likes && likes.length > 0 && likes}
            keyExtractor={(item: any) => item.id}
            renderItem={handleRenderItem}
            showsVerticalScrollIndicator={false}
        >
        </FlatList>
      </View>
      
    </SafeAreaView>
  )
}

export default LikingUsersScreen

const styles = StyleSheet.create({})