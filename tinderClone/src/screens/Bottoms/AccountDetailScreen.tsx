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
import { addImageAction, addInterestAction, getAuthUserAction, removeImageAction, removeInterestAction, updateProfileAction } from '../../store/actions/userAction';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { Badge } from '@rneui/themed';
import AsyncStorage from "@react-native-async-storage/async-storage"
import BadgeInterest from '../../components/BadgeInterest';

type AccountDetailNavigationProp = CompositeNavigationProp<
NativeStackNavigationProp<ProfileStackParamList, "AccountDetailScreen">,
NativeStackNavigationProp<BottomTabProps>
>;

const AccountDetailScreen = () => {
    const [profileVisible, setProfileVisible] = useState<boolean>(false);
    const [interstVisible, setInterstVisible] = useState<boolean>(false);
    const navigation = useNavigation<AccountDetailNavigationProp>();
    const dispatch = useDispatch();
    const tw = useTailwind();
    const {users, authUser, authError, authSuccess} = useSelector((state: RootState) => state.USERS);
    const today = new Date().getTime();
    const birthDate = new Date(authUser?.birth).getTime();
    const age = (today - birthDate)/ (1000 * 60 * 60 *24 * 365);
    const [firstname, setFirstname] = useState<string>(authUser?.firstname);
    const [surename, setSurename] = useState<string>(authUser?.surename);
    const [description, setDescription] = useState<string>(authUser?.description);
    const [newInterest, setNewInterest] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle(props) {
                return (
                  <TouchableOpacity onPress={EditProfile} style={tw('ml-20')}>
                    <Text style={tw('font-bold text-lg text-black')}>Edit Profile</Text>
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

    const EditProfile = () => {
      setProfileVisible(true)
    }

    const updateProfileFunction = async () => {
      if(firstname && surename && description) {
        await dispatch(updateProfileAction(firstname, surename, description) as any);
        setProfileVisible(false)
      } else {
        Alert.alert("please type required information");
      }
    }

    const closeProfileModal = () => {
      setProfileVisible(false)
    }

   
    const openInterestModal = () => {
      setInterstVisible(true)
    }

    const closeInterstModal = () => {
      setNewInterest("");
      setInterstVisible(false)
    }

    const addInterestFunction = async () => {
      if(newInterest) {
        try {
          const token : string | null = await AsyncStorage.getItem("token");  
          const res = await axios.post(HOST_URL + "/api/interests/interest", {name: newInterest.toLowerCase()}, {
            headers: {
              "Authorization": token ?? ""
            }
          }); 
          const data = await res.data;
          console.log(data);
          const interests = [...authUser.interests, data];
          const user = authUser;
          user.interests = interests;
          dispatch(addInterestAction(user) as any);
          setNewInterest("");
        } catch (err) {
          Alert.alert("cannot remove interest");
        }
        setInterstVisible(false)
      }  
    }

  return (
    <SafeAreaView style={tw('flex-1')}>
      <View style={tw('w-full bg-white mt-10 border border-gray-300')}>
        <View style={tw('flex flex-row items-center border-b border-gray-300 justify-between px-4 py-2')}>
          <Text style={tw('text-black text-lg')}>Firstname</Text>
          <Text style={tw('text-black text-lg')}>{authUser?.firstname}</Text>
        </View>
        <View style={tw('flex flex-row items-center border-b border-gray-300 justify-between px-4 py-2')}>
          <Text style={tw('text-black text-lg')}>Surename</Text>
          <Text style={tw('text-black text-lg')}>{authUser?.surename}</Text>
        </View>
        <View style={tw('flex flex-row items-center border-b border-gray-300 justify-between px-4 py-2')}>
          <Text style={tw('text-black text-lg')}>Username</Text>
          <Text style={tw('text-black text-lg')}>{authUser?.username}</Text>
        </View>
        <View style={tw('flex flex-row items-center border-b border-gray-300 justify-between px-4 py-2')}>
          <Text style={tw('text-black text-lg')}>Gender</Text>
          <Text style={tw('text-black text-lg')}>{authUser?.gender?.toLowerCase()}</Text>
        </View>
        <View style={tw('flex flex-row items-center border-b border-gray-300 justify-between px-4 py-2')}>
          <Text style={tw('text-black text-lg')}>Age</Text>
          <Text style={tw('text-black text-lg')}>{age.toFixed(0)}</Text>
        </View>
        <View style={tw('flex items-start px-4 py-2')}>
          <Text style={tw('text-black text-lg')}>Description:</Text>
          <Text style={tw('text-black text-lg mt-2')}>{authUser?.description}</Text>
        </View>
      </View>
      <View style={tw('w-full bg-white mt-10 border border-gray-300 py-2 px-4')}>
        <View style={tw('flex-row items-center mb-2')}>
          <Text style={tw('my-2 mr-4 text-lg text-gray-500 font-bold')}>Your Interests</Text>
          <TouchableOpacity onPress={openInterestModal}>
            <AntDesign name='addfolder' size={28} color={"gray"}></AntDesign>
          </TouchableOpacity>
        </View>
        <View style={[tw('flex flex-row w-full'), {flexWrap: 'wrap'}]}>
          {authUser && authUser?.interests && authUser?.interests.length > 0 && authUser.interests.map((interest: Interest) => <BadgeInterest key={interest.id}  interest={interest}></BadgeInterest>)}
        </View>
      </View>
      <Modal visible={profileVisible} animationType='slide'>
            <View style={[tw(' bg-white items-center justify-center flex px-4'), {height: "100%", width: "100%"}, styles.shadow]}>  
                <View style={tw('mb-4 w-full')}>
                  <Text style={tw('mb-2 text-black text-base')}>First name</Text>
                  <TextInput value={firstname} placeholder="firstname" onChangeText={(text: string) => setFirstname(text)} style={tw('w-full border border-gray-400 py-2 px-4 rounded-lg text-lg')}></TextInput> 
                </View>
                <View style={tw('mb-4 w-full')}>
                  <Text style={tw('mb-2 text-black text-base')}>Surename</Text>
                  <TextInput value={surename} placeholder="surename" onChangeText={(text: string) => setSurename(text)} style={tw('w-full border border-gray-400 py-2 px-4 rounded-lg text-lg')}></TextInput> 
                </View>
                <View style={tw('mb-10 w-full')}>
                  <Text style={tw('mb-2 text-black text-base')}>description</Text>
                  <TextInput value={description} placeholder="description" onChangeText={(text: string) => setDescription(text)} style={tw('w-full border border-gray-400 py-2 px-4 rounded-lg text-lg')}></TextInput> 
                </View>      
                <TouchableOpacity style={[tw(' mx-auto px-10 py-2 rounded-full bg-green-500 mx-auto'), {width: 200}]} onPress={updateProfileFunction}>
                  <Text style={tw('mx-auto font-bold text-white text-lg')}>Update Profile</Text>
                </TouchableOpacity>     
                <TouchableOpacity style={[tw('mx-auto px-10 py-2 mt-4 rounded-full bg-red-500 mx-auto'), {width: 200}]} onPress={closeProfileModal}>
                  <Text style={tw('mx-auto font-bold text-white text-lg')}>Cancel</Text>
                </TouchableOpacity>             
            </View>
      </Modal>
      <Modal visible={interstVisible} animationType='slide' transparent={true}>
            <View style={[tw(' bg-white rounded-2xl items-center justify-center flex px-4'), {height: "35%", top: "65%",  width: "100%"}, styles.shadow]}> 
                <View style={tw('mb-10 w-full')}>
                  <TextInput value={newInterest} placeholder="your new interest" onChangeText={(text: string) => setNewInterest(text)} style={tw('w-full border border-gray-400 py-2 px-4 rounded-lg text-lg')}></TextInput> 
                </View>  
                <TouchableOpacity style={[tw(' mx-auto px-10 py-2 rounded-full bg-green-500 mx-auto'), {width: 200}]} onPress={addInterestFunction}>
                  <Text style={tw('mx-auto font-bold text-white text-lg')}>Add Interst</Text>
                </TouchableOpacity>     
                <TouchableOpacity style={[tw('mx-auto px-10 py-2 mt-4 rounded-full bg-red-500 mx-auto'), {width: 200}]} onPress={closeInterstModal}>
                  <Text style={tw('mx-auto font-bold text-white text-lg')}>Cancel</Text>
                </TouchableOpacity>             
            </View>
      </Modal>
    </SafeAreaView>
  )
}

export default AccountDetailScreen

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