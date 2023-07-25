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
import { useNavigation, CompositeNavigationProp, RouteProp, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux';
import { getViewers } from '../../store/actions/ViewAction';
import { HOST_URL, RootState } from '../../store/store';
import { BottomTabProps } from '../../Navigators/BottomTabs';
import { addLikeAction, getLikingUsers, resetLikeAction } from '../../store/actions/LikeAction';
import { Interest, LIKE } from '../../models/index.d';
import { LikeStackParamList } from '../../Navigators/LikeStack';
import PagerView from 'react-native-pager-view';
import { useWindowDimensions } from 'react-native';
import HomeCardDots from '../../components/HomeCardDots';
import BadgeInterest from '../../components/BadgeInterest';
import { ScrollView } from 'react-native';

type OtherUserProfileNavigationProp = CompositeNavigationProp<
NativeStackNavigationProp<LikeStackParamList, "OtherUserProfile">,
NativeStackNavigationProp<BottomTabProps>
>;

type otherUserRouteProp = RouteProp<LikeStackParamList, "OtherUserProfile">;


const imageUrlsDefaults = [
  "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
  "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80",
  "https://images.unsplash.com/photo-1664575602554-2087b04935a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
  "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c"
]



const OtherUserProfile = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [match, setMatch] = useState<number | null>(null);
  const navigation = useNavigation<OtherUserProfileNavigationProp>();
  const dispatch = useDispatch();
  const {params} = useRoute<otherUserRouteProp>();
  const {like, likeSuccess, likeError} = useSelector((state: RootState) => state.LIKES);
  const windownWith = useWindowDimensions().width;
  const {user, distance, matchId} = params;
  const tw = useTailwind();
  const today = new Date().getTime();
  console.log(user);

  const getAge = (birth: string) => {
    const birthDate = new Date(birth).getTime();
    const age = (today - birthDate)/ (1000 * 60 * 60 *24 * 365);
    return age;
  }

  useEffect(() => {
    dispatch(resetLikeAction() as any);
  }, [params])

  useEffect(() => {
    if(matchId) {
      console.log("matchId " + matchId);
      setMatch(matchId);
    }
  }, [matchId])

  const LikeUserFunction = async () => {
    if(user && !matchId) {
      await dispatch(addLikeAction(user.id) as any)
    }
  }

  useEffect(() => {
    if(like) {
      setMatch(like?.matchId);
    }
  }, [like, addLikeAction])

  return (
    <SafeAreaView style={tw('flex-1 bg-white p-0 relative')}>
       <TouchableOpacity onPress={() => navigation.goBack()} style={[tw('bg-white absolute rounded-full p-2 items-center justify-center'), {top: 8, left: 8, zIndex: 10}]}>
          <AntDesign name='arrowleft' size={30} color={"#6203fc"}></AntDesign>
       </TouchableOpacity>
      <ScrollView>
        <View style={tw('flex-1 bg-white items-center justify-start py-0 mt-0')}>
          <PagerView 
                style={[tw('mb-2 mt-0 py-0'), { width: windownWith, height: 450}]} 
                initialPage={0}
                onPageSelected={(e) => {
                  console.log(e.nativeEvent);
                  setActiveIndex(e.nativeEvent.position);
                }}
              >
                {user?.avatarUrls?.length > 0 ? (
                  user?.avatarUrls?.map((item: string, index: number ) => (
                    <Image key={index} source={{uri: item.startsWith("http") ? item : HOST_URL + "/api/images/image/" + item}} style={[tw(''), {width: windownWith, height: 500, resizeMode: 'cover'}]}></Image>  
                  ))
                ): (
                  imageUrlsDefaults.map((item: string, index: number ) => (
                    <Image key={index} source={{uri: item}} style={[tw(''), {width: windownWith, height: 500, resizeMode: 'cover'}]}></Image>  
                  ))
                )}
          </PagerView>
          {user?.avatarUrls?.length > 1 && (
            <HomeCardDots arrayLength={user?.avatarUrls?.length > 0 ? user?.avatarUrls?.length : imageUrlsDefaults.length} activeIndex={activeIndex}></HomeCardDots>
          )}
          <View style={tw('w-full mb-2 flex items-start justify-center px-4')}>
            <View style={tw('my-2 mt-4 flex-row justify-center items-center')}>
              <Text style={tw('mr-6 text-2xl text-black font-bold')}>{user.firstname} {user.surename}</Text>
              <Text style={tw('mr-10 text-2xl text-gray-500 font-bold')}>{getAge(user?.birth).toFixed(0)}</Text>
              <View style={tw('flex-1 items-end mr-6')}>
                <TouchableOpacity onPress={LikeUserFunction}>
                    <AntDesign name='heart' size={30} color={match != null ? "#6203fc" : "#d1d5db"}></AntDesign>
                  </TouchableOpacity>
              </View>
            </View>
            <View style={tw('my-2 flex-row justify-center')}>
              <EvilIcons name='location' size={30} color={"#6b7280"}></EvilIcons>
              <Text style={tw('ml-2 text-lg text-gray-500')}>{distance.toFixed(2)} km</Text>
            </View>
            <Text style={tw('ml-2 text-lg text-black')}>{user.description}</Text>
            <View style={[tw('flex flex-row w-full'), {flexWrap: 'wrap'}]}>
              {user && user?.interests && user?.interests.length > 0 && user.interests.map((interest: Interest) => <BadgeInterest key={interest.id}  interest={interest} isOther={true}></BadgeInterest>)}
            </View>
          </View>
          <View style={tw('w-full flex items-start justify-center px-2 my-2 mx-auto')}>
            {user?.avatarUrls?.length > 0 ? (
              <>
                <View style={[tw('flex flex-row w-full ml-4'), {flexWrap: 'wrap'}]}>
                    {user?.avatarUrls && user?.avatarUrls.length > 0 && user?.avatarUrls.map((item: string, index) => {
                      return (
                        <View key={index} style={tw('mr-4 mb-4 my-2')}>
                          <Image source={{uri: item.startsWith("http") ? item : HOST_URL + "/api/images/image/" +  item}} style={[tw('rounded-md'), {height: 100, width: 100, resizeMode: 'center'}]}></Image>  
                        </View>
                      )
                    })}
                </View>
              </>
              ):(
                <View style={[tw('flex flex-row w-full ml-4'), {flexWrap: 'wrap'}]}>
                  {imageUrlsDefaults.map((item: string, index) => {
                    return (
                      <View key={index} style={tw('mr-4 mb-4 my-2')}>
                        <Image source={{uri: item}} style={[tw('rounded-md'), {height: 100, width: 100, resizeMode: 'center'}]}></Image>  
                      </View>
                    )
                  })}
                </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default OtherUserProfile

const styles = StyleSheet.create({})