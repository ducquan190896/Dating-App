import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Dispatch } from "react";
import { ACTION } from "../../models/index.d";
import { HOST_URL } from "../store";

export const getMatchByIdAction = (matchId: number) => async (dispatch: Dispatch<ACTION>, getState: any) => {
    try {
       const token : string | null = await AsyncStorage.getItem("token");  
       const res = await axios.get(HOST_URL + `/api/matches/match/${matchId}`, {
           headers: {
               "Authorization": token ?? ""
           }
       })
       const data = await res.data
       console.log(data);
       dispatch({
           type: "get_match_by_matchID",
           payload: data
       })
   } catch (err) {
       dispatch({
           type:"MATCH_ERROR",
           payload: err
       })
   }  
}
export const getMatchByUser1AndUser2Action = (user1: number, user2: number) => async (dispatch: Dispatch<ACTION>, getState: any) => {
    try {
       const token : string | null = await AsyncStorage.getItem("token");  
       const res = await axios.get(HOST_URL + `/api/matches/match/user1/${user1}/user2/${user2}`, {
           headers: {
               "Authorization": token ?? ""
           }
       })
       const data = await res.data
       console.log(data);
       dispatch({
           type: "get_match_by_user1_and_user2",
           payload: data
       })
   } catch (err) {
       dispatch({
           type:"MATCH_ERROR",
           payload: err
       })
   }  
}
export const checkExistByUser1AndUser2Action = (user1: number, user2: number) => async (dispatch: Dispatch<ACTION>, getState: any) => {
    try {
       const token : string | null = await AsyncStorage.getItem("token");  
       const res = await axios.get(HOST_URL + `/api/matches/isExist/user1/${user1}/user2/${user2}`, {
           headers: {
               "Authorization": token ?? ""
           }
       })
       const data = await res.data
       console.log(data);
       dispatch({
           type: "get_match_existence_by_user1_and_user2",
           payload: data
       })
   } catch (err) {
       dispatch({
           type:"MATCH_ERROR",
           payload: err
       })
   }  
}
export const checkExistByMatchId = (matchId: number) => async (dispatch: Dispatch<ACTION>, getState: any) => {
    try {
       const token : string | null = await AsyncStorage.getItem("token");  
       const res = await axios.get(HOST_URL + `/api/matches/isExist/match/${matchId}`, {
           headers: {
               "Authorization": token ?? ""
           }
       })
       const data = await res.data
       console.log(data);
       dispatch({
           type: "get_match_existence_by_matchID",
           payload: data
       })
   } catch (err) {
       dispatch({
           type:"MATCH_ERROR",
           payload: err
       })
   }  
}
export const getMatchesForAuthAction = () => async (dispatch: Dispatch<ACTION>, getState: any) => {
    try {
       const token : string | null = await AsyncStorage.getItem("token");  
       const res = await axios.get(HOST_URL + "/api/matches/authUser", {
           headers: {
               "Authorization": token ?? ""
           }
       })
       const data = await res.data
       console.log(data);
       dispatch({
           type: "get_matches_by_auth",
           payload: data
       })
   } catch (err) {
       dispatch({
           type:"MATCH_ERROR",
           payload: err
       })
   }  
}