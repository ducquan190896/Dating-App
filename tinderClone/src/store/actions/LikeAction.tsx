import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Dispatch } from "react";
import { ACTION } from "../../models/index.d";
import { HOST_URL } from "../store";

export const getLikingUsers = () => async (dispatch: Dispatch<ACTION>, getState: any) => {
    try {
       const token : string | null = await AsyncStorage.getItem("token");  
       const res = await axios.get(HOST_URL + "/api/likes/likings/", {
           headers: {
               "Authorization": token ?? ""
           }
       })
       const data = await res.data
       console.log(data);
       dispatch({
           type: "get_likingUsers_for_auth",
           payload: data
       })
   } catch (err) {
       dispatch({
           type: "LIKE_ERROR",
           payload: err
       })
   }  
}
export const getLikeByLikedUserAndAuth = (likedUser: number, likingUser: number) => async (dispatch: Dispatch<ACTION>, getState: any) => {
    try {
       const token : string | null = await AsyncStorage.getItem("token");  
       const res = await axios.get(HOST_URL + `/api/likes/likedUser/${likedUser}/likingUser/${likingUser}`, {
           headers: {
               "Authorization": token ?? ""
           }
       })
       const data = await res.data
       console.log(data);
       dispatch({
           type: "get_like_by_likedUser_and_auth",
           payload: data
       })
   } catch (err) {
       dispatch({
           type: "LIKE_ERROR",
           payload: err
       })
   }  
 }
//  export const checkLikeExistByLikedUserAndAuth = async (likedUser: number, likingUser: number) => async (dispatch: Dispatch<ACTION>, getState: any) => {
//     try {
//        const token : string | null = await AsyncStorage.getItem("token");  
//        const res = await axios.get(HOST_URL + `/api/likes/isExist/likedUser/${likedUser}/likingUser/${likingUser}`, {
//            headers: {
//                "Authorization": token ?? ""
//            }
//        })
//        const data = await res.data
//        console.log(data);
//        dispatch({
//            type: "check_exist_by_likedUser_and_auth",
//            payload: data
//        })
//    } catch (err) {
//        dispatch({
//            type: "LIKE_ERROR",
//            payload: err
//        })
//    }  
//  }
export const checkLikeExistByAuthAndLikingUser= async (likedUser: number, likingUser: number)  => {
    try {
       const token : string | null = await AsyncStorage.getItem("token");  
       const res = await axios.get(HOST_URL + `/api/likes/isExist/likedUser/${likedUser}/likingUser/${likingUser}`, {
           headers: {
               "Authorization": token ?? ""
           }
       })
       const data = await res.data
       console.log(data);
       return data;
   } catch (err) {
        console.log(err);
   }  
 }
 export const addLikeAction = (likedUser: number) => async (dispatch: Dispatch<ACTION>, getState: any) => {
    try {
       const token : string | null = await AsyncStorage.getItem("token");  
       const res = await axios.post(HOST_URL + `/api/likes/like/likedUser/${likedUser}`, {}, {
           headers: {
               "Authorization": token ?? ""
           }
       })
       const data = await res.data
       console.log(data);
       dispatch({
           type: "add_like",
           payload: data
       })
   } catch (err) {
       dispatch({
           type: "LIKE_ERROR",
           payload: err
       })
   }  
 }
 export const resetLikeAction = () => async (dispatch: Dispatch<ACTION>, getState: any) => {
    dispatch({
        type: "LIKE_RESET"
    })
 }
