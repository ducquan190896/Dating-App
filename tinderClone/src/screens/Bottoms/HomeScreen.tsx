import { Alert, FlatList, Image, Keyboard, KeyboardAvoidingView, ListRenderItem, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Modal, ImageBackground } from 'react-native'
import React, { useCallback, useEffect, useState, useRef, useLayoutEffect } from 'react'
import { useTailwind } from 'tailwind-rn/dist'
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RootStackParamList } from '../../Navigators/MainStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabProps } from '../../Navigators/BottomTabs';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'
import Swiper from 'react-native-deck-swiper';
import SwipeCard from '../../components/SwipeCard';
import { useDispatch, useSelector } from 'react-redux';
import { getViewers } from '../../store/actions/ViewAction';
import { RootState } from '../../store/store';
import { VIEWER } from '../../models/index.d';
import { addLikeAction, resetLikeAction } from '../../store/actions/LikeAction';
import LoadingComponent from '../../components/LoadingComponent';

type MainHomeNavigationProp = CompositeNavigationProp<
NativeStackNavigationProp<BottomTabProps, "HomeScreen">,
NativeStackNavigationProp<RootStackParamList>
>;

const imageUrlsDefault =   "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80";

const HomeScreen = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [isSwipeRight, setIsSwipeRight] = useState<boolean>(false);
    const [matchId, setMatchId] = useState<number>(0);
    const navigation = useNavigation<MainHomeNavigationProp>();
    const tw = useTailwind();
    const {viewers, viewSuccess, viewError} = useSelector((state: RootState) => state.VIEWS);
    const [isCard, setIsCard] = useState<boolean>(false);
    const SwifRef = useRef<any>(null);
    const dispatch = useDispatch();
    const {like, likeSuccess, likeError} = useSelector((state: RootState) => state.LIKES)
  
    const swipeLeft = (cardIndex: number) => {
      if(viewers && cardIndex >= viewers.length) {
        setIsCard(true);
      }  else {
        console.log("viewers length: " + viewers.length);
        console.log(cardIndex)
      }
    }
    const swipeRight = async (cardIndex: number) => {
      if(viewers && cardIndex >= viewers.length) {
        setIsCard(true);
      } else {
        console.log("viewers length: " + viewers.length);
        console.log(cardIndex)
        dispatch(addLikeAction(viewers[cardIndex].id) as any);
        setIsSwipeRight(true);
      }
    }

    const loadViewers = useCallback(async () => {
      setIsLoading(true);
      await  dispatch(getViewers() as any);
      setIsLoading(false);
    }, [])
  
    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false
      })
    }, [])

    useEffect(() => {
      navigation.addListener("focus", () => {
        setIsLoading(true);
        loadViewers().then(() => setIsLoading(false));
      })
    }, [navigation])

    useEffect(() => {
      loadViewers();
    }, [])
    
    useEffect(() => {
      if(like && like.matchId != 0 && isSwipeRight) {
        console.log("like " +  like)
        setIsVisible(true);
        setMatchId(like?.matchId)
        dispatch(resetLikeAction() as any);
      }
     
    }, [like, swipeRight])

    const sendMessageFunction = () => {
      if(matchId == 0) {
        return;
      }
      setIsVisible(false);
      // navigate to chat room screen by matchId params
      navigation.navigate('ConversationScreen', {matchId: matchId})
      setIsSwipeRight(false);
    }

    if(isLoading) {
      return <LoadingComponent/>
    } 
  
    return (
      <SafeAreaView style={tw('flex-1 bg-white')}>
       {/* <View style={tw('w-full mb-4 h-20 flex flex-row items-center justify-between px-6 py-2 bg-white')}> */}
       {/* <Ionicons name="person" size={32} color="#FF5864" /> */}
       {/* <Image source={require("../logo.png")} style={tw('w-16 h-16 text-[#FF5864]')}></Image> */}
       {/* <AntDesign name="wechat" size={32} color="#FF5864" /> */}
       {/* </View> */}
       <View style={tw('flex-1 w-full')}>
          {viewers && (
            <Swiper 
            cards={viewers} 
            ref={SwifRef}
            cardIndex={0}
            // backgroundColor={"#4FD0E9"}
            stackSize={5}
            containerStyle={{backgroundColor: "transparent"}}
            animateCardOpacity
            verticalSwipe={false}
            onSwipedLeft={(cardIndex: number) => {
              swipeLeft(cardIndex);
            }}
           
            onSwipedRight={(cardIndex: number) => {
              swipeRight(cardIndex);
            }}
            renderCard={(card: VIEWER, cardIndex) => {
              if(isCard == true ) {
                return (
                    <View style={[tw('relative bg-white  rounded-md w-full items-center justify-center'), {height: 600}]}>
                        <Text style={tw('text-lg text-black my-4')}>No More Profiles</Text>
                    </View>
                )
              } else {
                  return <SwipeCard card={card}></SwipeCard>
              }
            }}/>      
          )}
       </View>
        <View style={tw('flex flex-row px-2 w-full mb-4 items-center justify-evenly')}>
            <TouchableOpacity onPress={() => SwifRef.current.swipeLeft()} style={tw('bg-red-200 p-2 rounded-full')}>
              <AntDesign name="close" size={30} color="red" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => SwifRef.current.swipeRight()} style={tw('bg-green-200 p-2 rounded-full')}>
            <AntDesign name="heart" size={30} color="green" />
            </TouchableOpacity>
        </View>
        <Modal visible={isVisible} animationType='slide'>
            <View style={tw('flex-1')}>
              <ImageBackground 
              source={{uri: imageUrlsDefault}} 
              resizeMode='cover' 
              style={[tw('flex-1  items-center justify-end pb-10'), {overflow: 'hidden'}]}
              blurRadius={1}
              >
                
                <Text style={tw('text-4xl font-bold text-green-400 mb-10')}>MATCH</Text>
                <TouchableOpacity style={tw('px-10 py-2 rounded-full bg-red-500 mb-4')} onPress={sendMessageFunction}>
                  <Text style={tw('font-bold text-white text-lg')}>SEND MESSAGE</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={tw('px-10 py-2 rounded-full bg-red-500')} 
                  onPress={() => {
                    setIsVisible(false);
                    setIsSwipeRight(false);
                    }}
                >
                  <Text style={tw('font-bold text-white text-lg')}>KEEP SWIPING</Text>
                </TouchableOpacity>
              </ImageBackground>
              
            </View>
        </Modal>
    </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})