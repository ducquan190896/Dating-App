import { Alert, FlatList, Image, Keyboard, KeyboardAvoidingView, ListRenderItem, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Modal, ImageBackground } from 'react-native'
import React , {useState} from 'react'
import { Interest } from '../models/index.d'
import { useDispatch, useSelector } from 'react-redux';
import { useTailwind } from 'tailwind-rn/dist';
import { HOST_URL, RootState } from '../store/store';
import axios from 'axios';
import { Badge } from '@rneui/themed';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { removeInterestAction } from '../store/actions/userAction';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

const BadgeInterest = ({interest, isOther}: {interest: Interest, isOther?: boolean}) => {
    const dispatch = useDispatch();
    const tw = useTailwind();
    const {users, authUser, authError, authSuccess} = useSelector((state: RootState) => state.USERS);
    const [isDelete, setIsDelete] = useState<boolean>(false);

    const deleteInterestFromServer = async (interestId: any) => {
        try {
          const interests = authUser.interests.filter((interest: Interest) => interest.id != interestId);
          const user = authUser;
          user.interests = interests;
          dispatch(removeInterestAction(user) as any);
          const token : string | null = await AsyncStorage.getItem("token");  
          await axios.put(HOST_URL + `/api/interests/interest/${interestId}/remove/authUser`, {}, {
            headers: {
              "Authorization": token ?? ""
            }
          }); 
        } catch (err) {
          Alert.alert("cannot remove interest");
        }
      }


    const deleteInterest = async () => {
      await deleteInterestFromServer(interest.id);
      setIsDelete(false);
    }

    return (
        <View style={[tw('my-2 mx-2 relative'), {}]}>
          {isDelete && (
            <TouchableOpacity disabled={isOther} onPress={deleteInterest} style={[tw('absolute -top-4 -right-4 rounded-full bg-red-500'), {zIndex: 10}]}>
              <AntDesign name='close' size={20} color="white"></AntDesign>
            </TouchableOpacity>
          )}
          <TouchableOpacity disabled={isOther} onPress={() => setIsDelete(!isDelete)}>
            <Badge value={interest.name} status="primary"  textStyle={tw(' font-bold text-white text-base')} containerStyle={tw('')} badgeStyle={tw('h-8')}/>
          </TouchableOpacity>
        </View>
      )
}

export default BadgeInterest

const styles = StyleSheet.create({})