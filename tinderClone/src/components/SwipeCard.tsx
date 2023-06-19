import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTailwind } from 'tailwind-rn/dist';
import Swiper from 'react-native-swiper'
import { VIEWER } from '../models/index.d';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { HOST_URL } from '../store/store';

const imageUrlsDefault = [
    "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80",
    "https://images.unsplash.com/photo-1664575602554-2087b04935a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c"
]



const SwipeCard = ({card}: {card: VIEWER}) => {
    const tw = useTailwind();
    const today = new Date().getTime();
    const birthDate = new Date(card?.birth).getTime();
    const age = (today - birthDate)/ (1000 * 60 * 60 *24 * 365);
    const randomIndex = Math.floor(Math.random() * imageUrlsDefault.length)
    const defaultImage = imageUrlsDefault[randomIndex]
    if(card == null) {
        return (
            <View style={[tw('relative bg-gray-200  rounded-md w-full'), {height: 600}]}>
                <Text style={tw('text-lg text-black my-4')}>No More Profiles</Text>
            </View>
        )
    }

  return (
    <View style={[tw('relative bg-gray-200  rounded-md w-full'), {height: 600}]}>
        <Image source={{uri: card.avatarUrls && card.avatarUrls.length > 0 ? HOST_URL + "/api/images/image/" + card.avatarUrls[0] : defaultImage}} style={[tw('w-full absolute -top-4 rounded-md'), {height: "90%"}]}></Image> 
        <View style={tw('absolute bottom-0 bg-white w-full flex flex-row items-center justify-center px-6 my-2')}>
            <View style={[tw('absolute -top-4 py-2 px-8 bg-[#6203fc] rounded-full'), {zIndex: 10}]}>
                <Text style={tw('text-white font-bold')}>{card.matchingRate.toFixed(2)}% Match</Text>
            </View>
            <View style={tw('flex items-center justify-center my-2 mt-8')}>
                <View style={tw('flex-row items-center justify-center')}>
                    <Text style={tw('text-2xl font-bold text-black mr-4')}>{card.firstname} {card.surename}</Text>
                    <Text style={tw('text-2xl text-black font-bold mr-4')}>{age && age.toFixed(0)}</Text>
                </View>
                <View style={tw('my-2 flex-row items-center justify-center')}>
                    <EvilIcons name='location' size={36} color="#6b7280" ></EvilIcons>
                    <Text style={tw('text-base text-gray-500 font-bold')}>{card.distance.toFixed(2)} km away</Text>
                </View>
                <View style={[tw(' w-full flex-row items-center'), {flexWrap: 'wrap'}]}>
                    {card && card.interests.length > 0 && card.interests.map(interest =>  <Text key={interest.id} style={tw('text-base text-gray-500')}>{interest.name}. </Text>)}
                </View>
            </View>
            
        </View>
    </View>
  )
}

export default SwipeCard

const styles = StyleSheet.create({})