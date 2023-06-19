import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Dispatch } from "react";
import { ACTION } from "../../models/index.d";
import { HOST_URL } from "../store";

export const addBlockAction = (blockedUserId: number) => async (dispatch: Dispatch<ACTION>, getState: any) => {
    try {
       const token : string | null = await AsyncStorage.getItem("token");  
       const res = await axios.post(HOST_URL + `/api/blocks/${blockedUserId}`, {}, {
           headers: {
               "Authorization": token ?? ""
           }
       })
       const data = await res.data
       console.log(data);
       dispatch({
           type: "add_block",
           payload: data
       })
   } catch (err) {
       dispatch({
           type: "BLOCK_ERROR",
           payload: err
       })
   }  
 }

 export const checkBlockExistByBlockedUserAndAuthAction = (blockedUserId: number) => async (dispatch: Dispatch<ACTION>, getState: any) => {
    try {
       const token : string | null = await AsyncStorage.getItem("token");  
       const res = await axios.get(HOST_URL + `/api/blocks/isExist/${blockedUserId}`, {
           headers: {
               "Authorization": token ?? ""
           }
       })
       const data = await res.data
       console.log("is blocked " + data);
       dispatch({
           type: "check_exist_by_blockedUser_and_auth",
           payload: data
       })
   } catch (err) {
       dispatch({
           type: "BLOCK_ERROR",
           payload: err
       })
   }  
 }
 export const resetBlockAction = () => async (dispatch: Dispatch<ACTION>, getState: any) => {
    dispatch({
        type: "Block_RESET"
    })
 }