import AsyncStorage from "@react-native-async-storage/async-storage"
import { Dispatch } from "react";
import { Alert } from "react-native";
import { HOST_URL } from "../store";
import axios from "axios";
import { ACTION, CHANGEPASSWORD, LoginForm, USER, UserRegisterForm } from "../../models/index.d";
import { RootStackParamList } from "../../Navigators/MainStack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { generateKeyPair } from "../../Utils/EndToEndEcryption";

export const checkPublicKey = async (username: string) => {
    const privateKey = await AsyncStorage.getItem(username + "-privateKey");
    if(!privateKey) {
        const keyPair = generateKeyPair();
        await AsyncStorage.setItem(username + "-privateKey", keyPair.secretKey.toString());
        return keyPair.publicKey.toString();
    } else {
        return null;
    }
}

export const login = (loginForm: LoginForm, navigation: NativeStackNavigationProp<RootStackParamList>) => async (dispatch: Dispatch<ACTION>, getState: any) => {
    try {
        const reqBody : LoginForm = {
            username: loginForm.username,
            password: loginForm.password
        };
        const publicKey = await checkPublicKey(loginForm.username);
        if(publicKey) {
            reqBody.publicKey = publicKey
        }
        const res = await axios.put(HOST_URL + "/api/users/signIn", reqBody);
        let data : USER = res.data
        const token : string =  res.headers.authorization ?? ""
        console.log(token);
        await AsyncStorage.setItem("token", token)
        console.log(res.data)
        if(!data.publicKey) {
            const keyPair = generateKeyPair();
            await AsyncStorage.setItem(data.username + "-privateKey", keyPair.secretKey.toString());
            const publicKey = keyPair.publicKey.toString();
            data = await updatePublicKey(publicKey);
        }
        dispatch({
            type: "LOG_IN",
            payload: data
        })
        navigation.navigate('BottomTabs')
    } catch (err) {
        console.log(err);
        dispatch({
            type: "USER_ERROR",
            payload: err
        });
    }
}
 
export const Register = (registerForm: UserRegisterForm) => async (dispatch: Dispatch<ACTION>, getState: any) => {
     try {
        console.log("sign up")
        const res = await axios.post(HOST_URL + "/api/users/signup", registerForm);
        const data = await res.data
        console.log(data)
        const token : string =  res.headers.authorization?? ""
        console.log(token)
        await AsyncStorage.setItem("token", token)
        dispatch({
            type: "REGISTER",
            payload: data
        })
     } catch (err) {
      dispatch({
          type: "USER_ERROR",
          payload: err
      })
     }
  
  }
 
  export const ChangePasswordAction = (form: CHANGEPASSWORD) => async (dispatch: Dispatch<ACTION>, getState: any) => {
     try {
        const token : string | null = await AsyncStorage.getItem("token");  
        const res = await axios.put(HOST_URL + "/api/users/changePassword", form, {
            headers: {
                "Authorization": token ?? ""
            }
        })
        const data = await res.data
        // console.log(res.headers.authorization?? "no token")
        // await AsyncStorage.setItem("token", res.headers.authorization?? "")
        dispatch({
            type: "Change_Password",
            payload: data
        })
    } catch (err) {
        dispatch({
            type: "USER_ERROR",
            payload: err
        })
    }  
  }

  export const updatePublicKey = async (publicKey: string) => {
    const token : string | null = await AsyncStorage.getItem("token");  
    const res = await axios.put(HOST_URL + "/api/users/authUser/updatePublicKey/" + publicKey, {}, {
        headers: {
            "Authorization": token ?? ""
        }
    })
    const data = await res.data
    return data
     
 }

  export const getAuthUserAction = () => async (dispatch: Dispatch<ACTION>, getState: any) => {
    try {
       const token : string | null = await AsyncStorage.getItem("token");  
       const res = await axios.get(HOST_URL + "/api/users/authUser/getAuthUser", {
           headers: {
               "Authorization": token ?? ""
           }
       })
       const data = await res.data
       // console.log(res.headers.authorization?? "no token")
       // await AsyncStorage.setItem("token", res.headers.authorization?? "")
       dispatch({
           type: "get_authUser",
           payload: data
       })
   } catch (err) {
       dispatch({
           type: "USER_ERROR",
           payload: err
       })
   }  
 }




  export const updateProfileAction = (firstname?: string, surename?: string, description?: string) => async (dispatch: Dispatch<ACTION>, getState: any) => {
    try {
        const token : string | null = await AsyncStorage.getItem("token");  
        let queryString = "";
        if(firstname && firstname.length > 0) {
            queryString += "firstname=" + firstname + "&";
        }
        if(surename && surename.length > 0) {
            queryString += "surename=" + surename + "&"; 
        }
        if(description && description.length > 0) {
            queryString += "description=" + description  + "&";
        }
        const res = await axios.put(HOST_URL + "/api/users/authUser/updateProfile?" + queryString, {}, {
            headers: {
                "Authorization": token ?? ""
            }
        })
        const data = await res.data;
        console.log(data);
        dispatch({
            type: "update_profile",
            payload: data
        })
    } catch (err) {
        dispatch({
            type: "USER_ERROR",
            payload: err
        })
    }  
 }


 export const addImageAction = (img: string) => async (dispatch: Dispatch<ACTION>, getState: any) => {
    try {
       const token : string | null = await AsyncStorage.getItem("token");  
       const res = await axios.put(HOST_URL + "/api/users/addImage/" + img, {}, {
           headers: {
               "Authorization": token ?? ""
           }
       })
       const data = await res.data
       dispatch({
           type: "add_image",
           payload: data
       })
   } catch (err) {
       dispatch({
           type: "USER_ERROR",
           payload: err
       })
   }  
 }
 export const removeImageAction = (img: string) => async (dispatch: Dispatch<ACTION>, getState: any) => {
    try {
       const token : string | null = await AsyncStorage.getItem("token");  
       const res = await axios.put(HOST_URL + "/api/users/removeImage/" + img, {}, {
           headers: {
               "Authorization": token ?? ""
           }
       })
       const data = await res.data
       dispatch({
           type: "remove_image",
           payload: data
       })
   } catch (err) {
       dispatch({
           type: "USER_ERROR",
           payload: err
       })
   }  
 }

 
  export const LogOutAction = () => async (dispatch: Dispatch<ACTION>, getState: any) => {
     try {
        const token : string | null = await AsyncStorage.getItem("token");
        await axios.get(HOST_URL + "/logout", {
            headers: {
                "Authorization": token ?? ""
            }
        })
        await AsyncStorage.setItem("token", "")



        console.log("logout");
        dispatch({
            type: "LOG_OUT"
        })
      
     } catch (err) {
        dispatch({
            type: "USER_ERROR",
            payload: err
        })
     }
  
  }

 export const ResetUser = () => (dispatch : Dispatch<ACTION>, getState: any) => {
     dispatch({
         type: "USER_RESET"
     })
 }
 export const removeInterestAction = (authUser: USER) => (dispatch : Dispatch<ACTION>, getState: any) => {
    dispatch({
        type: "remove_interest",
        payload: authUser
    })
}
export const addInterestAction = (authUser: USER) => (dispatch : Dispatch<ACTION>, getState: any) => {
    dispatch({
        type: "add_interest",
        payload: authUser
    })
}

export const updatePreferenceAction = (authUser: USER) => (dispatch : Dispatch<ACTION>, getState: any) => {
    dispatch({
        type: "update_preference",
        payload: authUser
    })
}
export const addPreferenceAction = (authUser: USER) => (dispatch : Dispatch<ACTION>, getState: any) => {
    dispatch({
        type: "add_preference",
        payload: authUser
    })
}
 