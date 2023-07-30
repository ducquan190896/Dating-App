import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Dispatch } from "react";
import { ACTION, CHATMESSAGE, MESSAGEFORM, USER } from "../../models/index.d" 
import { HOST_URL } from "../store";
import { createShareKey, decrypt, encrypt } from "../../Utils/EndToEndEcryption";

export const getAllMessagesByChatIDAction= (chatID: number, otherUser: USER) => async (dispatch: Dispatch<ACTION>, getState: any) => {
    try {
        const {authUser} = getState().USERS;
        const token: string | null = await AsyncStorage.getItem("token");
        const userPublicKey = otherUser.publicKey
        const authPrivateKey = await AsyncStorage.getItem(authUser.username + "-privateKey") ?? "";
        const shareKey = createShareKey(userPublicKey, authPrivateKey);
        if(!token) {
            dispatch({
                type: "message_error",
                payload: "token not found"
            });
        }
        const res = await axios.get(HOST_URL + `/api/messages/chat/${chatID}`, {
            headers: {
                Authorization: token 
            }
        });
        const data = await res.data;
        console.log(data);

        const decryptedData : CHATMESSAGE[] = data
            .map((message: CHATMESSAGE) => {
                const decryptedMessage : CHATMESSAGE = message;
                decryptedMessage.content = decrypt(shareKey, message.content);
                return decryptedMessage;
            })
            .filter((message: CHATMESSAGE) => message.content != null);

        dispatch({
            type:  "get_all_messages_by_chatID",
            payload: decryptedData
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: "message_error",
            payload: err
        });
    }
}

export const addMessageAction= ( form: MESSAGEFORM, otherUser: USER) => async (dispatch: Dispatch<ACTION>, getState: any) => {
    try {
        const token: string | null = await AsyncStorage.getItem("token");
        const {authUser} = getState().USERS;
        const authPrivateKey = await AsyncStorage.getItem(authUser.username + "-privateKey") ?? "";
        const userPublicKey = otherUser.publicKey
        const shareKey = createShareKey(userPublicKey, authPrivateKey);
        const encryptedMessage = encrypt(shareKey, form.content)
        form.content = encryptedMessage;
        if(!token) {
            dispatch({
                type: "message_error",
                payload: "token not found"
            });
        }
        const res = await axios.post(HOST_URL + "/api/messages/message", form, {
            headers: {
                Authorization: token 
            }
        });
        dispatch({
            type:  "add_message_to_chat",
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: "message_error",
            payload: err
        });
    }
}

export const receiveMessageFromSocket =  (message: CHATMESSAGE, otherUser: USER) => async (dispatch: Dispatch<ACTION>, getState: any) => {
    try {
        const {authUser} = getState().USERS;
        const userPublicKey = otherUser.publicKey
        const authPrivateKey = await AsyncStorage.getItem(authUser.username + "-privateKey") ?? "";
        const shareKey = createShareKey(userPublicKey, authPrivateKey);
        const decryptedMessage : CHATMESSAGE = message;
        decryptedMessage.content = decrypt(shareKey, message.content);
        dispatch({
            type: "receive_message_from_socket",
            payload: decryptedMessage
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: "message_error",
            payload: err
        });
    }
}

export const messageResetAction= () => async (dispatch: Dispatch<ACTION>, getState: any) => {
    dispatch({
        type: "message_reset"
    });
}


// if(chat && messageInput && authUser && receiver) {
//     const token = await AsyncStorage.getItem("token")
//     const authPrivateKey = await AsyncStorage.getItem(authUser.username + "-privateKey") ?? "";
//     const userPublicKey = receiver.publicKey
//     const shareKey = createShareKey(userPublicKey, authPrivateKey);
//     const messageForm = {
//         content: encrypt(shareKey, messageInput),
//         chatId: chat?.id,
//         token: token
//     }
//     if(stompClient != null) {
//       stompClient.send("/app/message", {}, JSON.stringify(messageForm));
//     }
//     setMessageInput("")
// }