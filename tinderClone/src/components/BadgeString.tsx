import { Badge } from '@rneui/themed';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTailwind } from 'tailwind-rn/dist';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { RootState } from '../store/store';

const BadgeString = ({interest} : {interest: string}) => {
    const tw = useTailwind();
    const {users, authUser, authError, authSuccess} = useSelector((state: RootState) => state.USERS);
    const [isDelete, setIsDelete] = useState<boolean>(false);

    const deleteInterest = () => {
      
      setIsDelete(false);
    }

    return (
        <View style={[tw('my-2 mx-2 relative'), {}]}>
          {isDelete && (
            <TouchableOpacity onPress={deleteInterest} style={[tw('absolute -top-4 -right-4 rounded-full bg-red-500'), {zIndex: 10}]}>
              <AntDesign name='close' size={20} color="white"></AntDesign>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => setIsDelete(!isDelete)}>
            <Badge value={interest} status="primary"  textStyle={tw(' font-bold text-white text-base')} containerStyle={tw('')} badgeStyle={tw('h-8')}/>
          </TouchableOpacity>
        </View>
      )
}

export default BadgeString

const styles = StyleSheet.create({})