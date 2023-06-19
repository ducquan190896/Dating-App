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
import { ImageData, LIKE } from '../../models/index.d';
import { ProfileStackParamList } from '../../Navigators/ProfileStack';
import { addImageAction, getAuthUserAction, removeImageAction } from '../../store/actions/userAction';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import LoadingComponent from '../../components/LoadingComponent';

const imageUrlsDefault =   "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80";

type PersonalProfileNavigationProp = CompositeNavigationProp<
NativeStackNavigationProp<ProfileStackParamList, "PersonalProfile">,
NativeStackNavigationProp<BottomTabProps>
>;


const PersonalProfile = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [img, setImg] = useState<string>("");
  const [ImageUpload, setImageUpload] = useState<string | null>(null);
  const navigation = useNavigation<PersonalProfileNavigationProp>();
  const dispatch = useDispatch();
  const tw = useTailwind();
  const {users, authUser, authError, authSuccess} = useSelector((state: RootState) => state.USERS);
  console.log(authUser);

  const loadAuthUser = useCallback(async () => {
    dispatch(getAuthUserAction() as any);
  }, []);

  useEffect(() => {
    if(!authUser) {
      setIsLoading(true);
      loadAuthUser().then(() => setIsLoading(false));
    }
  }, [authUser])

  useEffect(() => {
    navigation.addListener('focus', () => {
      if(!authUser) {
        setIsLoading(true);
        loadAuthUser().then(() => setIsLoading(false));
      }
    })
}, [navigation, authUser])


  const handleRenderItem: ListRenderItem<any> = ({item}: {item: string}) => {
    return (
      <TouchableOpacity onPress={() => openDeleteModal(item)} style={tw('mr-4 mb-4')}>
        <Image source={{uri: HOST_URL + "/api/images/image/" +  item}} style={[tw('rounded-md'), {height: 100, width: 100}]}></Image>  
      </TouchableOpacity>
    )
  }
  const openDeleteModal = (img: string) => {
    setImg(img);
    setIsVisible(true);
  }
  const deleteImage = async () => {
    if(img && img.length > 0) {
      await dispatch(removeImageAction(img) as any);
      setImg("")
    }
    setIsVisible(false)
  }

  const uploadImageFunction = async () => {
    const images: any = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1
    })
    console.log(images)
    const formdata = new FormData();
    if(!images.canceled) {
            console.log(images.assets[0])
            const split = images.assets[0].uri.split('/')
            const fileNameDot = split[split.length - 1].split(".")
            const fileName = fileNameDot[0]
            const imageFile = {
                uri: images.assets[0].uri,
                type: images.assets[0].type,
                name: fileName
            }
            console.log(imageFile)
           formdata.append("file",  JSON.parse(JSON.stringify(imageFile)))         
    }
    console.log(formdata)
    const res = await axios.post(HOST_URL + "/api/images/singleImage", formdata, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    const data: ImageData = await res.data;
    console.log(data.image)
    setImageUpload(data.image)
    await dispatch(addImageAction(data.image) as any);
  }

  const navigateToAccountDetail = () => {
    navigation.navigate('AccountDetailScreen');
  }

  const navigateToPreference = () => {
    navigation.navigate("SettingScreen");
  }

  if(isLoading) {
    return <LoadingComponent/>
  }

  return (
    <SafeAreaView style={tw('flex-1 bg-white items-center justify-start pt-4 pb-2 px-2')}>
      <Image source={{uri: authUser.avatarUrls && authUser.avatarUrls.length > 0 ? HOST_URL + "/api/images/image/" + authUser.avatarUrls[0] : imageUrlsDefault}} style={[tw(' rounded-full'), {height: 200, width: 200}]}></Image>
      <Text style={tw('my-2 text-2xl text-black font-bold')}>{authUser.firstname} {authUser.surename}</Text>
      <View style={tw('w-full flex items-start justify-center px-2 my-2')}>
        <View style={tw('flex-row items-center mb-2')}>
          <Text style={tw('my-2 mr-4 text-lg text-gray-500 font-bold')}>My Photos</Text>
          {authUser?.avatarUrls?.length < 6 && (
              <TouchableOpacity onPress={uploadImageFunction}>
                <AntDesign name='addfolder' size={28} color={"#ef4444"}></AntDesign>
              </TouchableOpacity>
          )}
        </View>
        {authUser?.avatarUrls?.length > 0 ? (
          <>
            <FlatList 
                numColumns={3}
                data={authUser.avatarUrls}
                keyExtractor={(item: any, index) => index.toString()}
                renderItem={handleRenderItem}
                showsVerticalScrollIndicator={false}
            >
            </FlatList>
          </>
          ):(
          <Text style={tw('my-2 text-lg text-gray-500 font-bold mx-auto my-8')}>No Photos</Text>
        )}
      </View>
      <View style={[tw('bg-gray-400 w-full mt-2 mb-4'), {height: 1}]}></View>
      <TouchableOpacity onPress={navigateToAccountDetail} style={tw('flex-row items-center w-full h-10 px-8 mb-2')}>
        <View style={tw('mr-8')}>
          <Ionicons name='person-circle-outline' size={34} color={"#6203fc"}></Ionicons>
        </View>
        <View style={[tw('flex-1'), {}]}>
          <Text style={tw('text-lg font-bold text-gray-500')}>Account Details</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToPreference} style={tw('flex-row items-center w-full h-10 px-8 mb-2')}>
        <View style={tw('mr-8')}>
          <AntDesign name='setting' size={34} color={"#6203fc"}></AntDesign>
        </View>
        <View style={[tw('flex-1'), {}]}>
          <Text style={tw('text-lg font-bold text-gray-500')}>Setting</Text>
        </View>
      </TouchableOpacity>
      <Modal visible={isVisible} animationType='slide' transparent={true}>
            <View style={[tw(' bg-slate-200 items-center justify-center flex'), {height: "10%", top: "90%", width: "100%"}, styles.shadow]}>               
                <TouchableOpacity style={tw('px-10 py-2 rounded-full bg-red-500 w-1/2 mx-auto')} onPress={deleteImage}>
                  <Text style={tw('font-bold text-white text-lg')}>Delete Image</Text>
                </TouchableOpacity>             
            </View>
        </Modal>
    </SafeAreaView>
  )
}

export default PersonalProfile

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