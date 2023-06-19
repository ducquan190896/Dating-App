import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Dispatch } from "react";
import { ACTION } from "../../models/index.d";
import { HOST_URL } from "../store";

export const addReportAction = (reportedUserId: number) => async (dispatch: Dispatch<ACTION>, getState: any) => {
    try {
       const token : string | null = await AsyncStorage.getItem("token");  
       const res = await axios.post(HOST_URL + `/api/reports/${reportedUserId}`, {}, {
           headers: {
               "Authorization": token ?? ""
           }
       })
       const data = await res.data
       console.log(data);
       dispatch({
           type: "add_report",
           payload: data
       })
   } catch (err) {
       dispatch({
           type: "report_ERROR",
           payload: err
       })
   }  
 }

 export const checkReportByReportedUserIdAction = (reportedUserId: number) => async (dispatch: Dispatch<ACTION>, getState: any) => {
    try {
       const token : string | null = await AsyncStorage.getItem("token");  
       const res = await axios.get(HOST_URL + `/api/reports/isExist/${reportedUserId}`, {
           headers: {
               "Authorization": token ?? ""
           }
       })
       const data = await res.data
       console.log("is reported " + data);
       dispatch({
           type: "check_exist_by_reportedUser_and_auth",
           payload: data
       })
   } catch (err) {
       dispatch({
           type: "report_ERROR",
           payload: err
       })
   }  
 }
 export const resetReportAction = () => async (dispatch: Dispatch<ACTION>, getState: any) => {
    dispatch({
        type: "report_RESET"
    })
 }