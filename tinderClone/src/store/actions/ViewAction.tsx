import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Dispatch } from "react";
import { ACTION } from "../../models/index.d";
import { HOST_URL } from "../store";

export const getViewers = () => async (dispatch: Dispatch<ACTION>, getState: any) => {
    try {
       const token : string | null = await AsyncStorage.getItem("token");  
       const res = await axios.get(HOST_URL + "/api/views/authUser", {
           headers: {
               "Authorization": token ?? ""
           }
       })
       const data = await res.data
       console.log(data);
       dispatch({
           type: "get_viewers_for_auth",
           payload: data
       })
   } catch (err) {
       dispatch({
           type: "VIEW_ERROR",
           payload: err
       })
   }  
 }