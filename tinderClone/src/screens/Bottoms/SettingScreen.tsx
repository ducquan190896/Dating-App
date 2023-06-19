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
import { ImageData, Interest, LIKE } from '../../models/index.d';
import { ProfileStackParamList } from '../../Navigators/ProfileStack';
import { addImageAction, addInterestAction, getAuthUserAction, removeImageAction, removeInterestAction, updatePreferenceAction, updateProfileAction } from '../../store/actions/userAction';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { Badge } from '@rneui/themed';
import AsyncStorage from "@react-native-async-storage/async-storage"
import {Picker} from '@react-native-picker/picker';
import { Slider } from '@rneui/base';

type AccountDetailNavigationProp = CompositeNavigationProp<
NativeStackNavigationProp<ProfileStackParamList, "AccountDetailScreen">,
NativeStackNavigationProp<BottomTabProps>
>;


const SettingScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const navigation = useNavigation<AccountDetailNavigationProp>();
  const dispatch = useDispatch();
  const tw = useTailwind();
  const {users, authUser, authError, authSuccess} = useSelector((state: RootState) => state.USERS);
  const [distance, setDistance] = useState<number>(authUser?.preference?.distance);
  const [genderOrientation, setGenderOrientation] = useState<string>(authUser?.preference?.genderOrientation);
  const [maxAge, setMaxAge] = useState<number>(authUser?.preference?.maxAge);
  const [minAge, setMinAge] = useState<number>(authUser?.preference?.minAge);

  useLayoutEffect(() => {
    navigation.setOptions({
        headerTitle(props) {
            return (
              <TouchableOpacity onPress={() => setIsVisible(true)} style={tw('ml-16')}>
                <Text style={tw('font-bold text-lg text-black')}>Edit Preference</Text>
              </TouchableOpacity>
            )
        },
    })
  }, [])

  const loadAuthUser = useCallback(async () => {
    dispatch(getAuthUserAction() as any);
  }, []);

  useEffect(() => {
    if(!authUser) {
      setIsLoading(true);
      loadAuthUser().then(() => setIsLoading(false));
    }
  }, [])

  const updateFunction = async () => {
    if(distance && genderOrientation && minAge && maxAge) {
      try {
        const token : string | null = await AsyncStorage.getItem("token");  
        const newPreference = {
          distance,
          genderOrientation,
          maxAge,
          minAge
        };
        const res = await axios.put(HOST_URL + "/api/preferences/preference", newPreference, {
          headers: {
            "Authorization": token ?? ""
          }
        }); 
        const data = await res.data;
        console.log(data);
        const user = authUser;
        user.preference = data;
        dispatch(updatePreferenceAction(user) as any);

        setDistance(user?.preference?.distance);
        setGenderOrientation(user?.preference?.genderOrientation)
        setMinAge(user?.preference?.minAge);
        setMaxAge(user?.preference?.maxAge);

      } catch (err) {
        Alert.alert("updating preference failed");
      } 
    } else {
      Alert.alert("please fill in required information");
    }
    setIsVisible(false);
  }

  const closeModal = async () => {
    setDistance(authUser?.preference?.distance);
    setGenderOrientation(authUser?.preference?.genderOrientation)
    setMinAge(authUser?.preference?.minAge);
    setMaxAge(authUser?.preference?.maxAge);
    setIsVisible(false);
  }


  return (
    <SafeAreaView style={tw('flex-1')}>
       <View style={tw('w-full bg-white mt-20 border border-gray-300')}>
        <View style={tw('flex flex-row items-center border-b border-gray-300 justify-between px-4 py-2')}>
          <Text style={tw('text-black text-lg')}>Distance range</Text>
          <Text style={tw('text-black text-lg')}>{authUser?.preference?.distance}</Text>
        </View>
        <View style={tw('flex flex-row items-center border-b border-gray-300 justify-between px-4 py-2')}>
          <Text style={tw('text-black text-lg')}>Gender preference</Text>
          <Text style={tw('text-black text-lg')}>{authUser?.preference?.genderOrientation?.toLowerCase()}</Text>
        </View>
        <View style={tw('flex flex-row items-center border-b border-gray-300 justify-between px-4 py-2')}>
          <Text style={tw('text-black text-lg')}>Maximum age</Text>
          <Text style={tw('text-black text-lg')}>{authUser?.preference?.maxAge}</Text>
        </View>
        <View style={tw('flex flex-row items-center border-b border-gray-300 justify-between px-4 py-2')}>
          <Text style={tw('text-black text-lg')}>Minimum age</Text>
          <Text style={tw('text-black text-lg')}>{authUser?.preference?.minAge}</Text>
        </View>
      </View>
      <Modal visible={isVisible} animationType='slide' transparent={true}>
            <View style={[tw(' bg-white rounded-2xl items-center justify-center flex px-4'), {height: "90%", top: "10%",  width: "100%"}, styles.shadow]}>
                <View style={tw('mb-4 w-full')}>
                  <Text style={tw('mb-2 text-black text-base')}>Gender preference</Text>
                  <View style={[tw('w-full bg-white rounded-md border border-gray-400 text-zinc-700 font-bold text-lg bg-gray-200 mb-4'), {zIndex: 10, padding: 1}]}>
                    <Picker
                      selectedValue={genderOrientation}
                      onValueChange={(itemValue, itemIndex) => {
                          setGenderOrientation(itemValue)
                          console.log(itemValue)
                      }}
                      dropdownIconColor="white"
                      mode={Picker.MODE_DROPDOWN}
                      style={tw('bg-white border p-2 border-gray-400 w-full')}
                    >
                      <Picker.Item style={tw('bg-white p-2 text-lg border border-gray-400 w-full')} label="female" value="FEMALE"></Picker.Item>  
                      <Picker.Item style={tw('bg-white p-2 text-lg border border-gray-400 w-full')} label="male" value="MALE"></Picker.Item>   
                      <Picker.Item style={tw('bg-white p-2 text-lg border border-gray-400 w-full')} label="others" value="OTHERS"></Picker.Item> 
                    </Picker>
                  </View>
                  <View style={tw('mb-4 w-full')}>
                    <Text style={tw('mb-6 text-black text-base')}>Distance (km)</Text>
                    <Slider
                        value={distance}
                        onValueChange={setDistance}
                        maximumValue={1000}
                        minimumValue={1}
                        step={1}
                        allowTouchTrack
                        trackStyle={{ height: 5, backgroundColor: 'transparent' }}
                        thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
                        thumbProps={{
                          children: (
                            <View style={[tw('h-20 w-20'), {bottom: 10, right: 10}]}>
                              <View style={[tw('h-8 w-8 rounded-full bg-green-500')]}></View>
                              <Text style={tw('absolute -top-6 font-bold text-base')}>{distance}</Text>
                            </View>
                           
                          ),
                        }}
                    />
                  </View>
                  <View style={tw('mb-4 w-full')}>
                    <Text style={tw('mb-6 text-black text-base')}>Maximum age</Text>
                    <Slider
                        value={maxAge}
                        onValueChange={setMaxAge}
                        maximumValue={80}
                        minimumValue={18}
                        step={1}
                        allowTouchTrack
                        trackStyle={{ height: 5, backgroundColor: 'transparent' }}
                        thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
                        thumbProps={{
                          children: (
                            <View style={[tw('h-20 w-20'), {bottom: 10, right: 10}]}>
                              <View style={[tw('h-8 w-8 rounded-full bg-green-500')]}></View>
                              <Text style={tw('absolute -top-6 font-bold text-base')}>{maxAge}</Text>
                            </View>
                           
                          ),
                        }}
                    />
                  </View>
                  <View style={tw('mb-4 w-full')}>
                    <Text style={tw('mb-6 text-black text-base')}>Maximum age</Text>
                    <Slider
                        value={minAge}
                        onValueChange={setMinAge}
                        maximumValue={80}
                        minimumValue={18}
                        step={1}
                        allowTouchTrack
                        trackStyle={{ height: 5, backgroundColor: 'transparent' }}
                        thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
                        thumbProps={{
                          children: (
                            <View style={[tw('h-20 w-20'), {bottom: 10, right: 10}]}>
                              <View style={[tw('h-8 w-8 rounded-full bg-green-500')]}></View>
                              <Text style={tw('absolute -top-6 font-bold text-base')}>{minAge}</Text>
                            </View>
                           
                          ),
                        }}
                    />
                  </View>
                </View> 
                <TouchableOpacity style={[tw(' mx-auto px-10 py-2 rounded-full bg-green-500 mx-auto'), {width: 200}]} onPress={updateFunction}>
                  <Text style={tw('mx-auto font-bold text-white text-lg')}>Update</Text>
                </TouchableOpacity>     
                <TouchableOpacity style={[tw('mx-auto px-10 py-2 mt-4 rounded-full bg-red-500 mx-auto'), {width: 200}]} onPress={closeModal}>
                  <Text style={tw('mx-auto font-bold text-white text-lg')}>Cancel</Text>
                </TouchableOpacity>             
            </View>
      </Modal>
    </SafeAreaView>
  )
}

export default SettingScreen

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