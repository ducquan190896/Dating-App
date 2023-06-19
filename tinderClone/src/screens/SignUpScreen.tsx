import { Alert,  Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Modal, FlatList, ListRenderItem } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTailwind } from 'tailwind-rn/dist'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from '@rneui/themed';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HOST_URL, RootState } from '../store/store';
import { Register, ResetUser } from '../store/actions/userAction';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navigators/MainStack';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import { ImageData, ImagesData } from '../models/index.d';
import { Image } from '@rneui/base';
import {requestLocationPermission} from "../Utils/GeolocationPermission"
import Geolocation from 'react-native-geolocation-service';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {Picker} from '@react-native-picker/picker';
import BadgeString from '../components/BadgeString';

const SignUpScreen = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [firstname, setFirstname] = useState<string>("");
    const [surename, setSurename] = useState<string>("");
    const [gender, setGender] = useState<string>("MALE");
    const [description, setDescription] = useState<string>("");
    const [birth, setBirth] = useState<string>(new Date().toISOString().slice(0, 10));
    const [avatarUrls, setAvatarUrls] = useState<string[] | []>([]);
    const [location, setLocation] = useState<Geolocation.GeoPosition | null>();
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [interstVisible, setInterstVisible] = useState<boolean>(false);
    const [newInterest, setNewInterest] = useState<string>("");
    const [interests, setInterests] = useState<string[] | []>([]);
    const tw = useTailwind();
    const {users, authUser, authError, authSuccess, message} = useSelector((state: RootState) => state.USERS);
    const dispatch = useDispatch();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    

    useEffect(() => {
        if( authError) {
            Alert.alert("signup failed");
            dispatch(ResetUser() as any);
        }
        if(authSuccess && authUser?.roles?.includes("USER") ) {
            console.log("auth role: " + authUser?.roles);
            Alert.alert("signup successfully");
            // navigation.navigate('RoleScreen');
            dispatch(ResetUser() as any);
        }
    }, [authSuccess, authError, message, dispatch])


    const uploadImageFunction = async () => {
        const images: any = await launchImageLibrary({
            mediaType: 'photo',
            quality: 1,
            selectionLimit: 6
        })
        console.log(images)
        const formdata = new FormData();
        let n = 0;
        if(!images.canceled) {
          while(n < images.assets.length) {
            console.log(images.assets[n]);
            const split = images.assets[n].uri.split('/');
            const fileNameDot = split[split.length - 1].split(".");
            const fileName = fileNameDot[0];
            const imageFile = {
              uri: images.assets[n].uri,
              type: images.assets[n].type,
              name: fileName
            };
            // console.log(imageFile);
            formdata.append("file",  JSON.parse(JSON.stringify(imageFile)));   
            n++;
          }
        }
        // console.log("formdata");
        // console.log(formdata);
        const res = await axios.post(HOST_URL + "/api/images/", formdata, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        const data : ImagesData = await res.data;
        console.log(data)
        setAvatarUrls(data.images);
      }

    const checkAge = () => {
        const today = new Date().getTime();
        const birthDate = new Date(birth).getTime();
        const age = (today - birthDate)/ (1000 * 60 * 60 *24 * 365);
        return age > 18 && age <= 80? true : false;
    }

    const submitFunction = async () => {
        const longitude = location?.coords?.longitude;
        const latitude = location?.coords?.latitude;
        const isMature = checkAge();
        if(username && username.length > 0 && password && password.length > 0 && confirmPassword === password && firstname && firstname.length > 0 && gender && birth && description && surename && surename.length > 0 && longitude && latitude && avatarUrls && interests && isMature) {
           await  dispatch(Register({username, firstname, surename, password, birth, gender, description, longitude: longitude, latitude: latitude, avatarUrls, interests}) as any)
           setUsername("");
           setPassword("");
           setAvatarUrls([]);
           setInterests([]);
           setConfirmPassword("");
           setFirstname("");
           setSurename("");
           setGender("MALE");
           setBirth(new Date().toISOString().slice(0, 10));
           setDescription("");
           navigation.navigate("PreferenceForm");
        } else {
            Alert.alert("please fill all required information")
        }
    }

    const getLocation = () => {
        const result = requestLocationPermission();
        result.then(res => {
          console.log('res is:', res);
          if (res) {
            Geolocation.getCurrentPosition(
              (position : Geolocation.GeoPosition) => {
                console.log(position);
                setLocation(position);
              },
              error => {
                // See error code charts below.
                console.log(error.code, error.message);
                setLocation(null);
              },
              {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
            );
          }
        });
        console.log(location);
    };

    useEffect(() => {
        getLocation();
    }, [])


    const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
    
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    
    const handleConfirm = (date: Date) => {
        console.log("A date has been picked: ", date.toISOString().slice(0, 10));
        setBirth(date.toISOString().slice(0, 10));
        hideDatePicker();
    };

    const openInterestModal = () => {
        setInterstVisible(true)
    }
  
    const closeInterstModal = () => {
        setNewInterest("");
        setInterstVisible(false)
    }

    const addInterest = () => {
        setInterests(prev => [...prev, newInterest.toLowerCase()]);
        setNewInterest("");
        setInterstVisible(false)
    }

    const navigateToLogin = () => {
        navigation.navigate("Login");
    }

  return (
   <KeyboardAvoidingView style={tw('flex-1')}>
        <TouchableWithoutFeedback style={tw('flex-1')} onPress={Keyboard.dismiss}>
            <ScrollView style={tw('flex-1 mt-10 px-4')}>  
                <Text style={tw('mx-auto text-2xl font-bold text-[#6203fc] mb-6')}>Register Account</Text>  
                <TextInput value={username} placeholder="username" onChangeText={(text: string) => setUsername(text)} style={tw('w-full border border-gray-400 py-2 px-4 rounded-lg text-lg mb-6')}></TextInput>

                <TextInput value={firstname} placeholder="firstname" onChangeText={(text: string) => setFirstname(text)} style={tw('w-full border border-gray-400 py-2 px-4 rounded-lg text-lg mb-6')}></TextInput>

                <TextInput value={surename} placeholder="surename" onChangeText={(text: string) => setSurename(text)} style={tw('w-full border border-gray-400 py-2 px-4 rounded-lg text-lg mb-6')}></TextInput>

                <TextInput secureTextEntry={true} value={password}  placeholder="Password" onChangeText={(text: string) => setPassword(text)} style={tw('w-full border border-gray-400 py-2 px-4 rounded-lg text-lg mb-6')} ></TextInput>

                <TextInput secureTextEntry={true} value={confirmPassword}  placeholder="confirm your Password" onChangeText={(text: string) => setConfirmPassword(text)} style={tw('w-full border border-gray-400 py-2 px-4 rounded-lg text-lg mb-6')} ></TextInput>

                <TextInput value={description} placeholder="description" onChangeText={(text: string) => setDescription(text)} style={tw('w-full border border-gray-400 py-2 px-4 rounded-lg text-lg mb-6')}></TextInput>

                <View style={tw('flex-row items-center justify-start w-full mb-2')}>
                    <Text style={tw('text-lg text-black font-bold mr-4')}>Birthdate</Text>
                    <TouchableOpacity  onPress={showDatePicker}>
                        <AntDesign name='calendar' size={36} color="#6203fc"></AntDesign>
                    </TouchableOpacity>
                </View>
                <View style={tw('w-full rounded-lg border border-gray-300 py-2 px-2 mb-6')}>
                    <Text style={tw('text-lg ml-2')}>{birth && birth}</Text>
                </View>
                <View>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
                </View>
                <View style={tw('flex-row items-center justify-between w-full mb-2')}>
                    <Text style={tw('text-lg text-black font-bold mr-4')}>Gender</Text>
                    <View style={[tw('w-2/3  rounded-md border border-gray-400 text-zinc-700 font-bold text-lg bg-gray-200 mb-4'), {zIndex: 10, padding: 1}]}>
                        <Picker
                        selectedValue={gender}
                        onValueChange={(itemValue, itemIndex) => {
                            setGender(itemValue)
                            console.log(itemValue)
                        }}
                        dropdownIconColor="white"
                        mode={Picker.MODE_DROPDOWN}
                        style={tw(' border border-gray-400 w-full')}
                        >
                        <Picker.Item style={tw(' text-lg border border-gray-400 w-full')} label="female" value="FEMALE"></Picker.Item>  
                        <Picker.Item style={tw(' text-lg border border-gray-400 w-full')} label="male" value="MALE"></Picker.Item>   
                        <Picker.Item style={tw(' text-lg border border-gray-400 w-full')} label="others" value="OTHERS"></Picker.Item> 
                        </Picker>
                  </View>
                </View>
                
                <View style={tw('w-full mb-6 py-2 mt-4')}>
                    <View style={tw('flex-row items-center mb-2')}>
                        <Text style={tw('text-lg text-black font-bold mr-4')}>Your Interests</Text>
                        <TouchableOpacity onPress={openInterestModal}>
                            <AntDesign name='addfolder' size={28} color={"gray"}></AntDesign>
                        </TouchableOpacity>
                    </View>
                    <View style={[tw('flex flex-row w-full'), {flexWrap: 'wrap'}]}>
                        {interests && interests.length > 0 && interests.map((interest: string, index) => <BadgeString key={index}  interest={interest}></BadgeString>)}
                    </View>
                </View>

                {/* <TouchableOpacity  style={[tw('w-full rounded-lg my-2 py-2 font-bold px-6'), {backgroundColor: "#6203fc"}]}  onPress={uploadImageFunction}>
                    <Text style={tw('text-base text-white')}>Add Avartars</Text>
                </TouchableOpacity> */}
                <View style={tw('flex-row items-center mb-2')}>
                    <Text style={tw('text-lg text-black font-bold mr-4')}>Your Avatars</Text>
                    <TouchableOpacity onPress={uploadImageFunction}>
                        <Entypo name='images' size={28} color={"gray"}></Entypo>
                    </TouchableOpacity>
                </View>
                <View style={[tw('flex flex-row w-full items-center justify-start my-4 mx-auto'), {flexWrap: 'wrap'}]}>
                    {avatarUrls && avatarUrls.length > 0 && avatarUrls.map((avatar: string, index) => {
                        return (
                            <TouchableOpacity key={index} style={tw('mr-4 mb-4')}>
                                <Image source={{uri: HOST_URL + "/api/images/image/" +  avatar}} style={[tw('rounded-md'), {height: 100, width: 100}]}></Image>  
                            </TouchableOpacity>
                        )   
                    })}
                </View>
                <Button  color="#6203fc" containerStyle={tw('w-full rounded-lg mb-6')} size='lg' title='Sign Up' onPress={submitFunction}></Button>
                <View style={tw('flex flex-row mx-auto')}>
                    <Text style={tw('text-base text-gray-400 mr-4')}> have an account?</Text>
                    <TouchableOpacity activeOpacity={0.2} onPress={navigateToLogin}>
                        <Text style={tw('text-base text-zinc-700 mr-4')}>Login</Text>
                    </TouchableOpacity>
                </View>
                {location && (
                    <>
                        <Text style={tw('text-base text-gray-400 mr-4')}> longitude: {location ? location.coords.longitude : "error"}</Text>
                        <Text style={tw('text-base text-gray-400 mr-4')}> latitude: {location ? location.coords.latitude : "error"}</Text>
                    </>
                )}
                <Modal visible={interstVisible} animationType='slide' transparent={true}>
                    <View style={[tw(' bg-white rounded-2xl items-center justify-center flex px-4'), {height: "50%", top: "50%",  width: "100%", zIndex: 10}, styles.shadow]}> 
                        <View style={tw('mb-10 w-full')}>
                            <TextInput value={newInterest} placeholder="your new interest" onChangeText={(text: string) => setNewInterest(text)} style={tw('w-full border border-gray-400 py-2 px-4 rounded-lg text-lg')}></TextInput> 
                        </View>  
                        <TouchableOpacity style={[tw(' mx-auto px-10 py-2 rounded-full bg-green-500 mx-auto'), {width: 200}]} onPress={addInterest}>
                            <Text style={tw('mx-auto font-bold text-white text-lg')}>Add Interst</Text>
                        </TouchableOpacity>     
                        <TouchableOpacity style={[tw('mx-auto px-10 py-2 mt-4 rounded-full bg-red-500 mx-auto'), {width: 200}]} onPress={closeInterstModal}>
                            <Text style={tw('mx-auto font-bold text-white text-lg')}>Cancel</Text>
                        </TouchableOpacity>             
                    </View>
                </Modal>
            </ScrollView>
        </TouchableWithoutFeedback>
   </KeyboardAvoidingView>
  )
}

export default SignUpScreen

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